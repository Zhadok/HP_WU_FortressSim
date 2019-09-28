import { CombatSimulationParameters } from "../CombatSimulationParameters";
import { simGoalType as simGoalType } from "../../types";
import * as workerpool from 'workerpool';
import { CombatSimulationResults } from '../CombatSimulationResults';
import { combatSimulationWorker } from "./CombatSimulationWorker";
import { CombatSimulation } from "../CombatSimulation"; 
import Prando from 'prando';
import { Logger } from "../../util/Logger";

export class CombatSimulationComparison {

    readonly simGoal: simGoalType; 
    readonly numberSimulationsPerSeed: number; 
    readonly baseSimParameters: CombatSimulationParameters; 
    readonly allSimParams: CombatSimulationParameters[]; 
    readonly pool: workerpool.WorkerPool; 
    listenerSimProgress: Function | null = null; 

    constructor(simParameters: CombatSimulationParameters, simGoal: simGoalType, numberSimulationsPerSeed: number) {
        this.baseSimParameters = simParameters;
        this.simGoal = simGoal; 
        this.numberSimulationsPerSeed = numberSimulationsPerSeed;
        //this.pool = workerpool.pool(__dirname + "/CombatSimulationWorker.ts");
        this.pool = workerpool.pool(undefined); 
        this.allSimParams = this.getSimParametersToCompare(this.baseSimParameters, this.numberSimulationsPerSeed, this.simGoal); 
    }

    getSimParametersToCompare(baseSimParameters: CombatSimulationParameters, numberSimulationsPerSeed: number, simMode: simGoalType): CombatSimulationParameters[] {
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

    setListenerSimProgress(listener: Function) {
        this.listenerSimProgress = listener; 
    }

    getNumberSimulationsTotal(): number {
        return this.allSimParams.length; 
    }

    async run(): Promise<CombatSimulationResults[]> {
        let simResults: CombatSimulationResults[] = [];
        for (let runID=0;runID<this.allSimParams.length;runID++) { //simParams.length
            let simResult = await combatSimulationWorker(this.allSimParams[runID], new Prando(this.allSimParams[runID].seed)); 
            simResult.runID = runID; 
            simResults.push(simResult); 
            Logger.log(1, "Finished runID=" + runID + " after " + simResult.durationWallTimeMS + "ms"); 
            if (this.listenerSimProgress !== null) {
                this.listenerSimProgress({
                    nTotal: this.allSimParams.length,
                    nFinished: runID+1,
                    nRemaining: this.allSimParams.length-(runID+1)
                }); 
            }
        }
        return simResults; 
    }

    async runParallel(): Promise<CombatSimulationResults[]> {

        let simResults: CombatSimulationResults[] = [];
        //let worker: Worker = new Worker("", {type: "module"}); 
        return new Promise((resolve, reject) => {
            
            for (let runID=0;runID<20;runID++) { //simParams.length
                this.pool.exec((workerParamsString) =>  {
                    var workerParams = JSON.parse(workerParamsString); 
                    //console.log("In worker!"); 
                    //importScripts("worker.js");
                    var Prando = require("prando");
                    var Logger = require("../../../lib/src/util/Logger").Logger; 
                    Logger.verbosity = workerParams.verbosity;  
                    //console.log(Logger); 
                    var CombatSimulation = require("../../../lib/src/sim/CombatSimulation").CombatSimulation;

                    let sim = new CombatSimulation(workerParams.simParams, new Prando(workerParams.simParams.seed));
                    sim.init(); 
                    return sim.simulate().then(() => {
                        let simulationResults = sim.toSimulationResults(); 
                        simulationResults.runID = workerParams.runID; 
                        return simulationResults; 
                    });
                }, [ JSON.stringify({simParams: this.allSimParams[runID], verbosity: Logger.verbosity, runID: runID}) ])
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