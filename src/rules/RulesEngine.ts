import { Engine } from "truegin";
import { Almanac } from "truegin/dist/lib/almanac";
import { Wizard } from "../model/player/Wizard";

import professorRules from "./store/professorRules.json";
import { nameClassType, nameClassUserFriendlyType, strategicSpellNameType } from "../types";
import { SimEvent } from "../sim/events/SimEvent";
import { DefenceCharmEvent } from "../sim/events/wizard/room/spells/professor/DefenceCharmEvent";


export class RulesEngine {


    readonly engine: Engine    

    constructor(nameClass: nameClassType) {
        this.engine = new Engine();

        if (nameClass === "professor") {
            professorRules.forEach((rule) => {
                this.engine.addRule(rule);
            });
        }
    }

   /* getNextAction(): SimEvent {
     //   return new DefenceCharmEvent(0, 0, wi)
    }*/

}