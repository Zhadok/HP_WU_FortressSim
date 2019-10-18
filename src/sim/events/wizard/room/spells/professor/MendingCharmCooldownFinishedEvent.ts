import { Wizard } from "../../../../../../model/player/Wizard";
import { SimEvent } from "../../../../SimEvent";
import { CooldownFinishedEvent } from "../CooldownFinishedEvent";

export class MendingCharmCooldownFinishedEvent extends CooldownFinishedEvent {

    constructor(timestampBegin: number, remainingCooldownDuration: number, caster: Wizard) {
        super(timestampBegin, remainingCooldownDuration, caster);
    }

    onFinish() {
        this.getCaster().mendingCharmOnCooldown = false; 
    }   

    getStrategicSpellName(): string {
        return "Mending Charm"; 
    }

}