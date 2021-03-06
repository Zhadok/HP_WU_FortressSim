import { Component, ViewChild, ElementRef, NgZone, ViewChildren, QueryList } from '@angular/core';
import compareVersions from 'compare-versions';

import { CombatSimulation } from "../../../src/sim/CombatSimulation";
import Prando from 'prando';
import { TestData } from "../../../tests/TestData";
import { CombatSimulationParameters } from '../../../src/sim/CombatSimulationParameters';
import {
    nameClassType, nameClassUserFriendlyType, simGoalType as simGoalType, simAdvancedSettingsType,
    simProgressType, simulationResultsGroupedType, localStorageDataType, ruleVisDataRowType, ruleVisDataContainerType, simulationLogChannelStoreType, simulationLogChannelType, ruleContainerType, wizardSettingsType, ruleType, actionNameMapType, ruleOperatorType, ruleOperatorMapType, ruleFactNameType, ruleConditionType, simGoalMapType, skillTreeFilterLessonsType, webWorkerMessageContainerType, actionNameType, playerActionSelectionModeMapType, ruleFactType, manualActionContainerType, ruleStoreType
} from '../../../src/types';
import { PotionAvailabilityParameters } from '../../../src/sim/PotionAvailabilityParameters';
import { PersistedSkillTree } from '../../../src/model/player/SkillTree/PersistedSkillTree';
import { SkillTreeNode } from '../../../src/model/player/SkillTree/SkillTreeNode';
import { SkillTree } from "../../../src/model/player/SkillTree/SkillTree";
import { Professor } from '../../../src/model/player/Professor';
import { Magizoologist } from '../../../src/model/player/Magizoologist';
import { Auror } from '../../../src/model/player/Auror';
import { MatExpansionModule, MatExpansionPanel } from '@angular/material/expansion';
import { statNameType } from '../../../src/types';
import { Logger } from '../../../src/util/Logger';
import { CombatSimulationResults } from '../../../src/sim/CombatSimulationResults';
import { CombatSimulationComparison } from '../../../src/sim//parallel/CombatSimulationComparison';
import { MatTable, MatTab, ErrorStateMatcher, MatSelect, MatSnackBar } from "@angular/material";
import { MatTableDataSource } from '@angular/material/table';
import * as ObservableSlim from "observable-slim";
import { MatSortModule } from "@angular/material";
import { MatSort, Sort } from '@angular/material/sort';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


import fortressRewardData from "../../../src/data/fortressRewards.json";
import professorRules from "../../../src/rules/store/professorRules.json";
import aurorRules from "../../../src/rules/store/aurorRules.json";
import magizoologistRules from "../../../src/rules/store/magizoologistRules.json";
import { RulesEngine } from '../../../src/rules/action/RulesEngine';
import { Utils_UI } from './utils_ui';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Wizard } from '../../../src/model/player/Wizard';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { version as packageJsonVersion } from '../../package.json';
import { Utils } from '../../../src/util/Utils';
import { FortressRoom } from '../../../src/model/env/FortressRoom';
import { ChangeDetectorRef } from '@angular/core';
import { WebWorkerPool } from './WebWorkerPool';
import { PlayerActionEngine } from '../../../src/rules/action/PlayerActionEngine';
import { ManualPlayerActionEngine } from '../../../src/rules/action/ManulPlayerActionEngine';
import { ManualActionSelectionSimulationComponent } from './manual-action-selection-simulation/manual-action-selection-simulation.component';
import { URLHashManager } from './URLHashManager';
import { RulesStore } from '../../../src/rules/store/RulesStore';
import { DialogChangelogComponent } from './dialog-changelog/dialog-changelog.component';


const cookieConfig: any = {
    "cookie": {
        "domain": "zhadok.github.io"
    },
    "position": "bottom",
    "theme": "classic",
    "palette": {
        "popup": {
            "background": "#000000",
            "text": "#ffffff",
            "link": "#ffffff"
        },
        "button": {
            "background": "#f1d600",
            "text": "#000000",
            "border": "transparent"
        }
    },
    "type": "info",
    "content": {
        "message": "This website uses cookies to ensure you get the best experience on our website.",
        "dismiss": "Got it!",
        "deny": "Refuse cookies",
        "link": "Learn more",
        "href": "https://cookiesandyou.com",
        "policy": "Cookie Policy"
    }
};

/** Error when invalid control is dirty, touched, or submitted. */
export class RuleErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        console.log(control);
        return true;
    }
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({ height: '0px', minHeight: '0' })),
            state('expanded', style({ height: '*' })),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ])
    ]
})
export class AppComponent {

    readonly fortressRewardData = fortressRewardData;
    readonly skillTreeVis = {
        rowHeight: 80,
        columnWidth: 120,
        marginTop: 45,
        marginLeft: 30,
        nodeCircleRadius: 30
    };

    readonly allowedClasses: { [key in nameClassType]: nameClassUserFriendlyType };

