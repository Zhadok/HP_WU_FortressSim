import { PotionEvent } from "./PotionEvent";
import { Wizard } from "../../../../model/player/Wizard";
import { PotionAvailabilityParameters } from "../../../PotionAvailabilityParameters";
import { Logger } from "../../../../util/Logger";
import { Enemy } from "../../../../model/env/enemies/Enemy";


export class WitSharpeningPotionEvent extends PotionEvent {

    readonly enemy: Enemy; 
    readonly damageBuff: number;
    readonly uses: number;

    constructor(timestampBegin: number, wizard: Wizard, enemy: Enemy, damageBuff: number, uses: number, potions: PotionAvailabilityParameters) {
        super(timestampBegin, wizard, potions);
        this.enemy = enemy; 
        this.damageBuff = damageBuff;
        this.uses = uses;

        if (potions.nWitSharpeningAvailable === 0) {
            throw new Error("Tried drinking wit sharpening potion but none available by wizard id=" + wizard.playerIndex + "!");
        }
    }

    onFinish(): void {
        super.onFinish(); 
        if (this.wizard.isWitSharpeningBuffActive()) {
            Logger.logT(2, this.timestampBegin, "WitSharpeningPotionEvent: wizard id=" + this.wizard.playerIndex + " tried drinking WitSharpeningPotion but potion already active!");
            return; 
        }
        
        this.wizard.applyWitSharpeningPotion(this.uses, this.damageBuff); 
        this.potions.nWitSharpeningAvailable--; 
    }

    getPotionName(): string {
        return "Wit Sharpening"; 
    }

}


