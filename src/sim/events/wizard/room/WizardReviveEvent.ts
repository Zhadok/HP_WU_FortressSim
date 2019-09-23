import { WizardEvent } from "../WizardEvent";
import { Wizard } from "../../../../model/player/Wizard";

/**
 * Used ONLY for ReviveCharm of magizoologist (is used as followup event)
 */
export class WizardReviveEvent extends WizardEvent {

    revivedAfterThisEvent: boolean = false;

    constructor(timestampBegin: number, targetWizard: Wizard) {
        super("wizardSpawnAfterReviveCharm", timestampBegin, targetWizard);
    }

    onFinish() {
        if (this.wizard.getIsDefeated() === true) {
            this.wizard.revive();
            this.revivedAfterThisEvent = true;
        }
        
    }

    allowWizardFollowupAction(): boolean {
        if (this.revivedAfterThisEvent === true) {
            return true;
        }
        return false; 
    }



}