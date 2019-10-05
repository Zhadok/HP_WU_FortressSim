import { SimEvent } from "../../SimEvent";
import { WizardEvent } from "../WizardEvent";
import { Wizard } from "../../../../model/player/Wizard";
import { PotionAvailabilityParameters } from "../../../PotionAvailabilityParameters";
import { Logger } from "../../../../util/Logger";


export abstract class PotionEvent extends WizardEvent {
    
    readonly potions: PotionAvailabilityParameters;

    constructor(eventTimestampBegin: number, wizard: Wizard, potionAvailability: PotionAvailabilityParameters) {
        super("potionMenuAndSelectAndDrink", eventTimestampBegin, wizard);
        this.potions = potionAvailability;
    }

    allowWizardFollowupAction() {
        return true; 
    }

    abstract getPotionName(): string; 

    onFinish() {
        Logger.logTUserFriendly(2, this.timestampEnd, 
            this.wizard.toUserFriendlyDescription() + " drank: " + this.getPotionName()); 
    }

}