import { PotionEvent } from "./PotionEvent";
import { Wizard } from "../../../../model/player/Wizard";
import { PotionAvailabilityParameters } from "../../../PotionAvailabilityParameters";
import { Logger } from "../../../../util/Logger";


export class WitSharpeningPotionEvent extends PotionEvent {

    readonly damageBuff: number;
    readonly uses: number;

    constructor(timestampBegin: number, wizard: Wizard, damageBuff: number, uses: number, potionAvailability: PotionAvailabilityParameters) {
        super(timestampBegin, wizard, potionAvailability);
        this.damageBuff = damageBuff;
        this.uses = uses;

        if (potionAvailability.nWitSharpeningAvailable === 0) {
            throw new Error("Tried drinking wit sharpening potion but none available by wizard id=" + wizard.playerIndex + "!");
        }
    }

    onFinish(): void {
        if (this.wizard.witSharpeningPotionDamageBuff >= this.damageBuff) {
            Logger.logT(2, this.timestampBegin, "WitSharpeningPotionEvent: wizard id=" + this.wizard.playerIndex + " tried drinking WitSharpeningPotion but version already active!");
            return; 
        }
        this.wizard.witSharpeningPotionDamageBuff = this.damageBuff;
        this.wizard.witSharpeningPotionUsesRemaining = this.uses;
    }

}


