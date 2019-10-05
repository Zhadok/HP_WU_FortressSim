import { PotionEvent } from "./PotionEvent";
import { Wizard } from "../../../../model/player/Wizard";
import { PotionAvailabilityParameters } from "../../../PotionAvailabilityParameters";
import { invigorationPotionType } from "../../../../types";


export class InvigorationPotionEvent extends PotionEvent {
    
    readonly focusReward: number;
    readonly potionName: invigorationPotionType;


    constructor(timestampBegin: number, wizard: Wizard, potionAvailability: PotionAvailabilityParameters, focusReward: number, potionName: invigorationPotionType) {
        super(timestampBegin, wizard, potionAvailability);
        this.focusReward = focusReward;
        this.potionName = potionName;  
        if ((this.potionName === "weak" && potionAvailability.nWeakInvigorationAvailable === 0) ||
            (this.potionName === "strong" && potionAvailability.nStrongInvigorationAvailable === 0)) {
            throw new Error("Tried drinking exstimulo potion with name=" + potionName + " but none available by wizard id=" + wizard.playerIndex + "!");
        }
    }

    onFinish(): void {
        super.onFinish(); 
        this.wizard.addFocus(this.focusReward);
        if (this.potionName === "weak") this.potions.nWeakInvigorationAvailable--;
        else if (this.potionName === "strong") this.potions.nStrongInvigorationAvailable--;
    }

    getPotionName(): string {
        return this.potionName.charAt(0).toUpperCase() + this.potionName.substr(1) + " Invigoration" +
            " (" + this.wizard.getFocus() + "/" + this.wizard.stats.maxFocus + " -> " + 
            Math.min(this.wizard.getFocus() + this.focusReward, this.wizard.stats.maxFocus) + "/" + this.wizard.stats.maxFocus + 
            " focus)"; 
    }

}


