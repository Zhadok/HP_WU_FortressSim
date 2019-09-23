import eventDurations from "../../../data/events.json";
import { EnvEvent } from "./EnvEvent";

type eventNameType = keyof typeof eventDurations;


// After 18s/34s, another wave of enemies is spawned
export class SecondEnemySpawnEvent extends EnvEvent {

    constructor(eventName: eventNameType, eventTimestampBegin: number, ) {
        super(eventName, eventTimestampBegin);
    }

    allowWizardFollowupAction() {
        return false; 
    }

    hasFollowupEvent() {
        return false;
    }

}