    // Advanced sim settings: Default settings
    simAdvancedSettings: simAdvancedSettingsType = {
        simulationVersion: packageJsonVersion,

        showPlayerRules: true,
        numberSimulationsPerSetting: 10,

        simGoal: "single",
        simGoalMultipleParams: {
            simGoalMultiple_filterSkillTreeNodes: "all",
            simGoalMultiple_minRoomLevel: 1,
            simGoalMultiple_maxRoomLevel: 20
        },

        runParallel: this.isWebWorkerSupported(),
        numberParallelWorkers: navigator.hardwareConcurrency - 1,
        secondsBetweenSimulations: 40,
        simulationLogChannel: "User friendly",

        isAdvancedSettingsTabExpanded: false,
        closeAdvancedSettingsTabOnStartSimulation: false,
        closeSimParametersTabOnStartSimulation: false,
        closeStartSimulationTabOnStartSimulation: false
    };


    // Base sim parameters shown in UI
    simParameters: CombatSimulationParameters;
    skillTrees: Array<SkillTree> = [];

    // Player rules
    columnNamesPlayerRules = ["event.type", "priority"];
    playerRulesData: ruleVisDataContainerType[] = []; // 3 containers of rule data
    ruleErrorStateMatcher = new RuleErrorStateMatcher();

    // Manual simulation
    runningSimulation: CombatSimulation | null = null;

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

    shareDataURL: string | null = null;

    // Multiple sim results comparison
    columnNamesMultipleSimulationsResultsGrouped = [];
    simGoalMap: simGoalMapType = { // Label of column for groupByAttributeValue
        single: "Single",
        multiple_compare_roomLevels: "Room level",
        multiple_compare_skillTreeNodes: "Lesson"
    };

    // Worker pool
    workerPool: WebWorkerPool;

    constructor(private cdr: ChangeDetectorRef, private zone: NgZone,
        private _snackBar: MatSnackBar,
        public dialog: MatDialog) {
        //let sim = new CombatSimulation(this.simParameters, new Prando(0));
        this.allowedClasses = {
            "auror": "Auror",
            "magizoologist": "Magizoologist",
            "professor": "Professor"
        };

        let self = this;

        // Init: Check if something in local storage and/or hash fragment
        let dataInLocalStorage = this.isPersistedInLocalStorage();
        let dataInHashFragment = URLHashManager.hasValidDataInHashFragment();

        if (dataInLocalStorage === true && dataInHashFragment === false) {
            this.initFromLocalStorage();
        }
        else if (dataInLocalStorage === false && dataInHashFragment === true) {
            this.initFromHashFragment();
        }
        else if (dataInLocalStorage === true && dataInHashFragment === true) {
            // Both detected: Decide which should be kept via dialog (TODO)
            if (confirm("Detected saved data in local storage as well as in the URL. Do you want to overwrite your local data? " +
                "\n\nNOTE: your previously saved data will be lost. If you wish to first save your previously saved data, " +
                "press cancel and click \"Export data as file\" under Advanced simulation settings to keep a backup.")) {
                this.initFromHashFragment();
            }
            else {
                this.initFromLocalStorage();
            }
        }
        else {
            // If nothing stored in localStorage and hash fragment: load from defaults
            this.simParameters = this.getInitialSimParameters();
            let initialWizardSettings = this.getInitialWizardSettings();
            this.addWizardSettings(initialWizardSettings);
        }



        this.simParameters = this.sanitizeSimParametersOldVersions(this.simParameters);
        this.simAdvancedSettings = this.sanitizeSimAdvancedSettingsOldVersions(this.simAdvancedSettings);

        console.log("Initial sim parameters: ");
        console.log(this.simParameters);
        console.log("Initial advanced settings: ");
        console.log(this.simAdvancedSettings);

        // Apply initial observer functions
        this.applyObserverFunctions({
            simAdvancedSettings: this.simAdvancedSettings,
            simParameters: this.simParameters
        });


        Logger.callbackFunction = function (messageLine: string) {
            self.simulationLogChannelStore["Debug"] += messageLine + "\n";
        }
        Logger.callbackFunctionUserFriendly = function (messageLine: string) {
            self.simulationLogChannelStore["User friendly"] += messageLine + "\n";
        }
        this.simulationSingleResults = null;
        this.simulationMultipleResultsGrouped = new MatTableDataSource();

    }


    @ViewChild(MatSort, { static: true }) playerRulesTableSort: MatSort
    //playerRulesDataSources: Array<MatTableDataSource<ruleType>>; 
    ngOnInit() {
        console.log("In ngOnInit...");
        var host = window.location.hostname;
        if (host != "localhost") {
            console.log("Initializing cookie config...");
            let cc = window as any;
            cc.cookieconsent.initialise(cookieConfig);
        }
        else {
            console.log("Not initializing cookie config since we are in localhost. ")
        }
    }

    sanitizeSimParametersOldVersions(simParameters: CombatSimulationParameters) {
        if (simParameters.customFortressRewardData === undefined) { // v0.11.0 -> 0.11.1 allow fortress reward data to be set from outside
            simParameters.customFortressRewardData = JSON.parse(JSON.stringify(fortressRewardData)); 
        }
        return simParameters;
    }

