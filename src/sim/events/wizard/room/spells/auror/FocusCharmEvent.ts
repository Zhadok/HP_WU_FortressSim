import { StrategicSpellEvent } from "../StrategicSpellEvent";
import { Wizard } from "../../../../../../model/player/Wizard";
import { Enemy } from "../../../../../../model/env/enemies/Enemy";

export class FocusCharmEvent extends StrategicSpellEvent {

    readonly targetWizard: Wizard;
    readonly focusIncrease: number = 1;

    constructor(timestampBegin: number, targetWizard: Wizard, caster: Wizard) {
        super(timestampBegin, caster);
        this.targetWizard = targetWizard;
    }

    onFinish() {
        this.targetWizard.addFocus(this.focusIncrease);
        this.getCaster().processFocusCostStrategicSpell("focusCharm");
    }

}