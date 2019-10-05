import { WizardEvent } from "../WizardEvent";
import { Wizard } from "../../../../model/player/Wizard";
import { Logger } from "../../../../util/Logger";

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
        Logger.logTUserFriendly(1, this.timestampEnd, this.wizard.toUserFriendlyDescription() + " has been revived!"); 
    }

    allowWizardFollowupAction(): boolean {
        if (this.revivedAfterThisEvent === true) {
            return true;
        }
        return false; 
    }



}