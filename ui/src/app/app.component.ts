import { Component, ViewChild, ElementRef } from '@angular/core';

import { CombatSimulation } from "../../../src/sim/CombatSimulation";
import Prando from 'prando';
import { TestData } from "../../../tests/TestData";
import { CombatSimulationParameters } from '../../../src/sim/CombatSimulationParameters';
import { nameClassType, nameClassUserFriendlyType, simGoalType as simGoalType, simAdvancedSettingsType,
     simProgressType, simulationResultsGroupedType, localStorageDataType, ruleVisDataRowType, ruleVisDataContainerType, simulationLogChannelStoreType, simulationLogChannelType, ruleContainerType, wizardSettingsType, ruleType, actionNameMapType, ruleOperatorType, ruleOperatorMapType, ruleFactNameType } from '../../../src/types';
import { PotionAvailabilityParameters } from '../../../src/sim/PotionAvailabilityParameters';
import { PersistedSkillTree } from '../../../src/model/player/SkillTree/PersistedSkillTree';
import { SkillTreeNode } from '../../../src/model/player/SkillTree/SkillTreeNode';
import { SkillTree } from "../../../src/model/player/SkillTree/SkillTree";
import { Professor } from '../../../src/model/player/Professor';
import { Magizoologist } from '../../../src/model/player/Magizoloogist';
import { Auror } from '../../../src/model/player/Auror';
import {MatExpansionModule, MatExpansionPanel} from '@angular/material/expansion';
import { statNameType } from '../../../src/types';
import { Logger } from '../../../src/util/Logger';
import { CombatSimulationResults } from '../../../src/sim/CombatSimulationResults';
import { CombatSimulationComparison } from '../../../src/sim//parallel/CombatSimulationComparison';
import {MatTable, MatTab } from "@angular/material"; 
import {MatTableDataSource} from '@angular/material/table';
import * as ObservableSlim from "observable-slim"; 
import {MatSortModule}from "@angular/material"; 
import {MatSort} from '@angular/material/sort';

import professorRules from "../../../src/rules/store/professorRules.json";
import aurorRules from "../../../src/rules/store/aurorRules.json";
import magizoologistRules from "../../../src/rules/store/magizoologistRules.json";
import { RulesEngine } from '../../../src/rules/RulesEngine';
import { Utils_UI } from './utils_ui';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { Wizard } from '../../../src/model/player/Wizard';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'], 
    animations: [
        trigger('detailExpand', [
          state('collapsed', style({height: '0px', minHeight: '0'})),
          state('expanded', style({height: '*'})),
          transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ])
    ]
})
export class AppComponent {
    
    readonly skillTreeVis = {
        rowHeight: 80,
        columnWidth: 120,
        marginTop: 30,
        marginLeft: 30,
        nodeCircleRadius: 30
    }; 

    readonly allowedClasses: { [key in nameClassType]: nameClassUserFriendlyType }; 

    // Advanced sim settings: Default settings
    simAdvancedSettings: simAdvancedSettingsType = {
        numberSimulations: 10,
        simGoal: "single",
        runParallel: false,
        secondsBetweenSimulations: 40, 
        simulationLogChannel: "User friendly"
    }; 
    

    // For showing results of simulations
    //simulationLog: string = "";
    simulationLogChannelStore: simulationLogChannelStoreType = {
        "Debug": "",
        "User friendly": ""
    }
    simulationSingleResults: CombatSimulationResults | null; 
    simulationMultipleResults: CombatSimulationResults[]; 
    //simulationMultipleResultsGrouped: simulationResultsGroupedType[]; 
    simulationMultipleResultsGrouped: MatTableDataSource<simulationResultsGroupedType>; 
    simProgress: simProgressType | null = null; 

    // Base sim parameters shown in UI
    simParameters: CombatSimulationParameters; 
    skillTrees: Array<SkillTree> = [];



    columnNamesMultipleSimulationsResultsGrouped = []; 
    @ViewChild("tableMultipleSimulationResults", {static: false}) matTableMultipleSimulationResults: MatTable<simulationResultsGroupedType>;
    //@ViewChild(MatSort, {static: false}) simulationMultipleResultsGroupedSort: MatSort
    
