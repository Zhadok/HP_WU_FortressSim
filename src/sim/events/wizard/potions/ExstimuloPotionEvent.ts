import { PotionEvent } from "./PotionEvent";
import { Wizard } from "../../../../model/player/Wizard";
import { PotionAvailabilityParameters } from "../../../PotionAvailabilityParameters";
import { exstimuloPotionType } from "../../../../types";
import { Logger } from "../../../../util/Logger";
import { Enemy } from "../../../../model/env/enemies/Enemy";

export class ExstimuloPotionEvent extends PotionEvent {

    readonly enemy: Enemy; 
    readonly damageBuff: number;
    readonly uses: number; 
    readonly potionName: exstimuloPotionType;

    constructor(timestampBegin: number, wizard: Wizard, enemy: Enemy, potionAvailability: PotionAvailabilityParameters, damageBuff: number, uses: number, potionName: exstimuloPotionType) {
        super(timestampBegin, wizard, potionAvailability);
        this.enemy = enemy; 
        this.damageBuff = damageBuff;
        this.uses = uses; 
        this.potionName = potionName; 

        if ((potionName === "normal" && potionAvailability.nExstimuloAvailable === 0) ||
            (potionName === "strong" && potionAvailability.nStrongExstimuloAvailable === 0) || 
            (potionName === "potent" && potionAvailability.nPotentExstimuloAvailable === 0)) {
            throw new Error("Tried drinking exstimulo potion with name=" + potionName + " but none available by wizard id=" + wizard.playerIndex + "!");
        }
    }

    onFinish(): void {
        // Check if stronger or existing version already active
        if (this.enemy.getExstimuloDamageBuff(this.wizard.playerIndex) >= this.damageBuff) {
            Logger.logT(2, this.timestampBegin, "ExstimuloPotionEvent: wizard id=" + this.wizard.playerIndex + " tried drinking exstimulo potion but version already active!");
            return; 
        }
        this.enemy.applyExstimuloPotion(this.wizard.playerIndex, this.uses, this.damageBuff); 
        if (this.potionName === "normal") this.potions.nExstimuloAvailable--;
        else if (this.potionName === "strong") this.potions.nStrongExstimuloAvailable--;
        else if (this.potionName === "potent") this.potions.nPotentExstimuloAvailable--;
    }

}

