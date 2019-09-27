import { CombatSimulationParameters } from "../CombatSimulationParameters";
import { simModeType } from "../../types";
import * as workerpool from 'workerpool';
import { CombatSimulationResults } from '../CombatSimulationResults';
import { combatSimulationWorker } from "./CombatSimulationWorker";
import { CombatSimulation } from "../CombatSimulation"; 
import Prando from 'prando';

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
        this.pool = workerpool.pool(); 
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

    async run() {
        let simParams: CombatSimulationParameters[] = this.getSimParametersToCompare(this.baseSimParameters, this.numberSimulationsPerSeed, this.simMode); 

        let simResults: CombatSimulationResults[] = [];
        //return this.pool.exec("combatSimulationWorker", simParams); 
        for (let runID=0;runID<1;runID++) { //simParams.length
            /*let result = await this.pool.exec(
                
                , [simParams[runID]]); */
            this.pool.exec((simParams: CombatSimulationParameters) =>  {
               console.log(simParams)
               let sim = new CombatSimulation(simParams, new Prando(0));
               sim.init(); 
               sim.simulate();
               return sim.toSimulationResults();
            }, [simParams[runID]])
                .then((result) => console.log(result))
                .catch((err) => console.error(err))
                .then(() => this.pool.terminate());
            //console.log(result); 
        }
        //this.pool.stats
    }

    


}