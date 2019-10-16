import { CombatSimulationParameters } from "../CombatSimulationParameters";
import { simGoalType as simGoalType, simulationResultsGroupedType } from "../../types";
import * as workerpool from 'workerpool';
import { CombatSimulationResults } from '../CombatSimulationResults';
import { combatSimulationWorker } from "./CombatSimulationWorker";
import { CombatSimulation } from "../CombatSimulation"; 
import Prando from 'prando';
import { Logger } from "../../util/Logger";
import { SkillTree } from '../../model/player/SkillTree/SkillTree';

export class CombatSimulationComparison {

    readonly simGoal: simGoalType; 
    readonly numberSimulationsPerSettings: number; 
    readonly baseSimParameters: CombatSimulationParameters; 
    readonly allSimParams: CombatSimulationParameters[]; 
    readonly pool: workerpool.WorkerPool; 
    listenerSimProgress: Function | null = null; 

    currentRunID: number = 0; 

    constructor(simParameters: CombatSimulationParameters, simGoal: simGoalType, numberSimulationsPerSetting: number) {
        this.baseSimParameters = simParameters;
        this.simGoal = simGoal; 
        this.numberSimulationsPerSettings = numberSimulationsPerSetting;
        //this.pool = workerpool.pool(__dirname + "/CombatSimulationWorker.ts");
        this.pool = workerpool.pool(undefined); 
        this.allSimParams = this.getSimParametersToCompare(this.baseSimParameters, this.numberSimulationsPerSettings, this.simGoal); 
    }

    getSimParametersToCompare(baseSimParameters: CombatSimulationParameters, numberSimulationsPerSettings: number, simMode: simGoalType): CombatSimulationParameters[] {
        if (simMode === "multiple_compare_roomLevels") {
            return this.getSimParametersToCompare_RoomLevels(baseSimParameters, numberSimulationsPerSettings); 
        }
        if (simMode === "multiple_compare_skillTreeNodes") {
            // What should my next skill tree node be?
            return this.getSimParametersToCompare_SkillTreeNodes(baseSimParameters, 0, numberSimulationsPerSettings); 
        }
        throw new Error("not implemented"); 
    }

    getSimParametersToCompare_RoomLevels(baseSimParameters: CombatSimulationParameters, numberSimulationsPerSettings: number): CombatSimulationParameters[] {
        // Use current settings as basis
        let result: CombatSimulationParameters[] = [];
        
        for (let roomLevel = 1; roomLevel <= 20; roomLevel++) {
            for (let seed=baseSimParameters.seed; seed<baseSimParameters.seed + numberSimulationsPerSettings;seed++) {
                let simParamsLoop: CombatSimulationParameters = JSON.parse(JSON.stringify(this.baseSimParameters)); 
                simParamsLoop.seed = seed;
                simParamsLoop.roomLevel = roomLevel;
                simParamsLoop.groupByValue = roomLevel + "" + (roomLevel === baseSimParameters.roomLevel ? " (base)" : ""); 
                result.push(simParamsLoop);
            }
        }
        return result; 
    }

    // Only compare skill tree nodes for single player (else computationally very big)
    getSimParametersToCompare_SkillTreeNodes(baseSimParameters: CombatSimulationParameters, playerIndex: number, numberSimulationsPerSeed: number): CombatSimulationParameters[] {
        let result: CombatSimulationParameters[] = [];
        let baseSkillTree = SkillTree.fromPersisted(baseSimParameters.skillTrees[playerIndex]); 
        let nextPossibleLessons = baseSkillTree.getNextPossibleLessons(); 

        // Push once for base (no changes in lessons)
        for (let seed=baseSimParameters.seed; seed<baseSimParameters.seed + numberSimulationsPerSeed;seed++) {
            let simParamsLoop: CombatSimulationParameters = JSON.parse(JSON.stringify(this.baseSimParameters)); 
            simParamsLoop.seed = seed;
            simParamsLoop.groupByValue = "Base"; 
            result.push(simParamsLoop); 
        }

        nextPossibleLessons.forEach((level, skillTreeNode) => {
            let skillTreeWithNextLesson = baseSkillTree.copy(); // What would the skill tree be with this lesson learned? 
            skillTreeWithNextLesson.setNodeLevelByName(skillTreeNode.name, level); 

            for (let seed=baseSimParameters.seed; seed<baseSimParameters.seed + numberSimulationsPerSeed;seed++) {
                let simParamsLoop: CombatSimulationParameters = JSON.parse(JSON.stringify(this.baseSimParameters)); 
                simParamsLoop.seed = seed;
                simParamsLoop.skillTrees[playerIndex] = skillTreeWithNextLesson.persist(); 
                simParamsLoop.groupByValue = skillTreeNode.name + " (" + level + ")"; 
                result.push(simParamsLoop); 
            }
            
        });

        return result;  
    }