    columnNamesPlayerRules = ["priority", "event.type"]; 
    playerRulesData: ruleVisDataContainerType[] = []; // 3 containers of rule data
    

    constructor() {
        //let sim = new CombatSimulation(this.simParameters, new Prando(0));
        this.allowedClasses = {
            "auror": "Auror",
            "magizoologist": "Magizoologist",
            "professor": "Professor"
        };

        let self = this; 
        
        if (this.isPersistedInLocalStorage() === false) {
            // If nothing stored in localStorage
            this.simParameters = this.getInitialSimParameters();
            let initialWizardSettings = this.getInitialWizardSettings();
            this.addWizardSettings(initialWizardSettings);
        } else {
            this.initFromLocalStorage(); 
        }

        console.log("Initial sim parameters: ");
        console.log(this.simParameters); 
        console.log("Initial advanced settings: "); 
        console.log(this.simAdvancedSettings); 

        // Apply initial observer functions
        this.applyObserverFunctions({
            simAdvancedSettings: this.simAdvancedSettings, 
            simParameters: this.simParameters
        }); 
        

        Logger.callbackFunction = function(messageLine: string) {
            self.simulationLogChannelStore["Debug"] += messageLine + "\n"; 
        }
        Logger.callbackFunctionUserFriendly = function(messageLine: string) {
            self.simulationLogChannelStore["User friendly"] += messageLine + "\n"; 
        }
        this.simulationSingleResults = null; 
        this.simulationMultipleResultsGrouped = new MatTableDataSource(); 
        //this.simulationMultipleResultsGrouped.sort = this.simulationMultipleResultsGroupedSort; 

        //this.columnNamesPlayerRules = Object.keys(this.simParameters.ruleContainers[0].rules[0]); 
    }

    /*buildAllPlayerRulesData(): void {
        this.playerRulesData.push(this.buildPlayerRulesData(aurorRules as ruleContainerType, "Auror")); 
        this.playerRulesData.push(this.buildPlayerRulesData(magizoologistRules as ruleContainerType, "Magizoologist")); 
        this.playerRulesData.push(this.buildPlayerRulesData(professorRules as ruleContainerType, "Professor")); 
        //console.log(this.playerRulesData); 
    }
    // Convert rules json to table ready data
    buildPlayerRulesData(ruleContainer: ruleContainerType, nameClassUserFriendly: nameClassUserFriendlyType): ruleVisDataContainerType {
        let rulesDataRaw: ruleVisDataRowType[] = []; 

        ruleContainer.rules.forEach((ruleJSON, index) => {
            let conditionsString = ""; 
            ruleJSON.conditions.all.forEach((condition, indexCondition) => {
                let leftSide = condition.fact + "" + condition.path;
                let operator = RulesEngine.ruleOperatorMap[condition.operator]; 
                let rightSide = "";
                if (Utils_UI.isObject(condition.value)) {
                    rightSide = condition.value.fact + condition.value.path; 
                }
                else {
                    rightSide = condition.value; 
                }
                conditionsString += leftSide + operator + rightSide;
                if (indexCondition < ruleJSON.conditions.all.length - 1)
                    conditionsString += " AND ";   
            }); 
            
            rulesDataRaw.push({
                priority: 10000 - index, 
                action: ruleJSON.event.type, 
                conditionsString: conditionsString
            }); 
        });

        this.columnNamesPlayerRules = Object.keys(rulesDataRaw[0]); 

        //console.log(rulesDataRaw); 
        //let rulesDataSource = new MatTableDataSource(rulesDataRaw); 
        return {
            nameClassUserFriendly: nameClassUserFriendly, 
            rules: rulesDataRaw
        };
    }*/

    @ViewChild(MatSort, {static: true}) playerRulesTableSort: MatSort
    //playerRulesDataSources: Array<MatTableDataSource<ruleType>>; 
    ngOnInit() {
        console.log("In ngOnInit..."); 
        //this.playerRulesDataSources = []; 
        console.log(this.playerRulesTableSort); 
        //this.getPlayerRulesForTable(0).sort = this.playerRulesTableSort; 
    }
    
