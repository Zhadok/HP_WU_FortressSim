import { Component, OnInit, Input } from '@angular/core';
import { actionNameType, ruleFactType, manualActionContainerType, actionNameMapType, rulesActionContainerType } from '../../types';
import { CombatSimulation } from '../../../src/sim/CombatSimulation';
import { ManualPlayerActionEngine } from '../../../src/rules/action/ManulPlayerActionEngine';
import { RulesEngine } from '../../../../src/rules/action/RulesEngine';
import { AppComponent } from 'app/app.component';
import { Enemy } from '../../../src/model/env/enemies/Enemy';
import { Wizard } from '../../../src/model/player/Wizard';

@Component({
    selector: 'app-manual-action-selection-simulation',
    templateUrl: './manual-action-selection-simulation.component.html',
    styleUrls: ['./manual-action-selection-simulation.component.css']
})
export class ManualActionSelectionSimulationComponent implements OnInit {

    parent: AppComponent; 

    runningSimulation: CombatSimulation | null = null; 

    selectedActionResolve: Function; // Needed to compile onPlayerActionRequest
    availableActions: Array<actionNameType> = [];
    facts: ruleFactType = null; 
    nextActionAI: rulesActionContainerType; 

    selectedAction: actionNameType = null;
    selectedWizardID: number = null;
    selectedEnemyID: number = null; 

    filteredActions: Array<actionNameType> = ["enterCombatWithHighestPriorityAvailableEnemy"]; 
    
    constructor() {
    }


    ngOnInit() {
        //this.init(); 
    }

    init(runningSimulation: CombatSimulation, parent: AppComponent) {
        this.runningSimulation = runningSimulation; 
        this.parent = parent; 
        for (let engine of this.runningSimulation.playerActionEngines as Array<ManualPlayerActionEngine>) {
            engine.setPlayerActionRequestListener(this.onPlayerActionRequest, this); 
        }
        if (this.runningSimulation.wizards.length === 1) {
            this.selectedWizardID = 0; 
        }
    }

    finish() {
        this.runningSimulation = null; 
    }

    
    async onPlayerActionRequest(facts: ruleFactType, availableActions: Array<actionNameType>): Promise<manualActionContainerType> {
        console.log("Action was requested with facts: ");
        console.log(facts);
        /*console.log(availableActions);
        console.log(this);*/
        //var container = this; 
        this.facts = facts; 
        // Filter some actions
        availableActions = availableActions.filter((actionName) => this.filteredActions.indexOf(actionName) === -1); 

        let playerIndex = facts.wizard.playerIndex; 
        this.nextActionAI = await this.runningSimulation.defaultPlayerActionEngines[playerIndex].runRulesEngine(facts); 
        console.log("Default rules AI decided on action: "); 
        console.log(this.nextActionAI); 

        this.availableActions = availableActions;
        this.selectedAction = availableActions[0]; 
        return new Promise((resolve, reject) => {
            //console.log("Setting resolve callback within promise: " + typeof resolve);
            this.selectedActionResolve = resolve;
        });
    }

    isWizardTargetRequired(selectedAction: actionNameType) {
        return this.parent.getEventTargetType(0, selectedAction) === "wizard"; 
    }
    isEnemyTargetRequired(selectedAction: actionNameType) {
        return this.parent.getEventTargetType(0, selectedAction) === "enemy"; 
    }

    getPotionsRemainingLabel(wizard: Wizard, actionName: actionNameType) {
        let count = this.getPotionsRemainingCount(wizard, actionName); 
        if (count === -1) {
            return ""; 
        }
        else {
            return "(" + count + " remaining)"; 
        }        
    }
    getPotionsRemainingCount(wizard: Wizard, actionName: actionNameType): number {
        switch (actionName) {
            case "potentExstimuloPotion": return wizard.getPotions().nPotentExstimuloAvailable; 
            case "strongExstimuloPotion": return wizard.getPotions().nStrongExstimuloAvailable; 
            case "exstimuloPotion": return wizard.getPotions().nExstimuloAvailable; 
            case "healthPotion": return wizard.getPotions().nHealingPotionsAvailable; 
            case "strongInvigorationPotion": return wizard.getPotions().nStrongInvigorationAvailable; 
            case "weakInvigorationPotion": return wizard.getPotions().nWeakInvigorationAvailable; 
            case "witSharpeningPotion": return wizard.getPotions().nWitSharpeningAvailable; 
        }
        return -1; 
    }

    onClickButtonPerformNextActionAI() {
        let actionAI: manualActionContainerType = {
            actionName: this.nextActionAI.actionName
        }
        if (this.nextActionAI.targetWizard) {
            actionAI.targetWizardIndex = this.nextActionAI.targetWizard.playerIndex; 
        } 
        if (this.nextActionAI.targetEnemy) {
            actionAI.targetEnemyIndex = this.nextActionAI.targetEnemy.enemyIndex; 
        }
        this.performAction(actionAI); 
    }

    onClickButtonPerformPlayerAction() {
        let performedAction: manualActionContainerType = {
            actionName: this.selectedAction,
            targetWizardIndex: this.selectedWizardID,
            targetEnemyIndex: this.selectedEnemyID
        };
        /*if (this.facts.allWizards.length === 1) {
            this.selectedTargetID = 0; 
        }*/
        this.performAction(performedAction); 
    }

    performAction(performedAction: manualActionContainerType): void {
        // Resets input so far
        this.selectedAction = null; 
        this.selectedActionResolve(performedAction);
    }

    ceil(n: number): number {
        return Math.ceil(n); 
    }




}
