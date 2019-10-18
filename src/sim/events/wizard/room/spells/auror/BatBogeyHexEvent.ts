import { StrategicSpellEvent } from "../StrategicSpellEvent";
import { Wizard } from "../../../../../../model/player/Wizard";
import { Enemy } from "../../../../../../model/env/enemies/Enemy";
import { Auror } from "../../../../../../model/player/Auror";
import { SimEvent } from "../../../../SimEvent";
import { BatBogeyHexCooldownFinishedEvent } from "./BatBogeyHexCooldownFinishedEvent";
import spellCooldownData from "../../../../../../data/spellCooldowns.json"; 

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
        if (caster.batBogeyHexOnCooldown === true) {
            throw new Error(caster.toUserFriendlyDescription() + " tried casting bat bogey hex while it was still on cooldown!"); 
        }
    }
    
    onStart() {
        this.getCaster().batBogeyHexOnCooldown = true;
    }

    onFinish() {
        super.onFinish(); 
        this.targetEnemy.removeStamina(this.damage);
        this.getCaster().processFocusCostStrategicSpell("batBogeyHex");
    }

    getStrategicSpellName(): string {
        return "Bat Bogey Hex (" + this.damage + " damage)"; 
    }

    hasFollowupEvent(): boolean {
        return true; 
    }   
    
    getFollowupEvent(): SimEvent {
        return new BatBogeyHexCooldownFinishedEvent(this.timestampEnd, spellCooldownData.batBogeyHex - (this.duration), this.getCaster()); 
    }   

}