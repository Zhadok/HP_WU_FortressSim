import { Engine, Rule } from "truegin";
import { Almanac } from "truegin/dist/lib/almanac";
import { Wizard } from "../model/player/Wizard";

import professorRules from "./store/professorRules.json";
import aurorRules from "./store/aurorRules.json";
import magizoologistRules from "./store/magizoologistRules.json";

import potionsData from "../data/potions.json"; 
import { nameClassType, nameClassUserFriendlyType, strategicSpellNameType, ruleFactType, actionNameType, ruleOperatorMapType, ruleContainerType, ruleType, actionNameMapType, ruleFactNameMapType, ruleFactNameType } from "../types";
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
import { RuleConstructorOptions } from "truegin/dist/lib/rule";
import { Utils } from "../util/Utils";
import { WizardFactory } from "../model/player/WizardFactory";
import { BatBogeyHexEvent } from "../sim/events/wizard/room/spells/auror/BatBogeyHexEvent";
import { WeakeningHexEvent } from "../sim/events/wizard/room/spells/auror/WeakeningHexEvent";
import { ConfusionHexEvent } from "../sim/events/wizard/room/spells/auror/ConfusionHexEvent";


export class RulesEngine {

    static actionNameMap: actionNameMapType = {
        "weakeningHex": "Weakening Hex",
        "confusionHex": "Confusion Hex",
        "focusCharm": "Focus Charm",
        "batBogeyHex": "Bat Bogey Hex",
        
        "staminaCharm": "Stamina Charm",
        "reviveCharm": "Revive Charm",
        "braveryCharm": "Bravery Charm",
    
        "defenceCharm": "Defence Charm",
        "deteriorationHex": "Deterioration Hex",
        "proficiencyPowerCharm": "Proficiency Power Charm",
        "mendingCharm": "Mending Charm",

        "strongInvigorationPotion": "Strong Invigoration Potion",
        "weakInvigorationPotion": "Weak Invigoration Potion",
        "potentExstimuloPotion": "Potent Exstimulo Potion",
        "strongExstimuloPotion": "Strong Exstimulo Potion", 
        "exstimuloPotion": "Exstimulo Potion",
        "witSharpeningPotion": "Wit Sharpening Potion",
        "healthPotion": "Health Potion",
        "enterCombatWithHighestPriorityAvailableEnemy": "Enter combat with highest priority available enemy",
        "exitCombat": "Exit combat", 
        "combatSpellCastWizard": "Attack",
        "noAction": "No action"
    }; 

    static allowedFactObjects: ruleFactNameMapType = {
        "wizard": {
            "label": "Wizard",
            "allowedPaths": RulesEngine.getAllowedPaths("wizard")
        },
        "highestPriorityAvailableEnemy": {
            "label": "Highest priority available enemy",
            "allowedPaths": RulesEngine.getAllowedPaths("highestPriorityAvailableEnemy")
        }
    };

    static ruleOperatorMap: ruleOperatorMapType = {
        "equal": "==",
        "notEqual": "!=",
        "lessThan": "<",
        "lessThanInclusive": "<=",
        "greaterThan": ">",
        "greaterThanInclusive": ">="
    };



    readonly engine: Engine    
    readonly rng: Prando; 

    constructor(ruleContainer: ruleContainerType, rng: Prando) {
        this.engine = new Engine();
        this.rng = rng;
        let rules = ruleContainer.rules; 
        
        rules.forEach((rule, index) => {
            // First rule should have highest priority (10000 is most important)
            this.engine.addRule(rule);
        });
    }

    static buildFromStandard(nameClass: nameClassType, rng: Prando): RulesEngine {
        let ruleContainer: ruleContainerType; 
        switch (nameClass) {
            case "professor": ruleContainer = professorRules as ruleContainerType; break;
            case "magizoologist": ruleContainer = magizoologistRules as ruleContainerType; break;
            case "auror": ruleContainer = aurorRules as ruleContainerType; break;
        }
        return new RulesEngine(ruleContainer!, rng)
    }

