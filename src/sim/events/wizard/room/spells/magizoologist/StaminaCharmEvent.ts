import { StrategicSpellEvent } from "../StrategicSpellEvent";
import { Wizard } from "../../../../../../model/player/Wizard";

export class StaminaCharmEvent extends StrategicSpellEvent {

    readonly staminaRestorePercent: number;
    readonly targetWizard: Wizard;

    constructor(timestampBegin: number, staminaRestorePercent: number, targetWizard: Wizard, caster: Wizard) {
        super(timestampBegin, caster);
        this.staminaRestorePercent = staminaRestorePercent;
        this.targetWizard = targetWizard;
    }

    onFinish() {
        this.targetWizard.addStaminaPercent(this.staminaRestorePercent);
        this.getCaster().processFocusCostStrategicSpell("staminaCharm");
    }

}