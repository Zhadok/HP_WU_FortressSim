import { Wizard } from "../../../../../model/player/Wizard";
import { WizardEvent } from "../../../wizard/WizardEvent";
import { Logger } from "../../../../../util/Logger";


export abstract class StrategicSpellEvent extends WizardEvent {

    constructor(timestampBegin: number, caster: Wizard) {
        super("strategicSpellDragAndCastAnimation", timestampBegin, caster);
    }

    allowWizardFollowupAction() {
        return true;
    }

    getCaster(): Wizard {
        return this.wizard;
    }

    abstract getStrategicSpellName(): string; 

    onFinish() {
        Logger.logTUserFriendly(2, this.timestampEnd, this.wizard.toUserFriendlyDescription() + " cast spell: " + this.getStrategicSpellName());
    }
}