import { PotionEvent } from "./PotionEvent";
import { Wizard } from "../../../../model/player/Wizard";
import { PotionAvailabilityParameters } from "../../../PotionAvailabilityParameters";
import { Logger } from "../../../../util/Logger";
import { Enemy } from "../../../../model/env/enemies/Enemy";


export class WitSharpeningPotionEvent extends PotionEvent {

    readonly enemy: Enemy; 
    readonly damageBuff: number;
    readonly uses: number;

    constructor(timestampBegin: number, wizard: Wizard, enemy: Enemy, damageBuff: number, uses: number, potionAvailability: PotionAvailabilityParameters) {
        super(timestampBegin, wizard, potionAvailability);
        this.enemy = enemy; 
        this.damageBuff = damageBuff;
        this.uses = uses;

        if (potionAvailability.nWitSharpeningAvailable === 0) {
            throw new Error("Tried drinking wit sharpening potion but none available by wizard id=" + wizard.playerIndex + "!");
        }
    }

    onFinish(): void {
        if (this.enemy.getWitSharpeningDamageBuff(this.wizard.playerIndex) >= this.damageBuff) {
            Logger.logT(2, this.timestampBegin, "WitSharpeningPotionEvent: wizard id=" + this.wizard.playerIndex + " tried drinking WitSharpeningPotion but version already active!");
            return; 
        }
        if (this.enemy.isElite === false) {
            Logger.logT(2, this.timestampBegin, "WitSharpeningPotionEvent: wizard id=" + this.wizard.playerIndex + " tried drinking WitSharpeningPotion but enemy is not elite!"); 
            return; 
        }
        
        this.enemy.applyWitSharpeningPotion(this.wizard, this.uses, this.damageBuff); 
    }

}