    sanitizeSimAdvancedSettingsOldVersions(simAdvancedSettings: simAdvancedSettingsType) {
        if (compareVersions.compare(packageJsonVersion, simAdvancedSettings.simulationVersion, ">")) {
            console.log("Old version of advanced sim settings detected.");

            const dialogRef = this.dialog.open(DialogChangelogComponent, {
                width: '80%',
                data: JSON.parse(JSON.stringify({
                    currentSimVersion: packageJsonVersion, 
                    advancedSimSettings: this.simAdvancedSettings
                })) 
            });

            dialogRef.afterClosed().subscribe(result => {});
        }

        simAdvancedSettings.simulationVersion = packageJsonVersion;

        return simAdvancedSettings;
    }

    getRulesStore(nameClass: nameClassType): Array<ruleContainerType> {
        //console.log(RulesStore.store[nameClass]); 
        //return JSON.parse(JSON.stringify(RulesStore.store[nameClass])); 
        return RulesStore.store[nameClass];
    }
    toUpperCase(string: string) {
        return string.substr(0, 1).toUpperCase() + string.substr(1, string.length);
    }
    compareRuleContainers(v1: ruleContainerType, v2: ruleContainerType): boolean {
        return v1.strategyName === v2.strategyName && v1.nameClass === v2.nameClass && v1.description === v2.description;
    }
    onChangeSelectPlayerAIStrategy(playerIndex: number, event: any) {
        console.log(event);
        this.simParameters.ruleContainers[playerIndex] = JSON.parse(JSON.stringify(event.value)); //  as ruleContainerType
    }

    getPlayerRulesForTable(playerIndex: number): MatTableDataSource<ruleType> | ruleType[] {
        if (this.simParameters.ruleContainers === undefined) {// With old versions 
            this.simParameters.ruleContainers = [];
            for (let nameClass of this.simParameters.nameClasses) {
                this.simParameters.ruleContainers.push(this.getDefaultRuleContainer(nameClass));
            }
        }

        let result = new MatTableDataSource(this.simParameters.ruleContainers[playerIndex].rules);
        //let result = this.simParameters.ruleContainers[playerIndex].rules; 

        /*result.sortingDataAccessor = (rule: ruleType, property) => {
            console.log("called with property=" + property);
            switch (property) {
                case 'event.type': return rule.event.type;
                default: return rule[property];
            }
        };*/

        //this.playerRulesTableSort.sortChange.subscribe(v=> console.log(v) )

        return result;
    }

    // Which actions are allowed?
    getActionNameMap(playerIndex: number): actionNameMapType {
        // Todo: filter by class
        return RulesEngine.actionNameMap;
    }
    getUserFriendlyActionName(playerIndex: number, actionName: actionNameType) {
        return this.getActionNameMap(playerIndex)[actionName];
    }
    getEventTargetType(playerIndex: number, actionName: actionNameType): string | null {
        let allowedTarget = RulesEngine.getAllowedTargetType(actionName);  // "targetEnemy", "targetWizard" 
        if (allowedTarget === null) {
            return null;
        }
        let ruleEventTargetMap = RulesEngine.eventTargetTypes;
        return ruleEventTargetMap[allowedTarget].label;
    }
    getAllowedEventTargets(playerIndex: number, actionName: actionNameType) {
        let allowedTargetType = RulesEngine.getAllowedTargetType(actionName);
        if (allowedTargetType === null) return null;
        let allowedTargets = RulesEngine.eventTargetTypes[allowedTargetType].allowedTargets;
        // console.log(allowedTargets); 
        return allowedTargets;
    }
    getEventTarget(playerIndex: number, rule: ruleType): string {
        if (rule.event.params === undefined) return;
        let allowedTargetType = RulesEngine.getAllowedTargetType(rule.event.type); // "targetEnemy", "targetWizard"
        return rule.event.params[allowedTargetType];
    }
    onChangeSelectEventTarget(playerIndex: number, rule: ruleType, event) {
        if (rule.event.params === undefined) {
            rule.event.params = {};
        }
        let allowedTargetType = RulesEngine.getAllowedTargetType(rule.event.type); // "targetEnemy", "targetWizard" 
        rule.event.params[allowedTargetType] = event.value;  // "self", "lowestHP", ...
    }


    onClickButtonIncreaseRulePriority(event, rule: ruleType, playerIndex: number) {
        let rules = this.simParameters.ruleContainers[playerIndex].rules;
        let currentIndex = rules.indexOf(rule);
        // Check if already at top
        if (currentIndex === 0) {
            return;
        }
        if (currentIndex === -1) {
            console.log(rules);
            console.log(rule);
            throw new Error("Something went wrong");
        }

        // Swap positions with other rule
        rule.priority++;
        let ruleToSwap = rules[currentIndex - 1];
        ruleToSwap.priority--;

        rules[currentIndex - 1] = rule;
        rules[currentIndex] = ruleToSwap;
        //console.log(event); 
        event.stopPropagation();
        //console.log(event); 
    }
    onClickButtonDecreaseRulePriority(event, rule: ruleType, playerIndex: number) {
        let rules = this.simParameters.ruleContainers[playerIndex].rules;
        let currentIndex = rules.indexOf(rule);
        // Check if already at bottom
        if (currentIndex === rules.length - 1) {
            return;
        }
        if (currentIndex === -1) {
            console.log(rules);
            console.log(rule);
            throw new Error("Something went wrong");
        }

        // Swap positions with other rule
        rule.priority--;
        let ruleToSwap = rules[currentIndex + 1];
        ruleToSwap.priority++;

        rules[currentIndex + 1] = rule;
        rules[currentIndex] = ruleToSwap;
        //console.log(event); 
        event.stopPropagation();
        //console.log(event); 
    }
    onClickButtonCopyRule(event, rule: ruleType, playerIndex: number) {
        let rules = this.simParameters.ruleContainers[playerIndex].rules;
        let currentIndex = rules.indexOf(rule);
        rules.splice(currentIndex, 0, JSON.parse(JSON.stringify(rule)));
        this.refreshRulesPriority(playerIndex);
    }



