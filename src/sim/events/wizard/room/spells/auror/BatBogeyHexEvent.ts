import { StrategicSpellEvent } from "../StrategicSpellEvent";
import { Wizard } from "../../../../../../model/player/Wizard";
import { Enemy } from "../../../../../../model/env/enemies/Enemy";

export class BatBogeyHexEvent extends StrategicSpellEvent {

    readonly damage: number;
    readonly targetEnemy: Enemy;

    constructor(timestampBegin: number, damage: number, targetEnemy: Enemy, caster: Wizard) {
        super(timestampBegin, caster);
        this.damage = damage;
        this.targetEnemy = targetEnemy;
    }

    onFinish() {
        this.targetEnemy.removeStamina(this.damage);
        this.getCaster().processFocusCostStrategicSpell("batBogeyHex");
    }

}