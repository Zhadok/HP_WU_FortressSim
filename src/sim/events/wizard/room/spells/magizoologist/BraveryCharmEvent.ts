import { StrategicSpellEvent } from "../StrategicSpellEvent";
import { Wizard } from "../../../../../../model/player/Wizard";
import { Magizoologist } from "../../../../../../model/player/Magizoologist";

export class BraveryCharmEvent extends StrategicSpellEvent {

    readonly powerIncreaseAgainstElites: number; 
    readonly allWizards: Array<Wizard>;

    constructor(timestampBegin: number, powerIncreaseAgainstElites: number, allWizards: Array<Wizard>, caster: Wizard) {
        super(timestampBegin, caster);
        this.powerIncreaseAgainstElites = powerIncreaseAgainstElites;
        this.allWizards = allWizards;

        if ((caster as Magizoologist).hasStudiedBraveryCharm() === false) {
            throw new Error(caster.toUserFriendlyDescription() + "has not studied bravery charm but tried casting it!");
        }
    }

    onFinish() {
        super.onFinish(); 
        let isCast = false; 
        for (let wizard of this.allWizards) {
            if (wizard.braveryCharmValue < this.powerIncreaseAgainstElites) {
                wizard.hasBraveryCharm = true;
                wizard.braveryCharmValue = this.powerIncreaseAgainstElites;
                isCast = true; 
            }
        }

        if (isCast === true) {
            this.getCaster().processFocusCostStrategicSpell("braveryCharm");
        }
    }

    getStrategicSpellName(): string {
        return "Bravery Charm (" + (this.powerIncreaseAgainstElites*100).toFixed(0) + "% more dmg against elites)"; 
    }


}