    getPlayerRulesForTable(playerIndex: number): MatTableDataSource<ruleType> {
        let result = new MatTableDataSource(this.simParameters.ruleContainers[playerIndex].rules); 
        result.sortingDataAccessor = (rule: ruleType, property) => {
            console.log("called with property=" + property); 
            switch(property) {
              case 'event.type': return rule.event.type; 
              default: return rule[property];
            }
          };
        
        //this.playerRulesTableSort.sortChange.subscribe(v=> console.log(v) )
        
        return result; 
    }

    // Which actions are allowed?
    getActionNameMap(playerIndex: number): actionNameMapType {
        // Todo: filter by class
        return RulesEngine.actionNameMap; 
    }

    // Which fact objects are allowed (wizard, highest priority available enemy)
    getAllowedRuleFactObjectsMap() {
        return RulesEngine.allowedFactObjects;
    }
     // Which path is allowed for object (e.g., .stats.power)
    getAllowedRuleFactPaths(playerIndex: number, ruleFactName: ruleFactNameType) {
        let result = RulesEngine.allowedFactObjects[ruleFactName].allowedPaths; 
        return result; 
    }

    // Which operators are allowed? (>, <, >= and so on)
    getRuleOperatorMap(): ruleOperatorMapType{
        return RulesEngine.ruleOperatorMap; 
    }

    onClickResetPlayerRules(playerIndex: number) {
        console.log("Resetting player rules for playerIndex=" + playerIndex + "..."); 
        this.simParameters.ruleContainers[playerIndex] = this.getDefaultRuleContainer(this.simParameters.nameClasses[playerIndex]); 
    }



    applyObserverFunctions(data: localStorageDataType) {
        //console.log("Applying observer function: ");
        //console.log(data); 
        var self  = this; 
        this.simParameters = ObservableSlim.create(data.simParameters, false, function(changes) {
            self.persistToLocalStorage.call(self); 
        }); 
        this.simAdvancedSettings = ObservableSlim.create(data.simAdvancedSettings, false, function(changes) {
            self.persistToLocalStorage.call(self); 
        }); 
    }

    onClickAddWizard() {
        console.log("Adding wizard...");
        let initialWizardSettings = this.getInitialWizardSettings();
        this.addWizardSettings(initialWizardSettings);
    }

    addWizardSettings(settings: wizardSettingsType): void {
        this.simParameters.nameClasses.push(settings.nameClass);
        this.simParameters.potions.push(settings.potions);
        this.simParameters.runestoneLevels.push(settings.runestoneLevel);
        this.simParameters.skillTrees.push(settings.skillTree);
        this.simParameters.ruleContainers.push(settings.ruleContainer); 
        this.skillTrees.push(new SkillTree(settings.nameClass));
    }

    onClickRemoveWizard(playerIndex: number) {
        console.log("Removing wizard with playerIndex=" + playerIndex);
        this.simParameters.nameClasses.splice(playerIndex, 1);
        this.simParameters.potions.splice(playerIndex, 1);
        this.simParameters.runestoneLevels.splice(playerIndex, 1);
        this.simParameters.skillTrees.splice(playerIndex, 1);
        this.simParameters.ruleContainers.splice(playerIndex, 1); 
        this.skillTrees.splice(playerIndex, 1);
    }

    onChangeSelectWizardClass(event, playerIndex: number): void {
        if (this.skillTrees[playerIndex].nameClass === event.value) {
            return; 
        }
        else {
            console.log("Changing playerIndex=" + playerIndex + " class to " + event.value);
            this.simParameters.skillTrees[playerIndex] = {nameClass: event.value, nodesStudied: []}
            this.skillTrees[playerIndex] = new SkillTree(event.value);
        }
    }

    onClickSkillTreeNode(node: SkillTreeNode, playerIndex: number): void {
        let skillTree = this.skillTrees[playerIndex];
        let currentLevel: number = skillTree.nodesStudied.get(node)!;
        let maxLevel = node.levels.length;
        skillTree.nodesStudied.set(node, (currentLevel + 1) % (maxLevel+1));

        this.persistSkillTree(skillTree, playerIndex); 
        
    }

