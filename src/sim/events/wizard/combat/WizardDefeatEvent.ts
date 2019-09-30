import { Enemy } from "../../../../model/env/enemies/Enemy";
import { Wizard } from "../../../../model/player/Wizard";
import { CombatEvent } from "./CombatEvent";

import Prando from "prando";

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
    }

    onFinish() {
        if (this.wizard.getIsDefeated() === true) {
            this.wizard.revive();
            this.revivedAfterThisEvent = true;
        }
    }

    allowWizardFollowupAction() {
        if (this.revivedAfterThisEvent === true) {
            return true; 
        }
        return false;
    }

}
