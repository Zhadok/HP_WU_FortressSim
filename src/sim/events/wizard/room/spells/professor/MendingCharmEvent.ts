import { StrategicSpellEvent } from "../StrategicSpellEvent";
import { Wizard } from "../../../../../../model/player/Wizard";
import { Professor } from "../../../../../../model/player/Professor";

export class MendingCharmEvent extends StrategicSpellEvent {

    readonly staminaRestore: number;
    readonly targetWizard: Wizard;

    constructor(timestampBegin: number, staminaRestore: number, targetWizard: Wizard, caster: Wizard) {
        super(timestampBegin, caster);
        this.staminaRestore = staminaRestore;
        this.targetWizard = targetWizard;

        if ((caster as Professor).hasStudiedMendingCharm() === false) {
            throw new Error("Wizard id=" + caster.playerIndex + " has not studied mending charm but tried casting it!");
        }
    }

    onFinish() {
        this.targetWizard.addStamina(this.staminaRestore);
        this.getCaster().processFocusCostStrategicSpell("mendingCharm");
    }

}