import { StrategicSpellEvent } from "../StrategicSpellEvent";
import { Wizard } from "../../../../../../model/player/Wizard";
import { Enemy } from "../../../../../../model/env/enemies/Enemy";
import { Auror } from "../../../../../../model/player/Auror";

export class WeakeningHexEvent extends StrategicSpellEvent {

    readonly powerDecreasePercent: number;
    readonly targetEnemy: Enemy;

    constructor(timestampBegin: number, powerDecreasePercent: number, targetEnemy: Enemy, caster: Wizard) {
        super(timestampBegin, caster);
        this.powerDecreasePercent = powerDecreasePercent;
        this.targetEnemy = targetEnemy;

        if ((caster as Auror).hasStudiedWeakeningHex() === false) {
            throw new Error("Wizard id=" + caster.playerIndex + " has not studied weakening hex but tried casting it!");
        }
    }

    onFinish() {
        if (this.targetEnemy.weakeningHexValue < this.powerDecreasePercent) {
            this.targetEnemy.hasWeakeningHex = true; 
            this.targetEnemy.weakeningHexValue = this.powerDecreasePercent;
            this.getCaster().processFocusCostStrategicSpell("weakeningHex");
        }
    }

}