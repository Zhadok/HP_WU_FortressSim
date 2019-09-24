import { Engine } from "truegin";
import { Almanac } from "truegin/dist/lib/almanac";
import { Wizard } from "../model/player/Wizard";

import professorRules from "./store/professorRules.json";
import { nameClassType, nameClassUserFriendlyType, strategicSpellNameType, ruleFactType, actionNameType } from "../types";
import { SimEvent } from "../sim/events/SimEvent";
import { DefenceCharmEvent } from "../sim/events/wizard/room/spells/professor/DefenceCharmEvent";
import { Enemy } from "../model/env/enemies/Enemy";
import { EnterCombatEvent } from "../sim/events/wizard/combat/EnterCombatEvent";
import Prando from "prando";
import { ProficiencyPowerCharmEvemt } from "../sim/events/wizard/room/spells/professor/ProficiencyPowerCharmEvent";
import { DeteriorationHexEvent } from "../sim/events/wizard/room/spells/professor/DeteriorationHexEvent";
import { ExitCombatEvent } from "../sim/events/wizard/combat/ExitCombatEvent";
import { CombatSpellTraceEvent } from "../sim/events/wizard/combat/CombatSpellTraceEvent";
import { CombatSpellCircleEvent } from "../sim/events/wizard/combat/CombatSpellCircleEvent";


export class RulesEngine {


    readonly engine: Engine    
    readonly rng: Prando; 

    constructor(nameClass: nameClassType, rng: Prando) {
        this.engine = new Engine();
        this.rng = rng;
        if (nameClass === "professor") {
            professorRules.forEach((rule, index) => {
                rule.priority = 10000 - index; 
                this.engine.addRule(rule);
            });
        }
    }



    async getNextAction(timestampBegin: number, facts: ruleFactType): Promise<SimEvent> {
        let results = await this.engine.run(facts);
        if (results.length === 0) {
            throw new Error("Could not find a next action for wizard id=" + facts.wizard.playerIndex);
        } 
        let event = results[0];
        let highestPriorityAvailableEnemy = facts.highestPriorityAvailableEnemy;
        let wizard = facts.wizard;
        let targetWizard = null; 
        if (event.params !== undefined) {
            if (event.params.targetWizardIndex !== undefined) {
                targetWizard = facts.allWizards.filter(wizard => wizard.playerIndex === event.params.targetWizardIndex)[0];
            }
        }
        switch (event.type as actionNameType) {
            case "defenceCharm": 
                console.log(event);
                return new DefenceCharmEvent(timestampBegin, wizard.stats.defenceCharmIncrease, targetWizard!, wizard);
            case "proficiencyPowerCharm":
                return new ProficiencyPowerCharmEvemt(timestampBegin, wizard.stats.proficiencyPowerCharmIncrease, facts.allWizards, wizard);
            case "deteriorationHex": 
                return new DeteriorationHexEvent(timestampBegin, wizard.stats.deteriorationHexDamage, highestPriorityAvailableEnemy, wizard);
            case "enterCombatWithHighestPriorityAvailableEnemy": 
                return new EnterCombatEvent(timestampBegin, highestPriorityAvailableEnemy, wizard, this.rng);
            case "exitCombat": 
                return new ExitCombatEvent(timestampBegin, highestPriorityAvailableEnemy, wizard, this.rng);
            case "combatSpellCastWizard":
                return new CombatSpellCircleEvent(timestampBegin, wizard.inCombatWith!, wizard, this.rng);
            
        }

        throw new Error("Could not find action for event type=" + results[0].type + "!");
    }

}