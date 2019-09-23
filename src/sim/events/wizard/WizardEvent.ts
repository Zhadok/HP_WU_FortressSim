import { SimEvent } from "../SimEvent";
import { Wizard } from "../../../model/player/Wizard";
import eventDurations from "../../../data/events.json";

type eventNameType = keyof typeof eventDurations;


export abstract class WizardEvent extends SimEvent {
    
    wizard: Wizard;

    constructor(eventName: eventNameType, timestampBegin: number, wizard: Wizard, dynamicDuration?: number) {
        super(eventName, timestampBegin, dynamicDuration);
        this.wizard = wizard;
    }

}
