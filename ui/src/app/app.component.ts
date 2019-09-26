import { Component } from '@angular/core';

import { CombatSimulation } from "../../../src/sim/CombatSimulation";
import { CombatSpellCircleEvent } from '../sim/events/wizard/combat/CombatSpellCircleEvent';
import { CombatSpellCastEnemyEvent } from '../sim/events/wizard/combat/CombatSpellCastEnemyEvent';
import Prando from 'prando';
import { TestData } from "../../../tests/TestData";
import { CombatSimulationParameters } from '../sim/CombatSimulationParameters';
import { nameClassType, nameClassUserFriendlyType } from '../types';
import { PotionAvailabilityParameters } from '../sim/PotionAvailabilityParameters';
import { PersistedSkillTree } from '../model/player/SkillTree/PersistedSkillTree';
import { SkillTreeNode } from '../model/player/SkillTree/SkillTreeNode';
import { SkillTree } from "../../../src/model/player/SkillTree/SkillTree";
import { Professor } from '../../../src/model/player/Professor';
import { Magizoologist } from '../../../src/model/player/Magizoloogist';
import { Auror } from '../../../src/model/player/Auror';



@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title: string = 'HP WU Fortress Simulator';
    numberSimulations: number = 10000; 

    skillTreeVis = {
        rowHeight: 80,
        columnWidth: 100,
        marginTop: 30,
        marginLeft: 30,
        nodeCircleRadius: 30
    }; 

    allowedClasses: { [key in nameClassType]: nameClassUserFriendlyType }; 

    simParameters: CombatSimulationParameters; 
    skillTrees: Array<SkillTree> = [];
    constructor() {
        //let sim = new CombatSimulation(this.simParameters, new Prando(0));
        this.allowedClasses = {
            "auror": "Auror",
            "magizoologist": "Magizoologist",
            "professor": "Professor"
        };

        if (true) {
            // If nothing stored in localStorage
            this.simParameters = this.getInitialSimParameters();
            let initialWizardSettings = this.getInitialWizardSettings();
            this.addWizardSettings(initialWizardSettings);
        }

    }

    onClickAddWizard(event) {
        console.log("Adding wizard...");
        let initialWizardSettings = this.getInitialWizardSettings();
        this.addWizardSettings(initialWizardSettings);
    }

    addWizardSettings(settings: {nameClass: nameClassType, potions: PotionAvailabilityParameters, runestoneLevel: number, skillTree: PersistedSkillTree}): void {
        this.simParameters.nameClasses.push(settings.nameClass);
        this.simParameters.potions.push(settings.potions);
        this.simParameters.runestoneLevels.push(settings.runestoneLevel);
        this.simParameters.skillTrees.push(settings.skillTree);
        this.skillTrees.push(new SkillTree(settings.nameClass));
    }

    onClickRemoveWizard(playerIndex) {
        console.log("Removing wizard with playerIndex=" + playerIndex);
        this.simParameters.nameClasses.splice(playerIndex, 1);
        this.simParameters.potions.splice(playerIndex, 1);
        this.simParameters.runestoneLevels.splice(playerIndex, 1);
        this.simParameters.skillTrees.splice(playerIndex, 1);
        this.skillTrees.splice(playerIndex, 1);
    }

    onChangeSelectWizardClass(event, playerIndex): void {
        if (this.skillTrees[playerIndex].nameClass === event.value) {
            return; 
        }
        else {
            console.log("Changing playerIndex=" + playerIndex + " class to " + event.value);
            this.simParameters.skillTrees[playerIndex] = {nameClass: event.value, nodesStudied: []}
            this.skillTrees[playerIndex] = new SkillTree(event.value);
        }
    }

    onClickSkillTreeNode(node: SkillTreeNode, playerIndex): void {
        let skillTree = this.skillTrees[playerIndex];
        let currentLevel = skillTree.nodesStudied.get(node);
        let maxLevel = node.levels.length;
        skillTree.nodesStudied.set(node, (currentLevel + 1) % (maxLevel+1));

        this.simParameters.skillTrees[playerIndex] = skillTree.persist();
        // Persist to local storage
        
    }

    onClickButtonStartSingleSimulation(): void {

    }

    onClickButtonStartMultipleSimulations(): void {
        console.log("Starting " + this.numberSimulations + " simulations...");
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
    isValidStatForClass(statName, playerIndex: number): boolean {
        if (this.simParameters.nameClasses[playerIndex] == "professor") return Professor.isValidStatForClass(statName);
        if (this.simParameters.nameClasses[playerIndex] == "magizoologist") return Magizoologist.isValidStatForClass(statName);
        if (this.simParameters.nameClasses[playerIndex] == "auror") return Auror.isValidStatForClass(statName);
    }

    getSkillTreeNodeTooltip(node: SkillTreeNode): string {
        let result = "";
        node.levels.forEach(level => {
            let costString = " (" +
                             ((level.costScrolls > 0) ? "scrolls: " + level.costScrolls : "") + 
                             ((level.costSpellBooks > 0) ? ", red books: " + level.costSpellBooks  : "") +
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

    // Todo: Use localstorage
    getInitialSimParameters(): CombatSimulationParameters {
        return {
            seed: 0,
            roomLevel: 1,
            nameClasses: [],
            potions: [],
            runestoneLevels: [],
            skillTrees: []
        }; 
    }

    getInitialWizardSettings(): {nameClass: nameClassType, potions: PotionAvailabilityParameters, runestoneLevel: number, skillTree: PersistedSkillTree} {
        return {
            nameClass: "professor" ,
            potions: this.getInitialPotionAvailability(),
            runestoneLevel: 1,
            skillTree: {nameClass: "professor", nodesStudied: []}
        }
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

}