    onClickButtonLearnAllLessonsScrolls(playerIndex: number): void {
        console.log("Learning all lessons with scrolls in skill tree for playerIndex=" + playerIndex); 
        let skillTree = this.skillTrees[playerIndex];
        skillTree.learnAllLessonsWithScrolls(); 
        
        this.persistSkillTree(skillTree, playerIndex); 
    }
    onClickButtonLearnAllLessons(playerIndex: number): void {
        console.log("Learning all lessons in skill tree for playerIndex=" + playerIndex); 
        let skillTree = this.skillTrees[playerIndex];
        skillTree.learnAllLessons(); 
        
        this.persistSkillTree(skillTree, playerIndex); 
    }
    onClickButtonResetSkillTree(playerIndex): void {
        console.log("Resetting skill tree for playerIndex=" + playerIndex); 
        let skillTree = this.skillTrees[playerIndex];
        skillTree.resetSkillTree(); 
        
        this.persistSkillTree(skillTree, playerIndex); 
    }

    persistSkillTree(skillTree: SkillTree, playerIndex: number) {
        this.simParameters.skillTrees[playerIndex] = skillTree.persist();
    }

    resetSimulationResults() {
        this.simulationLogChannelStore["Debug"] = "";
        this.simulationLogChannelStore["User friendly"] = "";
        this.closeSettingsPanels();
        
    }

    getSimParametersCopy(): CombatSimulationParameters {
        return JSON.parse(JSON.stringify(this.simParameters)); 
    }
    unproxy(proxy: any): Object {
        let result = JSON.parse(JSON.stringify(proxy)); 
        console.log(result); 
        return result; 
    }

    async onClickButtonStartSingleSimulation() {
        this.resetSimulationResults(); 
        this.simAdvancedSettings.simGoal = "single";
        console.log("Starting single simulation with parameters:");
        console.log(this.simParameters);

        Logger.verbosity = 2; 
        let sim = new CombatSimulation(this.getSimParametersCopy(), new Prando(this.simParameters.seed));
        sim.init();
        await sim.simulate(); 
        this.simulationSingleResults = sim.toSimulationResults(); 
        console.log("Results of the simulation are: "); 
        console.log(this.simulationSingleResults); 
    }

    async onClickButtonStartMultipleSimulations_compareRoomLevels() {
        await this.onClickButtonStartMultipleSimulations("multiple_compare_roomLevels"); 
    }
    async onClickButtonStartMultipleSimulations_compareSkillTreeNodes() {
        await this.onClickButtonStartMultipleSimulations("multiple_compare_skillTreeNodes"); 
    }

    async onClickButtonStartMultipleSimulations(simGoal: simGoalType)  {
        this.resetSimulationResults(); 
        this.simAdvancedSettings.simGoal = simGoal; 
        var self = this; 
        let simComparison = new CombatSimulationComparison(this.getSimParametersCopy(), this.simAdvancedSettings.simGoal, this.simAdvancedSettings.numberSimulations);
        this.simProgress = {
            nFinished: 0,
            nRemaining: simComparison.getNumberSimulationsTotal(),
            nTotal: simComparison.getNumberSimulationsTotal()
        };
        simComparison.setListenerSimProgress((simProgress: simProgressType) => {
            //console.log(simProgress); 
            self.simProgress = simProgress; 
        });

        Logger.verbosity = 1; 
        if (this.simAdvancedSettings.runParallel === false) {
            self.simulationMultipleResults = []; 
            setTimeout(function() {
                self.onFinishOneSimulation.call(self, simComparison); 
            }, 0); 

            // This is blocking 
            /* 
            setTimeout(async function() {
                self.simulationMultipleResults = await simComparison.runAllSync(); 
                self.simProgress = null; 
                self.updateSimulationMultipleResultsGrouped.call(self); 
            }, 100);  */
        }
        else {
            this.simulationMultipleResults = await simComparison.runParallel(); 
            this.simProgress = null; 
            this.updateSimulationMultipleResultsGrouped(); 
        }
    }

