import { StrategicSpellEvent } from "../StrategicSpellEvent";
import { Wizard } from "../../../../../../model/player/Wizard";

export class BraveryCharmEvent extends StrategicSpellEvent {

    readonly powerIncreaseAgainstElites: number; 
    readonly allWizards: Array<Wizard>;

    constructor(timestampBegin: number, powerIncreaseAgainstElites: number, allWizards: Array<Wizard>, caster: Wizard) {
        super(timestampBegin, caster);
        this.powerIncreaseAgainstElites = powerIncreaseAgainstElites;
        this.allWizards = allWizards;
    }

    onFinish() {
        for (let wizard of this.allWizards) {
            if (wizard.braveryCharmValue < this.powerIncreaseAgainstElites) {
                wizard.hasBraveryCharm = true;
                wizard.braveryCharmValue = this.powerIncreaseAgainstElites;
            }
        }
        this.getCaster().processFocusCostStrategicSpell("braveryCharm");
    }

}