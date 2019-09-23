import { Wizard } from "../../../../../model/player/Wizard";
import { WizardEvent } from "../../../wizard/WizardEvent";


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

}