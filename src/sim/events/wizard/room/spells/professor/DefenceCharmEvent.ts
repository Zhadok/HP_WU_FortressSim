import { StrategicSpellEvent } from "../StrategicSpellEvent";
import { Wizard } from "../../../../../../model/player/Wizard";
import { Professor } from "../../../../../../model/player/Professor";

export class DefenceCharmEvent extends StrategicSpellEvent {

    readonly defenceIncrease: number;
    readonly targetWizard: Wizard;

    constructor(timestampBegin: number, defenceIncrease: number, targetWizard: Wizard, caster: Wizard) {
        super(timestampBegin, caster);
        this.defenceIncrease = defenceIncrease;
        this.targetWizard = targetWizard;

        if ((caster as Professor).hasStudiedDefenceCharm() === false) {
            throw new Error("Wizard id=" + caster.playerIndex + " has not studied defence charm but tried casting it!");
        }
    }

    onFinish() {
        // Should only cast when there is a weaker or no version of the charm
        if (this.targetWizard.defenceCharmValue < this.defenceIncrease) {
            this.targetWizard.hasDefenceCharm = true; // Increase target's defence
            this.targetWizard.defenceCharmValue = this.defenceIncrease;
            this.getCaster().processFocusCostStrategicSpell("defenceCharm");
        }
    }

}