    onClickRemoveRule(playerIndex: number, rule: ruleType) {
        let ruleIndex = this.simParameters.ruleContainers[playerIndex].rules.indexOf(rule);
        console.log("Removing ruleIndex=" + ruleIndex + " for playerIndex=" + playerIndex + "...");
        this.simParameters.ruleContainers[playerIndex].rules.splice(ruleIndex, 1);

        this.refreshRulesPriority(playerIndex);
    }

    onClickAddPlayerRule(playerIndex: number) {
        this.simParameters.ruleContainers[playerIndex].rules.push({
            event: {
                type: "noAction"
            },
            priority: 0,
            conditions: {
                all: []
            }
        });
        this.refreshRulesPriority(playerIndex);
    }

    refreshRulesPriority(playerIndex: number) {
        // Example: 17 rules, highest priority is 16
        let highestPriority = this.simParameters.ruleContainers[playerIndex].rules.length - 1;
        this.simParameters.ruleContainers[playerIndex].rules.forEach((rule, ruleIndex) => {
            rule.priority = highestPriority - ruleIndex;
        });
    }

    onClickResetPlayerRules(playerIndex: number) {
        if (confirm("Are you sure you want to reset player rules for player " + (playerIndex+1) + "?")) {
            this.resetPlayerRules(playerIndex); 
        }
    }
    resetPlayerRules(playerIndex: number) {
        console.log("Resetting player rules to default for playerIndex=" + playerIndex + " and class=" + this.simParameters.nameClasses[playerIndex] + "...");
        this.simParameters.ruleContainers[playerIndex] = this.getDefaultRuleContainer(this.simParameters.nameClasses[playerIndex]);
    }
    onClickRemovePlayerRules(playerIndex: number) {
        if (confirm("Are you sure you want to remove all rules for player " + (playerIndex+1) + "?")) {
            console.log("Removing all player rules for playerIndex=" + playerIndex + "...");
            this.simParameters.ruleContainers[playerIndex].rules = [];
        }
    }
    onClickExportPlayerRules(playerIndex: number) {
        console.log("Exporting player rules to JSON for playerIndex=" + playerIndex + "...");
        console.log(this.simParameters.ruleContainers[playerIndex]);
        this.createFileDownload(this.simParameters.ruleContainers[playerIndex].author + "_" +
            this.simParameters.ruleContainers[playerIndex].nameClass + "_rules.json",
            JSON.stringify(this.simParameters.ruleContainers[playerIndex], null, 4));
    }
    onClickImportPlayerRules(playerIndex: number) {
        var self = this;
        this.createFileUpload(function (fileContent) {

            console.log("Importing rules file: ");
            console.log(fileContent);
            let importedRuleContainer: ruleContainerType = JSON.parse(fileContent);
            self.simParameters.ruleContainers[playerIndex] = importedRuleContainer;

        });
    }

    applyObserverFunctions(data: localStorageDataType) {
        //console.log("Applying observer function: ");
        //console.log(data); 
        try {
            var self = this;
            this.simParameters = ObservableSlim.create(data.simParameters, false, function (changes) {
                self.persistToLocalStorage.call(self);
            });
            this.simAdvancedSettings = ObservableSlim.create(data.simAdvancedSettings, false, function (changes) {
                self.persistToLocalStorage.call(self);
            });
        }
        catch (error) {
            console.log("Error loading data from local storage!");
            console.log(error);
        }

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
        if (confirm("Are you sure you want remove player " + (playerIndex+1) + " (" + this.simParameters.nameClasses[playerIndex] + ")?")) {
            console.log("Removing wizard with playerIndex=" + playerIndex);
            this.simParameters.nameClasses.splice(playerIndex, 1);
            this.simParameters.potions.splice(playerIndex, 1);
            this.simParameters.runestoneLevels.splice(playerIndex, 1);
            this.simParameters.skillTrees.splice(playerIndex, 1);
            this.simParameters.ruleContainers.splice(playerIndex, 1);
            this.skillTrees.splice(playerIndex, 1);
        }
    }