    setListenerSimProgress(listener: Function) {
        this.listenerSimProgress = listener; 
    }

    getNumberSimulationsTotal(): number {
        return this.allSimParams.length; 
    }

    isFinished() {
        return this.currentRunID === this.allSimParams.length; 
    }

    // Run next: Designed to give back control to browser
    async runNext() {
        let simResult = await combatSimulationWorker(this.allSimParams[this.currentRunID], new Prando(this.allSimParams[this.currentRunID].seed)); 
        Logger.log(1, "Finished runID=" + this.currentRunID + " after " + simResult.durationWallTimeMS + "ms"); 
        this.currentRunID++;
        if (this.listenerSimProgress !== null) {
            this.listenerSimProgress({
                nTotal: this.allSimParams.length,
                nFinished: this.currentRunID,
                nRemaining: this.allSimParams.length-(this.currentRunID)
            }); 
        }
        return simResult;  
    }

    // Run all sync
    async runAllSync(): Promise<CombatSimulationResults[]> {
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

    // Run all parallel
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

    

    static groupResults(simulationMultipleResults: CombatSimulationResults[], secondsBetweenSimulations: number): simulationResultsGroupedType[] {
        let uniqueGroupByValues = Array.from(new Set(simulationMultipleResults.map(result => result.simParameters.groupByValue)));

        let resultsGrouped: simulationResultsGroupedType[] = [];

        for (let uniqueGroupByValue of uniqueGroupByValues) { // Could be roomLevel or next skill tree node
            // All  results for X simulations of this room level (example runs: 10)
            let resultsFiltered = simulationMultipleResults.filter((results) => results.simParameters.groupByValue === uniqueGroupByValue);
            let nRuns = resultsFiltered.length;
            let nWins = resultsFiltered.map(r => r.isWin).map(isWin => Number(isWin)).reduce((a, b) => (a += b));
            let totalDamage = 0;
            let totalCasts = 0;
            let totalCritPercent = 0;
            let totalDodgePercent = 0;
            let nWizards = resultsFiltered[0].wizardResults.length;
            let totalChallengeXPReward = 0;
            let totalGameTimeMSPassed = resultsFiltered.map(r => r.durationGameTimeMS).reduce((a, b) => a += b);
            for (let wizardResultArray of resultsFiltered.map(r => r.wizardResults)) {
                // Results for X wizards of 1 concrete simulation
                for (let wizardResult of wizardResultArray) {
                    // Result for 1 wizard of 1 concrete simulation
                    totalDamage += wizardResult.totalDamage;
                    totalCasts += wizardResult.numberOfCasts;
                    totalCritPercent += wizardResult.numberOfCriticalCasts / wizardResult.numberOfCasts;
                    totalDodgePercent += wizardResult.numberOfDodgedCasts / wizardResult.numberOfCasts;
                    // Wizard 1 and wizard 2 might have different number of casts, so averages must be weighted for averageNumberOfCritCasts
                    totalChallengeXPReward += wizardResult.challengeXPReward;
                }
            }

            let averageGameTimeMS = totalGameTimeMSPassed / nRuns;
            let averageChallengeXPReward = totalChallengeXPReward / (nRuns * nWizards);
            let averageChallengeXPRewardPerHour = averageChallengeXPReward * (3600 * 1000 / (averageGameTimeMS + secondsBetweenSimulations));

            resultsGrouped.push({
                groupByValue: uniqueGroupByValue,

                //roomLevel: roomLevel,
                winPercentage: nWins / nRuns,
                averageDamage: totalDamage / totalCasts, // Average damage per cast
                averageNumberOfCasts: totalCasts / (nRuns * nWizards), // Average number of casts a wizard made 
                averageCritPercent: totalCritPercent / (nRuns * nWizards),
                averageDodgePercent: totalDodgePercent / (nRuns * nWizards),
                averageTotalDamage: totalDamage / (nRuns * nWizards),
                averageGameTimeMS: averageGameTimeMS,

                averageChallengeXPReward: averageChallengeXPReward,
                averageChallengeXPRewardPerHour: averageChallengeXPRewardPerHour,

                numberOfRuns: nRuns
            });
        }

        return resultsGrouped; 

    }
}