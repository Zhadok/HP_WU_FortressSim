import { Wizard } from "./Wizard";
import { Enemy } from "../env/enemies/Enemy";
import { WizardStats } from "./WizardStats";
import { SkillTree } from "./SkillTree/SkillTree";
import { SkillTreeNode } from "./SkillTree/SkillTreeNode";
import { statNameType, actionNameType, strategicSpellNameType, ruleFactType } from '../../types';
import { ENGINE_METHOD_PKEY_METHS } from "constants";


export class Professor extends Wizard {

    constructor(stats: WizardStats, playerIndex: number, knockoutTime: number) {
        super(stats, "professor", playerIndex, knockoutTime);
    }


    isProficientAgainst(enemy: Enemy): boolean {
        switch (enemy.name) {
            case "pixie": return true;
            case "werewolf": return true;
            default: return false;
        }
    }

    hasStudiedDeteriorationHex(): boolean {
        return this.getTriggers().deteriorationHex !== null;
    }
    hasStudiedMendingCharm(): boolean {
        return this.getTriggers().mendingCharm !== null;
    }
    hasStudiedProficiencyPowerCharm(): boolean {
        return this.getTriggers().proficiencyPowerCharm !== null;
    }
    hasStudiedDefenceCharm(): boolean {
        return this.getTriggers().defenceCharm !== null;
    }

    getPowerAfterModifications(enemy: Enemy): number {
        let powerBuffs = 0;
        if (this.getTriggers().idealExchange !== null && enemy.getNumberOfImpairments() >= 1) {
            powerBuffs += this.getTriggers().idealExchange!;
        }
        if (this.getTriggers().strengthInNumbers !== null && this.getNumberOfEnhancements(enemy) >= 1) {
            powerBuffs += this.getTriggers().strengthInNumbers!;
        }
        if (this.getTriggers().teamworkMakesTheDreamWork !== null && this.getNumberOfEnhancements(enemy) >= 2) {
            powerBuffs += this.getTriggers().teamworkMakesTheDreamWork!;
        }
        if (this.getTriggers().onSabbatical !== null && enemy.getNumberOfImpairments() >= 3) {
            powerBuffs += this.getTriggers().onSabbatical!;
        }
        return super.getPowerAfterModifications(enemy) + powerBuffs;
    }

    getDefenceAfterModifications(enemy: Enemy): number {
        let defenceBuffs = 0;
        if (this.getTriggers().restrictedSection !== null && enemy.getNumberOfImpairments() >= 1) {
            defenceBuffs += this.getTriggers().restrictedSection!; 
        }
        if (this.getTriggers().sparringSpecifics !== null && enemy.getNumberOfImpairments() >= 2) {
            defenceBuffs += this.getTriggers().sparringSpecifics!;
        }
        if (this.getTriggers().confidence !== null && this.getNumberOfEnhancements(enemy) >= 1) {
            defenceBuffs += this.getTriggers().confidence!;
        }
        if (this.getTriggers().teamTeaching !== null && this.getNumberOfEnhancements(enemy) >= 2) {
            defenceBuffs += this.getTriggers().teamTeaching!;
        }
        return super.getDefenceAfterModifications(enemy) + defenceBuffs; 
    }

    getDefenceBreachAfterModifications(enemy: Enemy): number {
        let defenceBreachBuffs = 0;
        if (this.getTriggers().fullMoonHunter !== null && enemy.name === "werewolf") {
            defenceBreachBuffs += this.getTriggers().fullMoonHunter!;
        }
        return super.getDefenceBreachAfterModifications(enemy) + defenceBreachBuffs;
    }

    getAccuracyAfterModifications(enemy: Enemy): number {
        let accuracyBuffs = 0;
        if (this.getTriggers().peskyPixies !== null && enemy.name === "pixie") {
            accuracyBuffs += this.getTriggers().peskyPixies!;
        }
        return super.getAccuracyAfterModifications(enemy) + accuracyBuffs; 
    }

    static isValidStatForClass(statName: statNameType): boolean {
        switch(statName) {
            // Magizoologist
            case "staminaCharmValue": 
            case "reviveCharmValue": 
            case "braveryCharmValue": 

            // Auror
            case "weakeningHexValue": 
            case "confusionHexValue": 
            case "batBogeyHexDamage": 
            case "focusCharmValue": return false; 
        }
        return true; 
    }

    isValidStrategicSpell(strategicSpellName: strategicSpellNameType): boolean {
        switch (strategicSpellName) {
            // Magizoologist
            case "staminaCharm": 
            case "reviveCharm": 
            case "braveryCharm": 

            // Auror
            case "weakeningHex": 
            case "confusionHex": 
            case "batBogeyHex": 
            case "focusCharm": return false; 
        }
        return true; 
    }

    canCastStrategicSpell(strategicSpellName: strategicSpellNameType, facts: ruleFactType, targetWizardIndex?: number, targetEnemyIndex?: number) {
        switch (strategicSpellName) {
            case "defenceCharm": return this.hasStudiedDefenceCharm() && this.hasEnoughFocusForStrategicSpell("defenceCharm"); 
            case "mendingCharm": return this.hasStudiedMendingCharm() && this.hasEnoughFocusForStrategicSpell("mendingCharm") && this.mendingCharmOnCooldown===false; 
            case "proficiencyPowerCharm": return this.hasStudiedProficiencyPowerCharm() && this.hasEnoughFocusForStrategicSpell("proficiencyPowerCharm"); 
            case "deteriorationHex": return this.hasStudiedDeteriorationHex() && this.hasEnoughFocusForStrategicSpell("deteriorationHex"); 
        }
        return false; 
    }

}