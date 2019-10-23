import { StrategicSpellEvent } from "../StrategicSpellEvent";
import { Wizard } from "../../../../../../model/player/Wizard";
import { Magizoologist } from "../../../../../../model/player/Magizoologist";

export class StaminaCharmEvent extends StrategicSpellEvent {

    readonly staminaRestorePercent: number;
    readonly targetWizard: Wizard;

    constructor(timestampBegin: number, staminaRestorePercent: number, targetWizard: Wizard, caster: Wizard) {
        super(timestampBegin, caster);
        this.staminaRestorePercent = staminaRestorePercent;
        this.targetWizard = targetWizard;

        if ((caster as Magizoologist).hasStudiedStaminaCharm() === false) {
            throw new Error(caster.toUserFriendlyDescription() + "has not studied stamina charm but tried casting it!");
        }
        if (caster === targetWizard) {
            throw new Error(caster.toUserFriendlyDescription() + " tried casting stamina charm on self!");
        }
    }

    onFinish() {
        super.onFinish(); 
        this.targetWizard.addStaminaPercent(this.staminaRestorePercent);
        this.getCaster().processFocusCostStrategicSpell("staminaCharm");
    }

    getStrategicSpellName(): string {
        return "Stamina Charm (+ " + this.staminaRestorePercent + "% hp)"; 
    }


}