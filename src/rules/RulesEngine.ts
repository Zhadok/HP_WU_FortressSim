import { Engine } from "truegin";
import { Almanac } from "truegin/dist/lib/almanac";
import { Wizard } from "../model/player/Wizard";

import professorRules from "./store/professorRules.json";
import aurorRules from "./store/aurorRules.json";
import magizoologistRules from "./store/magizoologistRules.json";

import potionsData from "../data/potions.json"; 
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
import { MendingCharmEvent } from "../sim/events/wizard/room/spells/professor/MendingCharmEvent";
import { firstBy } from "thenby";
import { InvigorationPotionEvent } from "../sim/events/wizard/potions/InvigorationPotionEvent";
import { ExstimuloPotionEvent } from "../sim/events/wizard/potions/ExstimuloPotionEvent";
import { WitSharpeningPotionEvent } from "../sim/events/wizard/potions/WitSharpeningPotionEvent";
import { HealthPotionEvent } from "../sim/events/wizard/potions/HealthPotionEvent";


export class RulesEngine {


    readonly engine: Engine    
    readonly rng: Prando; 

    constructor(nameClass: nameClassType, rng: Prando) {
        this.engine = new Engine();
        this.rng = rng;
        let rules;
        switch (nameClass) {
            case "professor": rules = professorRules; break;
            case "magizoologist": rules = magizoologistRules; break;
            case "auror": rules = aurorRules; break;
            default: return; 
        }
        rules.forEach((rule, index) => {
            rule.priority = 10000 - index; 
            this.engine.addRule(rule);
        });
    }



    async getNextAction(timestampBegin: number, facts: ruleFactType): Promise<SimEvent | null> {
        //console.log(facts);
        let results = await this.engine.run(facts).catch((error) => {
            throw new Error("Error processing rules");
        }); 
        if (results.length === 0) {
            throw new Error("Could not find a next action for wizard id=" + facts.wizard.playerIndex + 
                            ", class=" + facts.wizard.nameClassUserFriendly);
        } 
        //console.log(results);
        let event = results[0];
        let highestPriorityAvailableEnemy = facts.highestPriorityAvailableEnemy;
        let wizard = facts.wizard;
        let targetWizard = null; 
        let targetWizardLowestHP = null; 
        if (event.params !== undefined) {
            if (event.params.targetWizardIndex !== undefined) {
                targetWizard = facts.allWizards.filter(wizard => wizard.playerIndex === event.params.targetWizardIndex)[0];
            }
            if (event.params.targetWizard === "lowestHP") {
                targetWizardLowestHP = facts.allWizards.sort(function(v1, v2) {
                    return v1.getCurrentStamina() - v2.getCurrentStamina();
                })[0];

            }
        }
        switch (event.type as actionNameType) {
            // Invigoration potion
            case "strongInvigorationPotion": 
                return new InvigorationPotionEvent(timestampBegin, wizard, wizard.getPotions(), potionsData.strongInvigorationPotionFocus, "strong");
            case "weakInvigorationPotion": 
                return new InvigorationPotionEvent(timestampBegin, wizard, wizard.getPotions(), potionsData.weakInvigorationPotionFocus, "weak");
            
            // Professor    
            case "defenceCharm": 
                //console.log(event);
                return new DefenceCharmEvent(timestampBegin, wizard.stats.defenceCharmIncrease, targetWizard!, wizard);
            case "proficiencyPowerCharm":
                return new ProficiencyPowerCharmEvemt(timestampBegin, wizard.stats.proficiencyPowerCharmIncrease, facts.allWizards, wizard);
            case "deteriorationHex": 
                return new DeteriorationHexEvent(timestampBegin, wizard.stats.deteriorationHexDamage, highestPriorityAvailableEnemy!, wizard);
            case "mendingCharm": 
                return new MendingCharmEvent(timestampBegin, wizard.stats.mendingCharmStaminaRestore, targetWizardLowestHP!, wizard);
            
            // Combat
            case "enterCombatWithHighestPriorityAvailableEnemy": 
                return new EnterCombatEvent(timestampBegin, highestPriorityAvailableEnemy!, wizard, this.rng);
            case "exitCombat": 
                return new ExitCombatEvent(timestampBegin, wizard.inCombatWith!, wizard, this.rng);
            case "potentExstimuloPotion": 
                return new ExstimuloPotionEvent(timestampBegin, wizard, wizard.inCombatWith!, 
                    wizard.getPotions(), potionsData.potentExstimuloPotionDamageBuff, 
                    potionsData.potentExstimuloPotionUses, "potent"); 
            case "strongExstimuloPotion": 
                return new ExstimuloPotionEvent(timestampBegin, wizard, wizard.inCombatWith!, 
                    wizard.getPotions(), potionsData.strongExstimuloPotionDamageBuff, 
                    potionsData.strongExstimuloPotionUses, "strong"); 
            case "exstimuloPotion": 
                return new ExstimuloPotionEvent(timestampBegin, wizard, wizard.inCombatWith!, 
                    wizard.getPotions(), potionsData.exstimuloPotionDamageBuff,
                    potionsData.exstimuloPotionUses, "normal"); 
            case "witSharpeningPotion": 
                return new WitSharpeningPotionEvent(timestampBegin, wizard, wizard.inCombatWith!,
                    potionsData.witSharpeningPotionDamageBuff, potionsData.witSharpeningPotionUses,
                    wizard.getPotions()); 
            case "healthPotion": 
                return new HealthPotionEvent(timestampBegin, wizard, wizard.getPotions(), potionsData.healthPotion); 
            case "combatSpellCastWizard":
                return new CombatSpellCircleEvent(timestampBegin, wizard.inCombatWith!, wizard, this.rng);
            case "noAction":
                return null; 
        }

        throw new Error("Could not find action for event type=" + results[0].type + "!");
    }

}