import { StrategicSpellEvent } from "../StrategicSpellEvent";
import { Wizard } from "../../../../../../model/player/Wizard";
import { Enemy } from "../../../../../../model/env/enemies/Enemy";
import { Auror } from "../../../../../../model/player/Auror";

export class FocusCharmEvent extends StrategicSpellEvent {

    readonly targetWizard: Wizard;
    readonly focusIncrease: number; 

    constructor(timestampBegin: number, focusIncrease: number, targetWizard: Wizard, caster: Wizard) {
        super(timestampBegin, caster);
        this.focusIncrease = focusIncrease; 
        this.targetWizard = targetWizard;

        if ((caster as Auror).hasStudiedFocusCharm() === false) {
            throw new Error("Wizard id=" + caster.playerIndex + " has not studied focus charm but tried casting it!");
        }
    }

    onFinish() {
        super.onFinish(); 
        this.targetWizard.addFocus(this.focusIncrease);
        this.getCaster().processFocusCostStrategicSpell("focusCharm");
    }
    
    getStrategicSpellName(): string {
        return "Focus Charm (+" + this.focusIncrease + " focus) for " + this.targetWizard.toUserFriendlyDescription(); 
    }


}