    onChangeSelectWizardClass(event, playerIndex: number): void {
        if (this.skillTrees[playerIndex].nameClass === event.value) {
            // No change
            return;
        }
        else {
            //if (confirm("Are you sure you want to change the class of player " + (playerIndex+1) + 
            //            " from " + this.skillTrees[playerIndex].nameClass + " to " + event.value + 
            //            "? This will reset the skill tree and any rule changes you have made.")) {
            console.log("Changing playerIndex=" + playerIndex + " class to " + event.value);
            //this.simParameters.nameClasses[playerIndex] = event.value; 
            this.simParameters.skillTrees[playerIndex] = { nameClass: event.value, nodesStudied: [] }
            this.skillTrees[playerIndex] = new SkillTree(event.value);
            this.resetPlayerRules(playerIndex); 
            //}
            
        }
    }

    min(v1: number, v2: number): number {
        return Math.min(v1, v2);
    }

    //@ViewChild("svgSkillTree", {static: false }) svgSkillTrees: ElementRef[];
    getSkillTreeSVGHeight(): number | string {
        //console.log(this.svgSkillTrees);
        let svgSkillTrees = document.getElementsByClassName("svgSkillTree");
        let maxHeight = this.skillTreeVis.marginTop + this.skillTreeVis.rowHeight * 16;
        if (svgSkillTrees.length === 0) {
            return maxHeight;
        }

        let width = svgSkillTrees[0].clientWidth;
        if (width > this.skillTreeVis.marginLeft + this.skillTreeVis.columnWidth * 5) {
            // If element is wide enough, return constant height for skill tree
            return maxHeight;
        }
        else {
            // If element is not wide enough, slowly scale down height for skill tree
            let widthPercent = width / (this.skillTreeVis.marginLeft + this.skillTreeVis.columnWidth * 5);
            return Math.ceil(widthPercent * maxHeight);
        }
    }

    onClickSkillTreeNode(node: SkillTreeNode, playerIndex: number): void {
        let skillTree = this.skillTrees[playerIndex];
        let currentLevel: number = skillTree.nodesStudied.get(node)!;
        let maxLevel = node.levels.length;
        skillTree.nodesStudied.set(node, (currentLevel + 1) % (maxLevel + 1));

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
        if (confirm("Are you sure you want to reset the skill tree for player " + (playerIndex+1) + "?")) {
            console.log("Resetting skill tree for playerIndex=" + playerIndex);
            let skillTree = this.skillTrees[playerIndex];
            skillTree.resetSkillTree();
            this.persistSkillTree(skillTree, playerIndex);
        }
    }

    persistSkillTree(skillTree: SkillTree, playerIndex: number) {
        this.simParameters.skillTrees[playerIndex] = skillTree.persist();
    }

    onClickButtonImportSkillTree(playerIndex: number) {
        var self = this;
        this.createFileUpload(function (fileContent) {

            console.log("Importing skill tree from file: ");
            console.log(fileContent);
            let importedSkillTree: PersistedSkillTree = JSON.parse(fileContent);
            this.simParameters.skillTrees[playerIndex] = importedSkillTree;
            this.skillTrees[playerIndex] = SkillTree.fromPersisted(importedSkillTree);

        });

    }

    onClickButtonExportSkillTree(playerIndex: number) {
        let persistedSkillTree = this.simParameters.skillTrees[playerIndex];
        this.createFileDownload("skillTree.json", JSON.stringify(persistedSkillTree, null, 4));
    }


    resetSimulationResults() {
        this.simulationLogChannelStore["Debug"] = "";
        this.simulationLogChannelStore["User friendly"] = "";
        this.closeSettingsPanels();

    }

    getSkillTreeFilterLessonsMap() {
        return SkillTree.skillTreeFilterLessonsMap;
    }

    getSimParametersCopy(): CombatSimulationParameters {
        return JSON.parse(JSON.stringify(this.simParameters));
    }
    unproxy(proxy: any): Object {
        let result = JSON.parse(JSON.stringify(proxy));
        console.log(result);
        return result;
    }


    @ViewChildren("manualActionSelectionSimulation") manualActionSelectionSimulationComponent: QueryList<ManualActionSelectionSimulationComponent>;

    async onClickButtonStartSingleSimulation() {
        this.resetSimulationResults();
        this.simAdvancedSettings.simGoal = "single";
        this.runningSimulation = null;
        this.simulationSingleResults = null;
        console.log("Starting single simulation with parameters:");
        console.log(this.simParameters);

        Logger.verbosity = 2;
        this.runningSimulation = new CombatSimulation(this.getSimParametersCopy(), new Prando(this.simParameters.seed));
        this.runningSimulation.init();
        if (this.isPlayerActionSelectionManual()) {
            this.manualActionSelectionSimulationComponent.first.init(this.runningSimulation, this);
        }
        try {
            await this.runningSimulation.simulate();
            this.manualActionSelectionSimulationComponent.first.finish();
            this.simulationSingleResults = this.runningSimulation.toSimulationResults();
            this.runningSimulation = null;
            console.log("Results of the simulation are: ");
            console.log(this.simulationSingleResults);
        }
        catch (error) {
            Logger.callbackFunctionUserFriendly(error.stack);
            Logger.callbackFunction(error.stack);
            console.log(error);
        }
    }

    isSimulationRunning(): boolean {
        return this.runningSimulation !== null;
    }

