import { Wizard } from "../../../../../../model/player/Wizard";
import { CooldownFinishedEvent } from "../CooldownFinishedEvent";

export class BatBogeyHexCooldownFinishedEvent extends CooldownFinishedEvent {

    constructor(timestampBegin: number, remainingCooldownDuration: number, caster: Wizard) {
        super(timestampBegin, remainingCooldownDuration, caster);
    }

    onFinish() {
        this.getCaster().batBogeyHexOnCooldown = false; 
    }   

    getStrategicSpellName(): string {
        return "Bat Bogey Hex"; 
    }

}