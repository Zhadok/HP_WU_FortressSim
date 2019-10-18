import { Wizard } from "../../../../../model/player/Wizard";
import { Logger } from "../../../../../util/Logger";
import { SimEvent } from "../../../SimEvent";


export abstract class CooldownFinishedEvent extends SimEvent {

    caster: Wizard; 

    constructor(timestampBegin: number, duration: number, caster: Wizard) {
        super("dynamicDuration", timestampBegin, duration);
        this.caster = caster; 
    }

    getCaster(): Wizard {
        return this.caster;
    }

    abstract getStrategicSpellName(): string; 

    onFinish() {
        Logger.logTUserFriendly(2, this.timestampEnd, this.caster.toUserFriendlyDescription() + " cooldown is up for spell: " + this.getStrategicSpellName());
    }

    allowWizardFollowupAction() {
        return false; 
    }

}