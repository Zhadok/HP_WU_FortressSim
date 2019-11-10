import { Enemy } from "../../../../model/env/enemies/Enemy";
import { Wizard } from "../../../../model/player/Wizard";
import { CombatEvent } from "./CombatEvent";

import Prando from "prando";
import { Logger } from "../../../../util/Logger";

export class WizardDefeatEvent extends CombatEvent {

    // Used to disallow followup action if wizard was revived using revive charm
    revivedAfterThisEvent: boolean = false;
    subclassWizard: Wizard;

    constructor(timestampBegin: number, enemy: Enemy, wizard: Wizard, rng: Prando) {
        super("dynamicDuration", timestampBegin, enemy, wizard, rng, wizard.knockoutTime);
        this.subclassWizard = wizard;
    }

    onStart() {
        this.enemy.inCombat = false;
        this.enemy.inCombatWith = null;
        this.wizard.inCombat = false;
        this.wizard.inCombatWith = null;
        this.wizard.timestampDefeated = this.timestampBegin; 

        Logger.logTUserFriendly(1, this.timestampBegin, this.wizard.toUserFriendlyDescription() + " has been defeated."); 
    }

    onFinish() {
        if (this.wizard.getIsDefeated() === true) {
            this.wizard.revive(this.timestampEnd);
            this.revivedAfterThisEvent = true;
            Logger.logTUserFriendly(1, this.timestampEnd, this.wizard.toUserFriendlyDescription() + " has been revived!"); 
        }
    }

    allowWizardFollowupAction() {
        if (this.revivedAfterThisEvent === true) {
            return true; 
        }
        return false;
    }

}