    async onClickButtonStartMultipleSimulations_compareRoomLevels() {
        await this.onClickButtonStartMultipleSimulations("multiple_compare_roomLevels");
    }
    async onClickButtonStartMultipleSimulations_compareSkillTreeNodes() {
        await this.onClickButtonStartMultipleSimulations("multiple_compare_skillTreeNodes");
    }


    async onClickButtonStartMultipleSimulations(simGoal: simGoalType) {
        this.resetSimulationResults();
        this.simAdvancedSettings.simGoal = simGoal;

        var self = this;
        let simComparison = new CombatSimulationComparison(this.getSimParametersCopy(), this.simAdvancedSettings);
        console.log("Running with set of combat params: ");
        console.log(simComparison.allSimParams);
        this.simProgress = {
            nFinished: 0,
            nRemaining: simComparison.getNumberSimulationsTotal(),
            nTotal: simComparison.getNumberSimulationsTotal()
        };

        //let lastProgressUpdate = (new Date()).getTime(); // Progress update should only be more than every 250ms because thats how long css animation of progress bar takes. otherwise animation is choppy
        simComparison.setListenerSimProgress((simProgress: simProgressType) => {
            self.simProgress = simProgress;
        });

        Logger.verbosity = 1;
        if (this.simAdvancedSettings.runParallel === false) {
            self.simulationMultipleResults = [];
            setTimeout(function () {
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
            /*this.simulationMultipleResults = await simComparison.runParallel();
            this.simProgress = null;
            this.updateSimulationMultipleResultsGrouped();*/
            if (this.isWebWorkerSupported()) {
                let workerPool = new WebWorkerPool(this.simAdvancedSettings);
                workerPool.setListenerSimProgress((simProgress: simProgressType) => {
                    self.simProgress = simProgress;
                });

                let messageContainers: webWorkerMessageContainerType[] = simComparison.allSimParams.map(simParams => {
                    return {
                        messageType: "executeSimulation",
                        params: {
                            combatSimulationParameters: simParams
                        }
                    };
                });
                workerPool.executeJobs(messageContainers, function (results: CombatSimulationResults[]) {
                    //console.log("Done parallel of " + results.length + " jobs"); 
                    self.simulationMultipleResults = results;
                    self.onFinishComparingSimulations();
                }, function(error: Error) {
                    Logger.callbackFunction(error.stack); 
                    Logger.callbackFunctionUserFriendly(error.stack); 
                });

                // Create a new
                /*const worker = new Worker('./app.worker', { type: 'module' });
                worker.onmessage = ({ data }) => {
                  console.log(`page got message: ${data}`);
                };
                worker.postMessage('hello');*/
            } else {
                // Web Workers are not supported in this environment.
                // You should add a fallback so that your program still executes correctly.
                alert("Your browser does not appear to support web workers for parallel execution. Please disable 'run parallel' under advanced simulation settings.");
            }
        }
    }

    isWebWorkerSupported(): boolean {
        return typeof Worker !== 'undefined';
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
            setTimeout(function () {
                self.onFinishOneSimulation.call(self, simComparison);
            }, 0);
        }
        else {
            this.onFinishComparingSimulations();
        }
    }

    onFinishComparingSimulations() {
        this.simProgress = null;
        this.updateSimulationMultipleResultsGrouped();
    }

    // Need this because element is in ngIf
    // https://stackoverflow.com/questions/39366981/viewchild-in-ngif
    matTableMultipleSimulationResults: MatTable<simulationResultsGroupedType>;
    @ViewChild('tableMultipleSimulationResults', { static: false }) set table(matTable) {
        this.matTableMultipleSimulationResults = matTable;
    }

    updateSimulationMultipleResultsGrouped() {
        let resultsGrouped: simulationResultsGroupedType[] = CombatSimulationComparison.groupResults(this.simulationMultipleResults, this.simAdvancedSettings.secondsBetweenSimulations);

        this.simulationMultipleResultsGrouped = new MatTableDataSource(resultsGrouped);
        this.columnNamesMultipleSimulationsResultsGrouped = Object.keys(resultsGrouped[0]);
    }

    onSortMultipleResults(sort: Sort) {
        let data = this.simulationMultipleResultsGrouped.data;
        if (sort.active && sort.direction !== "") {
            // example: sort.active = "groupByValue" or "averageChallengeXPReward"
            // sort.direction = "" or "asc" or "desc"
            let isAsc = sort.direction === 'asc';
            data.sort((row1, row2) => {
                // Remove " (base)" from string
                let v1: any = row1[sort.active];
                let v2: any = row2[sort.active];
                if (sort.active === "groupByValue") {
                    let baseString = " (base)";
                    if (v1.indexOf(baseString) > -1) v1 = v1.substr(0, v1.indexOf(baseString));
                    if (v2.indexOf(baseString) > -1) v2 = v2.substr(0, v2.indexOf(baseString));
                }
                // Convert to number if possible
                if (isNaN(parseFloat(v1 as string)) === false) v1 = parseFloat(v1);
                if (isNaN(parseFloat(v2 as string)) === false) v2 = parseFloat(v2);

                return this.compare(v1, v2, isAsc);
            });
        }
        else if (sort.direction === "") {
            this.onSortMultipleResults({ active: "groupByValue", direction: "asc" })
        }
        this.matTableMultipleSimulationResults.renderRows();
    }

    // https://medium.com/@AustinRMueller/dynamic-tables-and-sorting-with-angular-material-7dea862cc93c
    private compare(a, b, isAsc) {
        return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }


    getEnergyReward() {
        return FortressRoom.getEnergyRewardStatic(this.simParameters.roomLevel, true);
    }


    @ViewChild("matPanelInputParameters", { static: false }) matPanelInputParameters: MatExpansionPanel;
    @ViewChild("matPanelAdvancedSimulationSettings", { static: false }) matPanelAdvancedSimulationSettings: MatExpansionPanel;
    @ViewChild("matPanelAdvancedSimulationSettings", { static: false, read: ElementRef }) matPanelAdvancedSimulationSettingsElement: ElementRef;
    @ViewChild("matPanelStartSimulation", { static: false }) matPanelStartSimulation: MatExpansionPanel;
    @ViewChild("matPanelSimulationResults", { static: false }) matPanelSimulationResults: MatExpansionPanel;
    @ViewChild("matPanelSimulationResults", { static: false, read: ElementRef }) matPanelSimulationResultsElement: ElementRef;

    closeSettingsPanels(): void {
        if (this.simAdvancedSettings.closeSimParametersTabOnStartSimulation === true) {
            this.matPanelInputParameters.close();
        }
        if (this.simAdvancedSettings.closeAdvancedSettingsTabOnStartSimulation === true) {
            this.matPanelAdvancedSimulationSettings.close();
        }
        if (this.simAdvancedSettings.closeStartSimulationTabOnStartSimulation === true) {
            this.matPanelStartSimulation.close();
        }
        this.matPanelSimulationResults.open();
        this.matPanelSimulationResultsElement.nativeElement.scrollIntoView();
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
            if (i == 0) {
                // Always make first character upper case
                result += statName.charAt(i).toUpperCase();
            }
            else if (this.isUppercase(statName.charAt(i))) {
                // If a character is upper case, first add a space
                result += " ";
            }
            if (i != 0) {
                result += statName.charAt(i);
            }
        }
        return result;
    }
    isUppercase(char: string): boolean {
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
                ((level.costRedBooks > 0) ? ", red books: " + level.costRedBooks : "") +
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

    getDifficulty(): number {
        return FortressRoom.computeOverallDifficultyStatic(this.simParameters.roomLevel, this.simParameters.runestoneLevels[0], this.simParameters.nameClasses.length); 
    }

    getPlayerActionSelectionModeMap(): playerActionSelectionModeMapType {
        return PlayerActionEngine.playerActionSelectionModeMap;
    }
    isPlayerActionSelectionManual(): boolean {
        return this.simParameters.playerActionSelectionMode === "manual";
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
            ruleContainers: [],
            useSponsoredFortressRewards: false
        };
    }

