import { Enemy } from "../../../../model/env/enemies/Enemy";
import { Wizard } from "../../../../model/player/Wizard";
import { CombatEvent } from "./CombatEvent";

import eventDurations from "../../../../data/events.json";
import Prando from "prando";
type eventNameType = keyof typeof eventDurations;


export class CombatBeginEvent extends CombatEvent {

    constructor(eventTimestampBegin: number, targetEnemy: Enemy, wizard: Wizard, rng: Prando) {
        let combatBeginAnimation_key = "combatBeginAnimation_" + targetEnemy.name;
        super(combatBeginAnimation_key as eventNameType, eventTimestampBegin, targetEnemy, wizard, rng);
    }

    allowWizardFollowupAction() {
        return true; 
    }

}

