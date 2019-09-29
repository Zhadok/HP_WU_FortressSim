import { EnvEvent } from "./EnvEvent";

export class WizardsOutOfTimeEvent extends EnvEvent {

    constructor(maxTimeMS: number) {
        super("dynamicDuration", 0, maxTimeMS);
    }

    allowWizardFollowupAction() {
        return false; 
    }

}