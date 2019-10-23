import { StrategicSpellEvent } from "../StrategicSpellEvent";
import { Wizard } from "../../../../../../model/player/Wizard";
import { WizardReviveEvent } from "../../WizardReviveEvent";
import { Magizoologist } from "../../../../../../model/player/Magizoologist";

export class ReviveCharmEvent extends StrategicSpellEvent {

    readonly targetWizard: Wizard;
    readonly reviveCharmValue: number; 

    constructor(timestampBegin: number, reviveCharmValue: number, targetWizard: Wizard, caster: Wizard) {
        super(timestampBegin, caster);
        this.targetWizard = targetWizard;
        this.reviveCharmValue = reviveCharmValue; 
        
        if ((caster as Magizoologist).hasStudiedReviveCharm() === false) {
            throw new Error(caster.toUserFriendlyDescription() + "has not studied revive charm but tried casting it!");
        }
        if (targetWizard.getIsDefeated() === false) {
            throw new Error(targetWizard.toUserFriendlyDescription() + " is not defeated but " + caster.toUserFriendlyDescription() + " tried casting revive charm!");
        }
    }

    onFinish() {
        if (this.targetWizard.getIsDefeated()) {
            super.onFinish(); 
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

    getStrategicSpellName(): string {
        return "Revive Charm (with " + this.reviveCharmValue + "% HP)"; 
    }


}