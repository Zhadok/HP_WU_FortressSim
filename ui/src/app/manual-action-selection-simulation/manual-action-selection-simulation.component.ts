import { Component, OnInit, Input } from '@angular/core';
import { actionNameType, ruleFactType, manualActionContainerType, actionNameMapType } from '../../types';
import { CombatSimulation } from '../../../src/sim/CombatSimulation';
import { ManualPlayerActionEngine } from '../../../src/rules/ManulPlayerActionEngine';
import { RulesEngine } from '../../../../src/rules/RulesEngine';
import { AppComponent } from 'app/app.component';
import { Enemy } from '../../../src/model/env/enemies/Enemy';

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
        /*console.log("Action was requested with facts and available actions: ");
        console.log(facts);
        console.log(availableActions);
        console.log(this);*/
        //var container = this; 
        this.facts = facts; 
        // Filter some actions
        availableActions = availableActions.filter((actionName) => this.filteredActions.indexOf(actionName) === -1); 

        this.availableActions = availableActions;
        this.selectedAction = availableActions[0]; 
        return new Promise((resolve, reject) => {
            console.log("Setting resolve callback within promise: " + typeof resolve);
            this.selectedActionResolve = resolve;
        });
    }

    isWizardTargetRequired(selectedAction: actionNameType) {
        return this.parent.getEventTargetType(0, selectedAction) === "wizard"; 
    }
    isEnemyTargetRequired(selectedAction: actionNameType) {
        return this.parent.getEventTargetType(0, selectedAction) === "enemy"; 
    }

    onClickButtonPerformPlayerAction() {
        let performedAction: manualActionContainerType = {
            actionName: this.selectedAction,
            targetWizardIndex: this.selectedWizardID,
            targetEnemyIndex: this.selectedEnemyID
        };
        // Resets input so far
        this.selectedAction = null; 
        /*if (this.facts.allWizards.length === 1) {
            this.selectedTargetID = 0; 
        }*/
        this.selectedActionResolve(performedAction);
    }





}