    onChangeSelectSimulationLogChannel(event) {
        //console.log(event);
        this.simAdvancedSettings.simulationLogChannel = event.value; 
    }

    async onFinishOneSimulation(simComparison: CombatSimulationComparison) {
        let simResult = await simComparison.runNext();  
        this.simulationMultipleResults.push(simResult); 
        if (simComparison.isFinished() === false) {
            var self = this; 
            setTimeout(function() {
                self.onFinishOneSimulation.call(self, simComparison); 
            }, 0); 
        }
        else {
            this.simProgress = null; 
            this.updateSimulationMultipleResultsGrouped(); 
        }
    }


     updateSimulationMultipleResultsGrouped() {

        let uniqueRoomLevels: number[] = Array.from(new Set(this.simulationMultipleResults.map(result => result.simParameters.roomLevel)));
        let resultsGrouped: simulationResultsGroupedType[] = []; 
        if (this.simAdvancedSettings.simGoal === "multiple_compare_roomLevels") {
            // Group by room level (example total runs: 200)
            for (let roomLevel of uniqueRoomLevels) {
                // All  results for X simulations of this room level (example runs: 10)
                let resultsFiltered = this.simulationMultipleResults.filter((results) => results.simParameters.roomLevel === roomLevel); 
                let nRuns = resultsFiltered.length; 
                let nWins = resultsFiltered.map(r => r.isWin).map(isWin => Number(isWin)).reduce((a,b) => (a+=b)); 
                let totalDamage = 0; 
                let totalCasts = 0; 
                let totalCritCasts = 0;
                let totalDodgeCasts = 0; 
                let nWizards = resultsFiltered[0].wizardResults.length; 
                let totalChallengeXPReward = 0; 
                let totalGameTimeMSPassed = resultsFiltered.map(r => r.durationGameTimeMS).reduce((a, b) => a+=b); 
                for (let wizardResultArray of resultsFiltered.map(r => r.wizardResults)) {
                    // Results for X wizards of 1 concrete simulation
                    for (let wizardResult of wizardResultArray) {
                        // Result for 1 wizard of 1 concrete simulation
                        totalDamage += wizardResult.totalDamage; 
                        totalCasts += wizardResult.numberOfCasts; 
                        totalCritCasts += wizardResult.numberOfCriticalCasts; 
                        totalDodgeCasts += wizardResult.numberOfDodgedCasts; 
                        // Wizard 1 and wizard 2 might have different number of casts, so averages must be weighted for averageNumberOfCritCasts
                        totalChallengeXPReward += wizardResult.challengeXPReward; 
                    }
                }

                let averageGameTimeMS = totalGameTimeMSPassed / nRuns;
                let averageChallengeXPReward = totalChallengeXPReward / (nRuns * nWizards); 
                let averageChallengeXPRewardPerHour = averageChallengeXPReward * (3600*1000 / (averageGameTimeMS + this.simAdvancedSettings.secondsBetweenSimulations)); 
                
                resultsGrouped.push({
                    roomLevel: roomLevel,
                    winPercentage: nWins / nRuns,
                    averageDamage: totalDamage / totalCasts, // Average damage per cast
                    averageNumberOfCasts: totalCasts / (nRuns * nWizards), // Average number of casts a wizard made 
                    averageNumberOfCriticalCasts: totalCritCasts / (nRuns * nWizards),
                    averageNumberOfDodgedCasts: totalDodgeCasts / (nRuns * nWizards), 
                    averageTotalDamage: totalDamage / (nRuns * nWizards),
                    averageGameTimeMS: averageGameTimeMS,

                    averageChallengeXPReward: averageChallengeXPReward, 
                    averageChallengeXPRewardPerHour: averageChallengeXPRewardPerHour,

                    numberOfRuns: nRuns
                });
            }
            //this.simulationMultipleResultsGrouped.data = resultsGrouped; 
            this.simulationMultipleResultsGrouped = new MatTableDataSource(resultsGrouped); 
            //this.simulationMultipleResultsGrouped.sort = this.simulationMultipleResultsGroupedSort; 
            this.columnNamesMultipleSimulationsResultsGrouped = Object.keys(resultsGrouped[0]);

            //console.log(this.simulationMultipleResultsGrouped); 
            //console.log(this.columnNamesMultipleSimulationsResultsGrouped); 
            //this.matTableMultipleSimulationResults.renderRows(); 
        }
    }


