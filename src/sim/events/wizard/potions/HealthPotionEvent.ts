import { PotionEvent } from "./PotionEvent";
import { Wizard } from "../../../../model/player/Wizard";
import { PotionAvailabilityParameters } from "../../../PotionAvailabilityParameters";


export class HealthPotionEvent extends PotionEvent {

    readonly staminaRestorePercent: number;

    constructor(timestampBegin: number, wizard: Wizard, potionAvailability: PotionAvailabilityParameters, staminaRestorePercent: number) {
        super(timestampBegin, wizard, potionAvailability);
        this.staminaRestorePercent = staminaRestorePercent;

        if (potionAvailability.nHealingPotionsAvailable === 0) {
            throw new Error("Tried to drink a potion the wizard was not allowed to!");
        }
    }

    onFinish(): void {
        this.wizard.addStaminaPercent(this.staminaRestorePercent);
        this.potions.nHealingPotionsAvailable --;
    }

}