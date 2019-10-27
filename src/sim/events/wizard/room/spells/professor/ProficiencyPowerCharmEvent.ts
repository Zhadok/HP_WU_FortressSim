import { StrategicSpellEvent } from "../StrategicSpellEvent";
import { Wizard } from "../../../../../../model/player/Wizard";
import { Professor } from "../../../../../../model/player/Professor";

export class ProficiencyPowerCharmEvemt extends StrategicSpellEvent {

    readonly proficiencyIncrease: number; 
    readonly allWizards: Array<Wizard>;

    constructor(timestampBegin: number, proficiencyIncrease: number, allWizards: Array<Wizard>, caster: Wizard) {
        super(timestampBegin, caster);
        this.proficiencyIncrease = proficiencyIncrease;
        this.allWizards = allWizards;
        
        if ((caster as Professor).hasStudiedProficiencyPowerCharm() === false) {
            throw new Error("Wizard id=" + caster.playerIndex + " has not studied proficiency power charm but tried casting it!");
        }
    }

    onFinish() {
        super.onFinish(); 

        let isCast = false; 
        for (let wizard of this.allWizards) {
            if (wizard.proficiencyPowerCharmValue < this.proficiencyIncrease) {
                wizard.hasProficiencyPowerCharm = true;
                wizard.proficiencyPowerCharmValue = this.proficiencyIncrease;
                isCast = true; 
            }
        }

        if (isCast === true) {
            this.getCaster().processFocusCostStrategicSpell("proficiencyPowerCharm");
        }
    }

    getStrategicSpellName(): string {
        return "Proficiency Power Charm (+" +
            (this.proficiencyIncrease * 100).toFixed(0) + "% proficiency)"; 
    }


}