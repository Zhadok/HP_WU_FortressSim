import { EnvEvent } from "./EnvEvent";

export class InitialEnemySpawnEvent extends EnvEvent {

    constructor(eventTimestampBegin: number) {
        super("initialEnemySpawnAnimation", eventTimestampBegin);
    }

    allowWizardFollowupAction() {
        return false; 
    }

}