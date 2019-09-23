import { StrategicSpellEvent } from "../StrategicSpellEvent";
import { Wizard } from "../../../../../../model/player/Wizard";
import { Enemy } from "../../../../../../model/env/enemies/Enemy";

export class WeakeningHexEvent extends StrategicSpellEvent {

    readonly powerDecreasePercent: number;
    readonly targetEnemy: Enemy;

    constructor(timestampBegin: number, powerDecreasePercent: number, targetEnemy: Enemy, caster: Wizard) {
        super(timestampBegin, caster);
        this.powerDecreasePercent = powerDecreasePercent;
        this.targetEnemy = targetEnemy;
    }

    onFinish() {
        if (this.targetEnemy.weakeningHexValue < this.powerDecreasePercent) {
            this.targetEnemy.hasWeakeningHex = true; 
            this.targetEnemy.weakeningHexValue = this.powerDecreasePercent;
            this.getCaster().processFocusCostStrategicSpell("weakeningHex");
        }
    }

}