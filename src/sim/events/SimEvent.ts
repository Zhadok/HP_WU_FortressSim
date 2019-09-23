import eventDurations from "../../data/events.json";

type eventNameType = keyof typeof eventDurations;


export abstract class SimEvent {
    
    readonly eventName: eventNameType; 
    readonly duration: number; // How long is event (in ms)? E.g. animation of X
    readonly timestampBegin: number; // When does event begin (in ms)?
    readonly timestampEnd: number; // When does event end (in ms)?

    constructor(eventName: eventNameType, timestampBegin: number, dynamicDuration?: number) {
        this.eventName = eventName;
        this.timestampBegin = timestampBegin;
        if (dynamicDuration === undefined) {
            this.duration = eventDurations[eventName];
        }
        else {
            this.duration = dynamicDuration;
        }
        this.timestampEnd = timestampBegin + this.duration;
       
    }

    onStart(): void {
        
    }
    onFinish(): void {

    }

    hasFollowupEvent(): boolean {
        return false;
    }
    getFollowupEvent(): SimEvent {
        throw new Error("Subclass should override this!");
    }

    abstract allowWizardFollowupAction(): boolean; 

   

}