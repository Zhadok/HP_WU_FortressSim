import eventDurations from "../../../../data/events.json";

import { Enemy } from "../../../../model/env/enemies/Enemy";
import { Wizard } from "../../../../model/player/Wizard";
import { WizardEvent } from "../WizardEvent";
import Prando from "prando";

type eventNameType = keyof typeof eventDurations;

export abstract class CombatEvent extends WizardEvent {

    readonly enemy: Enemy;
    readonly rng: Prando;

    constructor(eventName: eventNameType, timestampBegin: number, enemy: Enemy, wizard: Wizard, rng: Prando, dynamicDuration?: number) {
        super(eventName, timestampBegin, wizard, dynamicDuration);
        this.enemy = enemy;
        this.rng = rng;
    }

}