    static getAllowedPaths(ruleFactName: ruleFactNameType): Array<string | null> {
        let tempWizard: Wizard = WizardFactory.buildDemoWizard("professor");  
        let paths: Array<string | null> = []; 
        switch (ruleFactName) {
            case "wizard":
                paths = Utils.getAllFieldNames(tempWizard, "", []); 
                break; 
            case "highestPriorityAvailableEnemy": 
                paths = Utils.getAllFieldNames(tempWizard.inCombatWith, "", []);  
                break; 
        }
        //paths.push(null); // Allowed to compare with object itself as well. In UI will appear as empty
        return paths; 

    }

    async getNextAction(timestampBegin: number, facts: ruleFactType): Promise<SimEvent | null> {
        //console.log(facts);
        let results = await this.engine.run(facts).catch((error) => {
            console.log("Error processing rules!"); 
            throw error; 
        }); 
        if (results.length === 0) {
            throw new Error("Could not find a next action for wizard id=" + facts.wizard.playerIndex + 
                            ", class=" + facts.wizard.nameClassUserFriendly);
        } 
        //console.log(results);
        let event = results[0];
        // Priority 1 is "default" and not properly considered. I.e., no action with priority 0 is first in array even though mending charm with priority 1 is also in array
        if (event.type as actionNameType === "noAction" && results.length >= 2) {
            event = results[1]; 
        }
        
        let highestPriorityAvailableEnemy = facts.highestPriorityAvailableEnemy;
        let targetEnemy = null; // for casting spells at

        let wizard = facts.wizard;
        let targetWizard = null; 
        if (event.params !== undefined) {
            if (event.params.targetWizardIndex !== undefined) {
                targetWizard = facts.allWizards.filter(wizard => wizard.playerIndex === event.params.targetWizardIndex)[0];
            }
            switch (event.params.targetWizard) {
                case "lowestHP":
                    targetWizard = facts.allWizards.sort(function(v1, v2) {
                        return v2.getCurrentStamina() - v1.getCurrentStamina();
                    })[0];
                    break; 
                case "self": 
                    targetWizard = wizard; 
                    break; 
                default: 
                    targetWizard = wizard; 
                    break; 
            }
            
            switch (event.params.targetEnemy) {
                case "highestPriorityAvailableEnemy":
                    targetEnemy = highestPriorityAvailableEnemy; 
                    break; 
                case "lowestHP": 
                    targetEnemy = facts.allActiveEnemies.sort(function(v1, v2) {
                        return v2.getCurrentStamina() - v1.getCurrentStamina();
                    })[0];
                    break;
                default: 
                    targetEnemy = highestPriorityAvailableEnemy; 
                    break; 
            }   
        }
        else {
            // Still set defaults if people forget them
            targetWizard = wizard; 
            targetEnemy = highestPriorityAvailableEnemy; 
        }
        switch (event.type as actionNameType) {
            // Invigoration potion
            case "strongInvigorationPotion": 
                return new InvigorationPotionEvent(timestampBegin, wizard, wizard.getPotions(), potionsData.strongInvigorationPotionFocus, "strong");
            case "weakInvigorationPotion": 
                return new InvigorationPotionEvent(timestampBegin, wizard, wizard.getPotions(), potionsData.weakInvigorationPotionFocus, "weak");
            
            // Auror
            case "weakeningHex": 
                return new WeakeningHexEvent(timestampBegin, wizard.stats.weakeningHexValue, targetEnemy!, wizard); 
            case "confusionHex": 
                return new ConfusionHexEvent(timestampBegin, wizard.stats.confusionHexValue, targetEnemy!, wizard); 
            case "batBogeyHex": 
                return new BatBogeyHexEvent(timestampBegin, wizard.stats.batBogeyHexDamage, targetEnemy!, wizard); 

            // Professor    
            case "defenceCharm": 
                //console.log(event);
                return new DefenceCharmEvent(timestampBegin, wizard.stats.defenceCharmIncrease, targetWizard!, wizard);
            case "proficiencyPowerCharm":
                return new ProficiencyPowerCharmEvemt(timestampBegin, wizard.stats.proficiencyPowerCharmIncrease, facts.allWizards, wizard);
            case "deteriorationHex": 
                return new DeteriorationHexEvent(timestampBegin, wizard.stats.deteriorationHexDamage, targetEnemy!, wizard);
            case "mendingCharm": 
                return new MendingCharmEvent(timestampBegin, wizard.stats.mendingCharmStaminaRestore, targetWizard!, wizard);
            
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