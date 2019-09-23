import { Enemy } from "../../../../model/env/enemies/Enemy";
import { Wizard } from "../../../../model/player/Wizard";
import { CombatEvent } from "./CombatEvent";

import Prando from "prando";

import { SimEvent } from "../../SimEvent";
import { CombatSpellCastWizardEvent } from "./CombatSpellCastWizardEvent";

export class CombatSpellTraceEvent extends CombatEvent {

    constructor(eventTimestampBegin: number, targetEnemy: Enemy, wizard: Wizard, rng: Prando) {
        super("spellTrace", eventTimestampBegin, targetEnemy, wizard, rng);
    }

    allowWizardFollowupAction() {
        return false; 
    }

    hasFollowupEvent(): boolean {
        return true;
    }
    getFollowupEvent(): SimEvent {
        return new CombatSpellCastWizardEvent(this.timestampEnd, this.enemy, this.wizard, this.rng);
    }

}

