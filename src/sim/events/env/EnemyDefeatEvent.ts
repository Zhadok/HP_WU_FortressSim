import { Enemy } from "../../../model/env/enemies/Enemy";
import { Wizard } from "../../../model/player/Wizard";

import eventDurations from "../../../data/events.json";
import { EnvEvent } from "./EnvEvent";
import { Logger } from "../../../util/Logger";
type eventNameType = keyof typeof eventDurations;


export class EnemyDefeatEvent extends EnvEvent {

    readonly enemy: Enemy;
    readonly wizard: Wizard;

    constructor(eventTimestampBegin: number, enemy: Enemy, wizard: Wizard) {
        super("enemyDeathAnimation", eventTimestampBegin);
        this.enemy = enemy;
        this.wizard = wizard;
    }

    allowWizardFollowupAction() {
        return false; 
    }

    onFinish() {
        this.enemy.inCombat = false;
        this.enemy.inCombatWith = null;
        this.wizard.inCombat = false;
        this.wizard.inCombatWith = null;
        this.wizard.removePotionBuffs(); 

        let message = this.wizard.toUserFriendlyDescription() + " has defeated " + this.enemy.toUserFriendlyDescription() + "!"; 
        Logger.logTUserFriendly(1, this.timestampEnd, message); 
    }
}