    getInitialWizardSettings(): wizardSettingsType {
        return {
            nameClass: "professor",
            potions: this.getInitialPotionAvailability(),
            runestoneLevel: 1,
            skillTree: { nameClass: "professor", nodesStudied: [] },
            ruleContainer: this.getDefaultRuleContainer("professor")
        }
    }
    getDefaultRuleContainer(nameClass: nameClassType): ruleContainerType {
        /*let result: ruleContainerType;
        switch (nameClass) {
            case "auror": result = aurorRules as ruleContainerType; break;
            case "magizoologist": result = magizoologistRules as ruleContainerType; break;
            case "professor": result = professorRules as ruleContainerType; break;
        }
        return JSON.parse(JSON.stringify(result));*/
        return JSON.parse(JSON.stringify(RulesStore.getDefaultRuleContainer(nameClass)));
    }

    getInitialPotionAvailability(): PotionAvailabilityParameters {
        return {
            nExstimuloAvailable: 0,
            nStrongExstimuloAvailable: 0,
            nPotentExstimuloAvailable: 0,
            nHealingPotionsAvailable: 0,
            nWeakInvigorationAvailable: 0,
            nStrongInvigorationAvailable: 0,
            nWitSharpeningAvailable: 0,
            hasBaruffiosBrainElixir: false,
            hasTonicForTraceDetection: false
        };
    }



    getPotionsBrewTimeRaw(potions: PotionAvailabilityParameters) {
        return this.formatHoursDecimal(Wizard.getPotionsBrewTime(potions, false));
    }

    getPotionsBrewTimeMasterNotes(potions: PotionAvailabilityParameters) {
        return this.formatHoursDecimal(Wizard.getPotionsBrewTime(potions, true));
    }

