import { StrategicSpellEvent } from "../StrategicSpellEvent";
import { Wizard } from "../../../../../../model/player/Wizard";
import { Enemy } from "../../../../../../model/env/enemies/Enemy";
import { Auror } from "../../../../../../model/player/Auror";

export class ConfusionHexEvent extends StrategicSpellEvent {

    readonly confusionHexValue: number;
    readonly targetEnemy: Enemy;

    constructor(timestampBegin: number, confusionHexValue: number, targetEnemy: Enemy, caster: Wizard) {
        super(timestampBegin, caster);
        this.confusionHexValue = confusionHexValue;
        this.targetEnemy = targetEnemy;

        if ((caster as Auror).hasStudiedConfusionHex() === false) {
            throw new Error("Wizard id=" + caster.playerIndex + " has not studied confusion hex but tried casting it!");
        }
    }

    onFinish() {
        // Should only cast when this is a better version of the hex
        if (this.targetEnemy.confusionHexValue < this.confusionHexValue) {
            this.targetEnemy.hasConfusionHex = true; 
            this.targetEnemy.confusionHexValue = this.confusionHexValue;
            this.getCaster().processFocusCostStrategicSpell("confusionHex");
        }
    }

}