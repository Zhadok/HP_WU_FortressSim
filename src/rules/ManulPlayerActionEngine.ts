import { PlayerActionEngine } from "./PlayerActionEngine";
import Prando from "prando";
import { ruleFactType, actionNameType, nameClassType, manualActionContainerType } from "../types";
import { SimEvent } from "../sim/events/SimEvent";
import { Wizard } from "../model/player/Wizard";
import { Enemy } from "../model/env/enemies/Enemy";


export class ManualPlayerActionEngine extends PlayerActionEngine {

    readonly nameClass: nameClassType; 
    playerActionRequestListener: Function | undefined; 
    playerActionRequestListenerContext: any; 

    constructor(nameClass: nameClassType, rng: Prando) {
        super(rng); 
        this.nameClass = nameClass; 
    }

    getAvailablePlayerActions(wizard: Wizard): actionNameType[] {
        let actions = PlayerActionEngine.actionNameMap; 
        let actionNames: actionNameType[] = Object.keys(actions) as actionNameType[]; 
        actionNames = actionNames.filter((actionName) => wizard.isValidAction(actionName)); 
        actionNames.sort(); 
        return actionNames; 
    }

    setPlayerActionRequestListener(listener: Function, callingContext: any) {
        this.playerActionRequestListener = listener; 
        this.playerActionRequestListenerContext = callingContext;
        console.log("Set action listener with context:"); 
        console.log(callingContext);  
    }

    async getNextAction(timestampBegin: number, facts: ruleFactType): Promise<SimEvent | null> {
        if (this.playerActionRequestListener !== undefined) {
            let availableActions =  this.getAvailablePlayerActions(facts.wizard); 
            console.log("Requesting next player action with available actions:"); 
            let nextAction: manualActionContainerType = await this.playerActionRequestListener.call(this.playerActionRequestListenerContext, facts, availableActions); 
            let targetWizard: Wizard | null = null; 
            let targetEnemy: Enemy | null = null; 
            if (isNaN(nextAction.targetWizardIndex as number) === false && nextAction.targetWizardIndex !== null) {
                targetWizard = facts.allWizards[nextAction.targetWizardIndex!]; 
            }
            if (targetWizard === null) {
                targetWizard = facts.wizard; 
            }
            
            if (isNaN(nextAction.targetEnemyIndex as number) === false && nextAction.targetEnemyIndex !== null) {
                for (let enemy of facts.allActiveEnemies) {
                    if (enemy.enemyIndex === nextAction.targetEnemyIndex) {
                        targetEnemy = enemy; 
                    }
                }
            }
            if (targetEnemy === null) {
                // Same approach as in RulesEngine
                targetEnemy = facts.highestPriorityAvailableEnemy; 
            }
            console.log(nextAction); 
            return this.getSimEventFromAction(nextAction.actionName, timestampBegin, facts.wizard, targetWizard!, targetEnemy!, facts); 
        }
        
        throw new Error("No player action request listener defined");
    }

}