    formatHoursDecimal(hoursParam: number) {
        let decimalTime = hoursParam * 60 * 60;
        let hours: number | string = Math.floor((decimalTime / (60 * 60)));
        decimalTime = decimalTime - (hours * 60 * 60);
        let minutes: number | string = Math.floor((decimalTime / 60));
        decimalTime = decimalTime - (minutes * 60);
        let seconds: number | string = Math.round(decimalTime);
        if (hours < 10) {
            hours = "0" + hours;
        }
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        return hours + "h" + minutes + "m";
    }
    formatMinutesDecimal(secondsParam: number) {
        let decimalTime = secondsParam;
        let hours: number | string = Math.floor((decimalTime / (60 * 60)));
        decimalTime = decimalTime - (hours * 60 * 60);
        let minutes: number | string = Math.floor((decimalTime / 60));
        decimalTime = decimalTime - (minutes * 60);
        let seconds: number | string = Math.round(decimalTime);
        if (hours < 10) {
            hours = "0" + hours;
        }
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        return minutes + ":" + seconds;
    }

    initDataFromOtherSource(data: localStorageDataType) {
        // For sim advanced settings: Check if we are using a different structure (=different keys) from an older version
        if (Utils.deepCompareObjectSameKeys(this.simAdvancedSettings, data.simAdvancedSettings) === false) {
            console.log("Older version of sim advanced settings detected:");
            console.log(data.simAdvancedSettings);
            console.log("Using newer (default) version with different structure and overwriting old: ");
            console.log(this.simAdvancedSettings);
        }
        else {
            this.simAdvancedSettings = data.simAdvancedSettings;
        }

        this.simParameters = data.simParameters;
        for (let persistedSkillTree of this.simParameters.skillTrees) {
            this.skillTrees.push(SkillTree.fromPersisted(persistedSkillTree));
        }
    }

    initFromLocalStorage(): void {
        console.log("Initializing from local storage...");
        let data = this.getDataFromLocalStorage();
        this.initDataFromOtherSource(data);
    }

    initFromHashFragment(): void {
        console.log("Initializing from hash fragment...");
        let data = URLHashManager.getDataFromHashFragment();
        this.initDataFromOtherSource(data);
        this.persistToLocalStorage();

        // Reset hash fragment
        URLHashManager.resetHashFragment();
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
        this.openSnackBar("Data has been saved.", "Dismiss");
    }

    resetAllData(): void {
        if (confirm("Are you sure you want to reset all data? This includes custom player AI rules, skill trees and all other parameters.")) {
            console.log("Resetting all data...");
            localStorage.removeItem("savedData");
            location.reload();
        }
    }

    importDataFromFile(): void {

        var self = this;
        this.createFileUpload(function (fileContent) {
            console.log("Importing data from file: ");
            console.log(fileContent);
            let importedData: localStorageDataType = JSON.parse(fileContent);
            if ((importedData as any).logs) {
                delete importedData["logs"];
            }

            if (Utils.deepCompareObjectSameKeys(this.simAdvancedSettings, importedData.simAdvancedSettings) === false) {
                console.log("Older version of sim advanced settings detected in imported data:");
                console.log(importedData.simAdvancedSettings);
                console.log("Using current version with different structure and overwriting old: ");
                console.log(this.simAdvancedSettings);
                importedData.simAdvancedSettings = this.simAdvancedSettings;
            }
            //importedData.simAdvancedSettings.simulationVersion = this.simAdvancedSettings.simulationVersion; 

            this.applyObserverFunctions.call(self, importedData);
            this.persistToLocalStorage();

            // Update UI
            this.skillTrees = importedData.simParameters.skillTrees.map(persistedSkillTree => SkillTree.fromPersisted(persistedSkillTree));
        });
    }

    exportDataToFile(): void {
        let data: any = this.getDataFromLocalStorage();
        data.logs = this.simulationLogChannelStore;
        this.createFileDownload("simulationParameters.json", JSON.stringify(data, null, 4));
    }

    @ViewChild("inputShareDataURL", { static: false, read: ElementRef }) inputShareDataURL: ElementRef;
    onClickButtonShareData(): void {

        let url = window.location.href.split('#')[0] + "#" + URLHashManager.convertDataToHashFragment({
            simParameters: this.simParameters,
            simAdvancedSettings: this.simAdvancedSettings
        });
        //console.log(url); 
        this.shareDataURL = url;
        //console.log(this.inputShareDataURL); 

        var self = this;
        setTimeout(function () {
            self.inputShareDataURL.nativeElement.focus();
            self.inputShareDataURL.nativeElement.select();
        }, 500);

        Utils_UI.copyToClipboard(url);
        this.openSnackBar("URL copied to clipboard.", "Dismiss");

    }

    createFileUpload(callbackFunction) {
        var element = document.createElement("input");
        element.setAttribute("type", "file");
        var self = this;
        element.addEventListener("change", function (event) {
            self.onUploadFileSelect.call(self, event, callbackFunction);
        });

        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();

        document.body.removeChild(element);
    }


    // https://stackoverflow.com/questions/16505333/get-the-data-of-uploaded-file-in-javascript
    onUploadFileSelect(event, callbackFunction) {
        var files = event.target.files; // FileList object

        // use the 1st file from the list
        let f = files[0];

        var reader = new FileReader();
        var self = this;
        // Closure to capture the file information.
        reader.onload = (function (theFile) {
            return function (e) {
                callbackFunction.call(self, e.target.result);
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

    openSnackBar(message: string, action: string) {
        this._snackBar.open(message, action, {
            duration: 1000,
        });
    }



}

