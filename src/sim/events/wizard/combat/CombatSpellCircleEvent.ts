import { Enemy } from "../../../../model/env/enemies/Enemy";
import { Wizard } from "../../../../model/player/Wizard";
import { CombatEvent } from "./CombatEvent";

import Prando from "prando";

import eventDurations from "../../../../data/events.json";
import { SimEvent } from "../../SimEvent";
import { CombatSpellTraceEvent } from "./CombatSpellTraceEvent";
type eventNameType = keyof typeof eventDurations;

export class CombatSpellCircleEvent extends CombatEvent {

    constructor(eventTimestampBegin: number, targetEnemy: Enemy, wizard: Wizard, rng: Prando) {
        let spellCircle_key = "spellCircle_" + targetEnemy.name;
        super(spellCircle_key as eventNameType, eventTimestampBegin, targetEnemy, wizard, rng);
    }

    allowWizardFollowupAction() {
        return false; 
    }

    hasFollowupEvent(): boolean {
        return true;
    }
    getFollowupEvent(): SimEvent {
        return new CombatSpellTraceEvent(this.timestampEnd, this.enemy, this.wizard, this.rng);
    }

}

