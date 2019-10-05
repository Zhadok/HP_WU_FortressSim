import { EnvEvent } from "./EnvEvent";
import { Logger } from "../../../util/Logger";

export class WizardsOutOfTimeEvent extends EnvEvent {

    constructor(maxTimeMS: number) {
        super("dynamicDuration", 0, maxTimeMS);
    }

    allowWizardFollowupAction() {
        return false; 
    }

    onFinish() {
        Logger.logTUserFriendly(1, this.timestampEnd, "Wizards have run out time and have been defeated!"); 
    }

}