    @ViewChild("matPanelInputParameters", {static: false}) matPanelInputParameters: MatExpansionPanel;
    @ViewChild("matPanelAdvancedSimulationSettings", {static: false}) matPanelAdvancedSimulationSettings: MatExpansionPanel;
    @ViewChild("matPanelSimulationResults", {static:false}) matPanelSimulationResults: MatExpansionPanel;
    closeSettingsPanels(): void {
        //this.matPanelInputParameters.close();
        //this.matPanelAdvancedSimulationSettings.close(); 
        this.matPanelSimulationResults.open(); 
    }

    // Dependencies can look like the following: ["10/2", "9/3"]
    getDependenciesFromSkillTreeNode(dependencies: Array<string>) {
        var result = [];
        for (let dependency of dependencies) {
            let parts = dependency.split("/");
            result.push({
                rowIndex: parseInt(parts[0]),
                columnIndex: parseInt(parts[1])
            });
        }
        return result; 
    }
    
    // Reverse camel case (deficiencyDefence="Defenciency Defense")
    formatUserFriendlyStat(statName: string): string {
        let result = "";
        for (var i = 0; i < statName.length; i++) {
            if (i==0) {
                // Always make first character upper case
                result += statName.charAt(i).toUpperCase();
            }
            else if (this.isUppercase(statName.charAt(i))) {
                // If a character is upper case, first add a space
                result += " ";
            }
            if (i!=0) {
                result += statName.charAt(i);
            }
        }
        return result; 
    }
    isUppercase(char: string):boolean {
        return char === char.toUpperCase(); 
    }
    isValidStatForClass(statName: statNameType, playerIndex: number): boolean {
        if (this.simParameters.nameClasses[playerIndex] == "professor") return Professor.isValidStatForClass(statName);
        if (this.simParameters.nameClasses[playerIndex] == "magizoologist") return Magizoologist.isValidStatForClass(statName);
        if (this.simParameters.nameClasses[playerIndex] == "auror") return Auror.isValidStatForClass(statName);

        throw new Error("Unknown class name: " + this.simParameters.nameClasses[playerIndex]);
    }

    getSkillTreeNodeTooltip(node: SkillTreeNode): string {
        let result = "";
        node.levels.forEach(level => {
            let costString = " (" +
                             ((level.costScrolls > 0) ? "scrolls: " + level.costScrolls : "") + 
                             ((level.costRedBooks > 0) ? ", red books: " + level.costRedBooks  : "") +
                             ((level.costRSB > 0) ? ", green books: " + level.costRSB : "") + 
                            ")";
            let statDescription = (node.statChangeDescription) ? node.statChangeDescription : this.formatUserFriendlyStat(node.statChanged);
            result += statDescription + ": +" + 
                        level.statChange + 
                        costString + 
                        "\n"; 
        });
        return result;
    }

    getChamberName(roomLevel: number): string {
        let roomType = "";
        if (roomLevel / 5 > 3) {
            roomType = "Dark Chamber"; 
        }
        else if (roomLevel / 5 > 2) {
            roomType = "Forest Chamber";
        }
        else if (roomLevel / 5 > 1) {
            roomType = "Tower Chamber";
        }
        else {
            roomType = "Ruins Chamber"; 
        }
        let chamberLevel = "";
        switch (roomLevel % 5) {
            case 1: chamberLevel = "I"; break; 
            case 2: chamberLevel = "II"; break; 
            case 3: chamberLevel = "III"; break; 
            case 4: chamberLevel = "IV"; break; 
            case 0: chamberLevel = "V"; break; 
        }

        return roomType + " " + chamberLevel; 
    }

    // Todo: Use localstorage
    getInitialSimParameters(): CombatSimulationParameters {
        return {
            seed: 0,
            roomLevel: 1,
            nameClasses: [],
            potions: [],
            runestoneLevels: [],
            skillTrees: [],
            ruleContainers: []
        }; 
    }

