import { SimEvent } from "../../SimEvent";
import { WizardEvent } from "../WizardEvent";
import { Wizard } from "../../../../model/player/Wizard";


export abstract class PotionEvent extends WizardEvent {
    
    constructor(eventTimestampBegin: number, wizard: Wizard) {
        super("potionMenuAndSelectAndDrink", eventTimestampBegin, wizard);
    }

    allowFollowupWizardAction(): boolean {
        return true;
    }

}