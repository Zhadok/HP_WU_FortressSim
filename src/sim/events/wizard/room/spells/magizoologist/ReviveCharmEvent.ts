import { StrategicSpellEvent } from "../StrategicSpellEvent";
import { Wizard } from "../../../../../../model/player/Wizard";
import { WizardReviveEvent } from "../../WizardReviveEvent";

export class ReviveCharmEvent extends StrategicSpellEvent {

    readonly targetWizard: Wizard;

    constructor(timestampBegin: number, targetWizard: Wizard, caster: Wizard) {
        super(timestampBegin, caster);
        this.targetWizard = targetWizard;
    }

    onFinish() {
        if (this.targetWizard.getIsDefeated()) {
            this.getCaster().processFocusCostStrategicSpell("reviveCharm");
        }
    }

    allowWizardFollowupAction(): boolean {
        return true;
    }

    hasFollowupEvent() {
        return this.targetWizard.getIsDefeated() === true;
    }

    getFollowupEvent() {
        return new WizardReviveEvent(this.timestampEnd, this.targetWizard);
    }

}