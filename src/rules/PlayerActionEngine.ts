import { ruleFactType, actionNameMapType, playerActionSelectionModeMapType, actionNameType } from "../types";
import { SimEvent } from "../sim/events/SimEvent";
import Prando from "prando";
import { Wizard } from "../model/player/Wizard";
import { Enemy } from "../model/env/enemies/Enemy";
import { InvigorationPotionEvent } from "../sim/events/wizard/potions/InvigorationPotionEvent";
import { WeakeningHexEvent } from "../sim/events/wizard/room/spells/auror/WeakeningHexEvent";
import { ConfusionHexEvent } from "../sim/events/wizard/room/spells/auror/ConfusionHexEvent";
import { BatBogeyHexEvent } from "../sim/events/wizard/room/spells/auror/BatBogeyHexEvent";
import { BraveryCharmEvent } from "../sim/events/wizard/room/spells/magizoologist/BraveryCharmEvent";
import { StaminaCharmEvent } from "../sim/events/wizard/room/spells/magizoologist/StaminaCharmEvent";
import { ReviveCharmEvent } from "../sim/events/wizard/room/spells/magizoologist/ReviveCharmEvent";
import { DefenceCharmEvent } from "../sim/events/wizard/room/spells/professor/DefenceCharmEvent";
import { ProficiencyPowerCharmEvemt } from "../sim/events/wizard/room/spells/professor/ProficiencyPowerCharmEvent";
import { DeteriorationHexEvent } from "../sim/events/wizard/room/spells/professor/DeteriorationHexEvent";
import { MendingCharmEvent } from "../sim/events/wizard/room/spells/professor/MendingCharmEvent";
import { EnterCombatEvent } from "../sim/events/wizard/combat/EnterCombatEvent";
import { ExitCombatEvent } from "../sim/events/wizard/combat/ExitCombatEvent";
import { ExstimuloPotionEvent } from "../sim/events/wizard/potions/ExstimuloPotionEvent";
import { WitSharpeningPotionEvent } from "../sim/events/wizard/potions/WitSharpeningPotionEvent";
import { HealthPotionEvent } from "../sim/events/wizard/potions/HealthPotionEvent";
import { CombatSpellCircleEvent } from "../sim/events/wizard/combat/CombatSpellCircleEvent";
import potionsData from "../data/potions.json"; 

export abstract class PlayerActionEngine {

    static playerActionSelectionModeMap: playerActionSelectionModeMapType = {
        "manual": "Website user select player actions (manual input)",
        "rules": "Player AI selects actions (rule-based)"
    }

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

        "enterCombat": "Enter combat", 
        "enterCombatWithHighestPriorityAvailableEnemy": "Enter combat with highest priority available enemy",
        "exitCombat": "Exit combat", 
        "combatSpellCastWizard": "Attack",
        "noAction": "No action"
    }; 


    readonly rng: Prando; 
    
    constructor(rng: Prando) {
        this.rng = rng;
    }



    abstract async getNextAction(timestampBegin: number, facts: ruleFactType): Promise<SimEvent | null>; 

    getSimEventFromAction(actionName: actionNameType, timestampBegin: number, wizard: Wizard, targetWizard: Wizard, targetEnemy: Enemy, facts: ruleFactType): SimEvent | null {
        switch (actionName) {
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
    
            // Magizoologist
            case "braveryCharm": 
                return new BraveryCharmEvent(timestampBegin, wizard.stats.braveryCharmValue, facts.allWizards, wizard);             
            case "staminaCharm": 
                return new StaminaCharmEvent(timestampBegin, wizard.stats.staminaCharmValue, targetWizard, wizard); 
            case "reviveCharm": 
                return new ReviveCharmEvent(timestampBegin, wizard.stats.reviveCharmValue, targetWizard, wizard); 
    
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
            case "enterCombat": 
                return new EnterCombatEvent(timestampBegin, targetEnemy!, wizard, this.rng);
            case "enterCombatWithHighestPriorityAvailableEnemy": 
                return new EnterCombatEvent(timestampBegin, targetEnemy!, wizard, this.rng);
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
    
        throw new Error("Could not find action for event type=" + actionName + "!");
    }
    


}