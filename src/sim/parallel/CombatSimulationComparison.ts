import { CombatSimulationParameters } from "../CombatSimulationParameters";
import { simModeType } from "../../types";
import * as workerpool from 'workerpool';
import { CombatSimulationResults } from '../CombatSimulationResults';
import { combatSimulationWorker } from "./CombatSimulationWorker";
import { CombatSimulation } from "../CombatSimulation"; 
import Prando from 'prando';
import { Logger } from "../../util/Logger";

export class CombatSimulationComparison {

    readonly simMode: simModeType; 
    readonly numberSimulationsPerSeed: number; 
    readonly baseSimParameters: CombatSimulationParameters; 
    readonly pool: workerpool.WorkerPool; 

    constructor(simParameters: CombatSimulationParameters, simMode: simModeType, numberSimulationsPerSeed: number) {
        this.baseSimParameters = simParameters;
        this.simMode = simMode; 
        this.numberSimulationsPerSeed = numberSimulationsPerSeed;
        //this.pool = workerpool.pool(__dirname + "/CombatSimulationWorker.ts");
        this.pool = workerpool.pool(undefined);  
    }

    getSimParametersToCompare(baseSimParameters: CombatSimulationParameters, numberSimulationsPerSeed: number, simMode: simModeType): CombatSimulationParameters[] {
        if (simMode === "multiple_compare_roomLevels") {
            return this.getSimParametersToCompare_RoomLevels(baseSimParameters, numberSimulationsPerSeed); 
        }
        if (simMode === "multiple_compare_skillTreeNodes") {
            // What should my next skill tree node be?
        }
        throw new Error("not implemented"); 
    }

    getSimParametersToCompare_RoomLevels(baseSimParameters: CombatSimulationParameters, numberSimulationsPerSeed: number): CombatSimulationParameters[] {
        // Use current settings as basis
        let result = [];
        
        for (let roomLevel = 1; roomLevel <= 20; roomLevel++) {
            for (let seed=baseSimParameters.seed; seed<baseSimParameters.seed + numberSimulationsPerSeed;seed++) {
                let simParamsLoop = Object.assign({}, baseSimParameters);
                simParamsLoop.seed = seed;
                simParamsLoop.roomLevel = roomLevel;
                result.push(simParamsLoop);
            }
        }
        return result; 
    }



    async run(): Promise<CombatSimulationResults[]> {
        let simParams: CombatSimulationParameters[] = this.getSimParametersToCompare(this.baseSimParameters, this.numberSimulationsPerSeed, this.simMode); 

        let simResults: CombatSimulationResults[] = [];
        for (let runID=0;runID<simParams.length;runID++) { //simParams.length
            let simResult = await combatSimulationWorker(simParams[runID], new Prando(simParams[runID].seed)); 
            simResult.runID = runID; 
            simResults.push(simResult); 
            Logger.log(1, "Finished runID=" + runID + " after " + simResult.durationWallTimeMS + "ms"); 
        }
        return simResults; 
    }

    async runParallel(): Promise<CombatSimulationResults[]> {
        let simParams: CombatSimulationParameters[] = this.getSimParametersToCompare(this.baseSimParameters, this.numberSimulationsPerSeed, this.simMode); 

        let simResults: CombatSimulationResults[] = [];
        return new Promise((resolve, reject) => {
            
            for (let runID=0;runID<20;runID++) { //simParams.length
                this.pool.exec((simParams: CombatSimulationParameters, verbosity: number, runID: number) =>  {
                        var Prando = require("Prando");
                        var Logger = require("../../../lib/src/util/Logger").Logger; 
                        Logger.verbosity = verbosity;  
                        var CombatSimulation = require("../../../lib/src/sim/CombatSimulation").CombatSimulation;

                        let sim = new CombatSimulation(simParams, new Prando(simParams.seed));
                        sim.init(); 
                        return sim.simulate().then(() => {
                            let simulationResults = sim.toSimulationResults(); 
                            simulationResults.runID = runID; 
                            return simulationResults; 
                        });
                    }, [simParams[runID], Logger.verbosity, runID])
                        .then((simulationResults: CombatSimulationResults) => {
                            Logger.log(1, "Finished run with runID=" + simulationResults.runID);
                            simResults.push(simulationResults);
                        })
                        .catch((err) => console.error(err))
                        .then(() => {
                            let stats = this.pool.stats();
                            if (stats.pendingTasks === 0 && stats.activeTasks === 0) {
                                Logger.log(1, "Terminating worker pool."); 
                                this.pool.terminate();
                                simResults.sort((a, b) => { return a.runID! - b.runID!; }); 
                                resolve(simResults); 
                            }
                        });
            }
        }); 

    }

    


}