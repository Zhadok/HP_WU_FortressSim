import { CombatSimulationParameters } from "../CombatSimulationParameters";
import { simGoalType as simGoalType, simulationResultsGroupedType, skillTreeFilterLessonsType, simAdvancedSettingsType } from "../../types";
import * as workerpool from 'workerpool';
import { CombatSimulationResults } from '../CombatSimulationResults';
import { combatSimulationWorker } from "./CombatSimulationWorker";
import { CombatSimulation } from "../CombatSimulation"; 
import Prando from 'prando';
import { Logger } from "../../util/Logger";
import { SkillTree } from '../../model/player/SkillTree/SkillTree';
import {CombatSimulationManager} from "./CombatSimulationManager"; 
import { SkillTreeNode } from "../../model/player/SkillTree/SkillTreeNode";

export class CombatSimulationComparison extends CombatSimulationManager {

    readonly simGoal: simGoalType; 
    readonly numberSimulationsPerSetting: number; 
    readonly baseSimParameters: CombatSimulationParameters; 
    readonly allSimParams: CombatSimulationParameters[]; 
    readonly pool: workerpool.WorkerPool; 


    constructor(simParameters: CombatSimulationParameters, simAdvancedSettings: simAdvancedSettingsType) {
        super(); 
        this.baseSimParameters = simParameters;
        this.simGoal = simAdvancedSettings.simGoal; 
        if (typeof simAdvancedSettings.numberSimulationsPerSetting !== "number") {
            throw new Error("Pass valid numberSimulationsPerSetting, value=" + simAdvancedSettings.numberSimulationsPerSetting); 
        }
        this.numberSimulationsPerSetting = simAdvancedSettings.numberSimulationsPerSetting;
        //this.pool = workerpool.pool(__dirname + "/CombatSimulationWorker.ts");
        this.pool = workerpool.pool(undefined); 
        this.allSimParams = this.getSimParametersToCompare(this.baseSimParameters, simAdvancedSettings); 
    }

    getSimParametersToCompare(baseSimParameters: CombatSimulationParameters, simAdvancedSettings: simAdvancedSettingsType): CombatSimulationParameters[] {
        if (simAdvancedSettings.simGoal === "multiple_compare_roomLevels") {
            return this.getSimParametersToCompare_RoomLevels(baseSimParameters, simAdvancedSettings); 
        }
        if (simAdvancedSettings.simGoal === "multiple_compare_skillTreeNodes") {
            // What should my next skill tree node be?
            return this.getSimParametersToCompare_SkillTreeNodes(baseSimParameters, simAdvancedSettings, 0); 
        }
        throw new Error("not implemented"); 
    }

