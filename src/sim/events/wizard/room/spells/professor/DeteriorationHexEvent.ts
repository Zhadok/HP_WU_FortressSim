import { StrategicSpellEvent } from "../StrategicSpellEvent";
import { Wizard } from "../../../../../../model/player/Wizard";
import { Enemy } from "../../../../../../model/env/enemies/Enemy";
import { Logger } from "../../../../../../util/Logger";
import { Professor } from "../../../../../../model/player/Professor";

export class DeteriorationHexEvent extends StrategicSpellEvent {

    readonly deteriorationHexDamage: number; // damage on hit and damage on enemy attack
    readonly targetEnemy: Enemy;

    constructor(timestampBegin: number, damage: number, targetEnemy: Enemy, caster: Wizard) {
        super(timestampBegin, caster);
        this.deteriorationHexDamage = damage;
        this.targetEnemy = targetEnemy;

        if ((caster as Professor).hasStudiedDeteriorationHex() === false) {
            throw new Error("Wizard id=" + caster.playerIndex + " has not studied deterioration charm but tried casting it!");
        }
    }

    onFinish() {
        if (this.targetEnemy.deteriorationHexDamage < this.deteriorationHexDamage) {
            super.onFinish(); 
            this.targetEnemy.hasDeteriorationHex = true;
            this.targetEnemy.deteriorationHexDamage = this.deteriorationHexDamage;
            Logger.logT(2, this.timestampEnd, "Added deterioration hex (damage=" + this.deteriorationHexDamage + ") on enemy id=" + 
                                               this.targetEnemy.enemyIndex + " by wizard id=" + this.wizard.playerIndex);
            this.getCaster().processFocusCostStrategicSpell("deteriorationHex");
        }
    }

    getStrategicSpellName(): string {
        return "Deterioration Hex (" + this.deteriorationHexDamage + " damage)"; 
    }


}