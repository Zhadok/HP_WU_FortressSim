import { PotionEvent } from "./PotionEvent";
import { Wizard } from "../../../../model/player/Wizard";
import { PotionAvailabilityParameters } from "../../../PotionAvailabilityParameters";


export class HealthPotionEvent extends PotionEvent {

    readonly staminaRestorePercent: number;

    constructor(timestampBegin: number, wizard: Wizard, potionAvailability: PotionAvailabilityParameters, staminaRestorePercent: number) {
        super(timestampBegin, wizard, potionAvailability);
        this.staminaRestorePercent = staminaRestorePercent;

        if (potionAvailability.nHealingPotionsAvailable === 0) {
            throw new Error("Wizard id=" + wizard.playerIndex + " tried to drink a health potion but has none available!");
        }
    }

    onFinish(): void {
        super.onFinish(); 
        this.wizard.addStaminaPercent(this.staminaRestorePercent);
        this.potions.nHealingPotionsAvailable--;
    }

    getPotionName(): string {
        return "Health Potion (+" + 
            Math.ceil(this.wizard.getMaxStamina() * this.staminaRestorePercent) + "hp)"; 
    }

}