import eventDurations from "../../../data/events.json";
import { SimEvent } from "../SimEvent";

type eventNameType = keyof typeof eventDurations;

export abstract class EnvEvent extends SimEvent {

    constructor(eventName: eventNameType, eventTimestampBegin: number) {
        super(eventName, eventTimestampBegin);
    }

}