    getInitialWizardSettings(): wizardSettingsType {
        return {
            nameClass: "professor" ,
            potions: this.getInitialPotionAvailability(),
            runestoneLevel: 1,
            skillTree: {nameClass: "professor", nodesStudied: []},
            ruleContainer: this.getDefaultRuleContainer("professor")
        }
    }
    getDefaultRuleContainer(nameClass: nameClassType): ruleContainerType {
        let result: ruleContainerType; 
        switch (nameClass) {
            case "auror": result = aurorRules as ruleContainerType;
            case "magizoologist": result = magizoologistRules as ruleContainerType;
            case "professor": result = professorRules as ruleContainerType; 
        }
        return JSON.parse(JSON.stringify(result));
    }

    getInitialPotionAvailability(): PotionAvailabilityParameters {
        return {
            nExstimuloAvailable: 0,
            nStrongExstimuloAvailable: 0,
            nPotentExstimuloAvailable: 0,
            nHealingPotionsAvailable: 0,
            nWeakInvigorationAvailable: 0,
            nStrongInvigorationAvailable: 0,
            nWitSharpeningAvailable: 0
        };
    }

    initFromLocalStorage(): void {
        let data = this.getDataFromLocalStorage(); 
        this.simAdvancedSettings = data.simAdvancedSettings; 
        this.simParameters = data.simParameters;
        for (let persistedSkillTree of this.simParameters.skillTrees) {
            this.skillTrees.push(SkillTree.fromPersisted(persistedSkillTree));
        }
    }


    isPersistedInLocalStorage(): boolean {
        return localStorage.getItem("savedData") !== null; 
    }

    getDataFromLocalStorage(): localStorageDataType {
        let data = JSON.parse(localStorage.getItem("savedData")!); 
        return data; 
    }

    persistToLocalStorage(): void {
        console.log("Persisting to local storage: ...");
        //console.log(this.simParameters.potions); 
        // Persist neccessary attributes of this class
        localStorage.setItem("savedData", JSON.stringify({
            simAdvancedSettings: this.simAdvancedSettings, 
            simParameters: this.simParameters
        }));
    }

    importDataFromFile(): void {

        this.createFileUpload(); 
    }

    exportDataToFile(): void {
        let data = this.getDataFromLocalStorage(); 
        this.createFileDownload("simulationParameters.json", JSON.stringify(data)); 
    }

    createFileUpload() {
        var element = document.createElement("input"); 
        element.setAttribute("type", "file"); 
        var self = this;
        element.addEventListener("change", function(event) {
            self.onUploadFileSelect.call(self, event); 
        }); 

        element.style.display = 'none';
        document.body.appendChild(element);
        element.click(); 

        document.body.removeChild(element); 
    }


    // https://stackoverflow.com/questions/16505333/get-the-data-of-uploaded-file-in-javascript
    onUploadFileSelect(event) {
        var files = event.target.files; // FileList object
    
        // use the 1st file from the list
        let f = files[0];
    
        var reader = new FileReader();
        var self = this; 
        // Closure to capture the file information.
        reader.onload = (function(theFile) {
            return function(e) {
                console.log("Importing data from file: ");
                console.log(e.target.result); 
                let importedData: localStorageDataType = JSON.parse(e.target.result); 
                //console.log(self.simAdvancedSettings); 
                self.applyObserverFunctions.call(self, importedData); 
                self.persistToLocalStorage(); 
                //self.simAdvancedSettings = data.simAdvancedSettings; 
                //self.simParameters = data.simParameters; 
            };
        })(f);
    
        // Read in the image file as a data URL.
        reader.readAsText(f);
      }

    // https://ourcodeworld.com/articles/read/189/how-to-create-a-file-and-generate-a-download-with-javascript-in-the-browser-without-a-server
    createFileDownload(filename, text) {
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);
      
        element.style.display = 'none';
        document.body.appendChild(element);
      
        element.click();
      
        document.body.removeChild(element);
      }
      

}
