import { StrategicSpellEvent } from "../StrategicSpellEvent";
import { Wizard } from "../../../../../../model/player/Wizard";
import { Enemy } from "../../../../../../model/env/enemies/Enemy";
import { Auror } from "../../../../../../model/player/Auror";

export class BatBogeyHexEvent extends StrategicSpellEvent {

    readonly damage: number;
    readonly targetEnemy: Enemy;

    constructor(timestampBegin: number, damage: number, targetEnemy: Enemy, caster: Wizard) {
        super(timestampBegin, caster);
        this.damage = damage;
        this.targetEnemy = targetEnemy;

        if ((caster as Auror).hasStudiedBatBogeyHex() === false) {
            throw new Error("Wizard id=" + caster.playerIndex + " has not studied bat bogey hex but tried casting it!");
        }
    }

    onFinish() {
        super.onFinish(); 
        this.targetEnemy.removeStamina(this.damage);
        this.getCaster().processFocusCostStrategicSpell("batBogeyHex");
    }

    getStrategicSpellName(): string {
        return "Bat Bogey Hex"; 
    }

}