    getSimParametersToCompare_RoomLevels(baseSimParameters: CombatSimulationParameters, simAdvancedSettings: simAdvancedSettingsType): CombatSimulationParameters[] {
        // Use current settings as basis
        let result: CombatSimulationParameters[] = [];
        
        for (let roomLevel = simAdvancedSettings.simGoalMultipleParams.simGoalMultiple_minRoomLevel; roomLevel <= simAdvancedSettings.simGoalMultipleParams.simGoalMultiple_maxRoomLevel; roomLevel++) {
            for (let seed=baseSimParameters.seed; seed<baseSimParameters.seed + simAdvancedSettings.numberSimulationsPerSetting;seed++) {
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
    getSimParametersToCompare_SkillTreeNodes(baseSimParameters: CombatSimulationParameters, simAdvancedSettings: simAdvancedSettingsType, playerIndex: number): CombatSimulationParameters[] {

        let baseSkillTree = SkillTree.fromPersisted(baseSimParameters.skillTrees[playerIndex]); 
        let nextPossibleLessons = baseSkillTree.getNextPossibleLessons(simAdvancedSettings.simGoalMultipleParams.simGoalMultiple_filterSkillTreeNodes); 

        let result: CombatSimulationParameters[] = [];
        // Push once for base (no changes in lessons)
        for (let seed=baseSimParameters.seed; seed<baseSimParameters.seed + simAdvancedSettings.numberSimulationsPerSetting;seed++) {
            let simParamsLoop: CombatSimulationParameters = JSON.parse(JSON.stringify(this.baseSimParameters)); 
            simParamsLoop.seed = seed;
            simParamsLoop.groupByValue = "Base"; 
            result.push(simParamsLoop); 
        }

        nextPossibleLessons.forEach((level, skillTreeNode) => {
            let skillTreeWithNextLesson = baseSkillTree.copy(); // What would the skill tree be with this lesson learned? 
            skillTreeWithNextLesson.setNodeLevelByName(skillTreeNode.name, level); 

            for (let seed=baseSimParameters.seed; seed<baseSimParameters.seed + simAdvancedSettings.numberSimulationsPerSetting;seed++) {
                let simParamsLoop: CombatSimulationParameters = JSON.parse(JSON.stringify(this.baseSimParameters)); 
                simParamsLoop.seed = seed;
                simParamsLoop.skillTrees[playerIndex] = skillTreeWithNextLesson.persist(); 
                simParamsLoop.groupByValue = skillTreeNode.name + " (" + level + ")"; 
                result.push(simParamsLoop); 
            }
            
        });

        return result;  
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
        this.updateSimProgress(); 
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
            this.updateSimProgress(); 
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
            let resultsFiltered: CombatSimulationResults[] = simulationMultipleResults.filter((results) => results.simParameters.groupByValue === uniqueGroupByValue);
            let nRuns = resultsFiltered.length;
            let nWins = resultsFiltered.map(r => r.isWin).map(isWin => Number(isWin)).reduce((a, b) => (a += b));
            let totalDamage = 0;
            let totalCasts = 0;
            let totalCritPercent = 0;
            let totalDodgePercent = 0;
            let nWizards = resultsFiltered[0].wizardResults.length;
            let totalNumberEnemies = 0;
            let totalNumberEnemiesDefeated = 0; 
            let totalChallengeXPReward = 0;
            let totalTimeSpentDeadMS = 0; 
            let totalGameTimeMSPassed = resultsFiltered.map(r => r.durationGameTimeMS).reduce((a, b) => a += b);
            let totalBrewTimeHours = 0; 
            let totalEnergyReward = 0; 
            for (let combatSimulationResults of resultsFiltered) {
                totalEnergyReward += combatSimulationResults.energyReward;
                totalNumberEnemies += combatSimulationResults.enemies.length; 
                // Need "" property here because functions are lost during serialization
                totalNumberEnemiesDefeated += combatSimulationResults.enemies.filter(e => e["isDefeated"] === true).length;
                
                // Results for X wizards of 1 concrete simulation
                for (let wizardResult of combatSimulationResults.wizardResults) {
                    // Result for 1 wizard of 1 concrete simulation
                    totalDamage += wizardResult.totalDamage;
                    totalCasts += wizardResult.numberOfCasts;
                    totalCritPercent += wizardResult.numberOfCriticalCasts / wizardResult.numberOfCasts;
                    totalDodgePercent += wizardResult.numberOfDodgedCasts / wizardResult.numberOfCasts;
                    // Wizard 1 and wizard 2 might have different number of casts, so averages must be weighted for averageNumberOfCritCasts
                    totalChallengeXPReward += wizardResult.challengeXPReward;
                    totalTimeSpentDeadMS += wizardResult.timeSpentDefeated; 
                    totalBrewTimeHours += wizardResult.potionsUsedBrewTimeHoursWithMasterNotes; 
                }
            }

            let averageNumberOfCasts = totalCasts / (nRuns * nWizards); 
            let averageGameTimeMS = totalGameTimeMSPassed / nRuns;
            let averageChallengeXPReward = totalChallengeXPReward / (nRuns * nWizards);

            let averageRunsPerHour = 3600 * 1000 / (averageGameTimeMS + 1000*secondsBetweenSimulations); 
            let averageChallengeXPRewardPerHour = averageChallengeXPReward * averageRunsPerHour; 
            let averageCastsPerHour = averageNumberOfCasts * averageRunsPerHour; 
            let averageEnergyRewardPerHour = (totalEnergyReward/nRuns) * averageRunsPerHour; 

            resultsGrouped.push({
                groupByValue: uniqueGroupByValue,

                //roomLevel: roomLevel,
                winPercentage: nWins / nRuns,
                averageDamage: totalDamage / totalCasts, // Average damage per cast
                averageNumberOfCasts: averageNumberOfCasts, // Average number of casts a wizard made 
                averageCritPercent: totalCritPercent / (nRuns * nWizards),
                averageDodgePercent: totalDodgePercent / (nRuns * nWizards),
                averageTotalDamage: totalDamage / (nRuns * nWizards),

                averageNumberEnemiesDefeated: totalNumberEnemiesDefeated / nRuns,
                averageNumberEnemies: totalNumberEnemies / nRuns,
                
                averageChallengeXPReward: averageChallengeXPReward,
                averageChallengeXPPerEnergy: averageChallengeXPReward / averageNumberOfCasts, 
                averageTimeSpentDeadMS: totalTimeSpentDeadMS / (nRuns * nWizards), 
                averageGameTimeMS: averageGameTimeMS,
                averageBrewTimeHours: totalBrewTimeHours / (nRuns * nWizards),

                averageRunsPerHour: averageRunsPerHour,
                averageChallengeXPRewardPerHour: averageChallengeXPRewardPerHour,
                averageEnergyPerHour: averageCastsPerHour - averageEnergyRewardPerHour,
                
                numberOfRuns: nRuns
            });
        }

        return resultsGrouped; 

    }
}