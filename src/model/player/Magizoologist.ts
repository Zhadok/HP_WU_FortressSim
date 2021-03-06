import { Wizard } from "./Wizard";
import focusCostData from "../../data/focusCosts.json";
import { Enemy } from "../env/enemies/Enemy";
import { WizardStats } from "./WizardStats";
import { statNameType, actionNameType, strategicSpellNameType, ruleFactType } from '../../types';


export class Magizoologist extends Wizard {

    constructor(stats: WizardStats, playerIndex: number, knockoutTime: number) {
        super(stats, "magizoologist", playerIndex, knockoutTime);
    }

    isProficientAgainst(enemy: Enemy): boolean {
        switch (enemy.name) {
            case "acromantula": return true;
            case "erkling": return true;
            default: return false;
        }
    }

    hasStudiedMendingCharm(): boolean {
        return this.getTriggers().mendingCharm !== null; 
    }
    hasStudiedStaminaCharm(): boolean {
        return this.getTriggers().staminaCharm !== null; 
    }
    hasStudiedBraveryCharm(): boolean {
        return this.getTriggers().braveryCharm !== null; 
    }
    hasStudiedReviveCharm(): boolean {
        return this.getTriggers().reviveCharm !== null; 
    }

    getPowerAfterModifications(enemy: Enemy) {
        let powerBuffs = 0; 
        if (this.getTriggers().ministryMagizoologyOrientation !== null && this.getCurrentStaminaPercent() >= 0.5) {
            powerBuffs += this.getTriggers().ministryMagizoologyOrientation!; 
        }
        if (this.getTriggers().becomeTheBeast !== null && this.getFocus() >= 5) {
            powerBuffs += this.getTriggers().becomeTheBeast!; 
        }
        if (this.getTriggers().vileCreatures != null && enemy.name === "erkling") {
            powerBuffs += this.getTriggers().vileCreatures!; 
        }
        return super.getPowerAfterModifications(enemy) + powerBuffs;
    }

    getDefenceAfterModifications(enemy: Enemy) {
        let defenceBuffs = 0;
        if (this.getTriggers().forumQuorum !== null && this.getCurrentStaminaPercent() >= 0.5) {
            defenceBuffs += this.getTriggers().forumQuorum!; 
        }
        if (this.getTriggers().spiders !== null && enemy.name === "acromantula") {
            defenceBuffs += this.getTriggers().spiders!; 
        }
        if (this.getTriggers().birdInHand !== null && this.getFocus() >= 5) {
            defenceBuffs += this.getTriggers().birdInHand!; 
        }
        return super.getDefenceAfterModifications(enemy) + defenceBuffs; 
    }

    static isValidStatForClass(statName: statNameType): boolean {
        switch(statName) {
            // Auror
            case "weakeningHexValue": 
            case "confusionHexValue": 
            case "batBogeyHexDamage": 
            case "focusCharmValue": 

            // Professor
            case "deteriorationHexDamage": 
            case "defenceCharmIncrease": 
            case "proficiencyPowerCharmIncrease": return false; 
        }
        return true; 
    }

    isValidStrategicSpell(strategicSpellName: strategicSpellNameType): boolean {
        switch(strategicSpellName) {
            // Auror
            case "weakeningHex": 
            case "confusionHex": 
            case "batBogeyHex": 
            case "focusCharm": 

            // Professor
            case "deteriorationHex": 
            case "defenceCharm": 
            case "proficiencyPowerCharm": return false; 
        }
        return true; 
    }
    
    canCastStrategicSpell(strategicSpellName: strategicSpellNameType, facts: ruleFactType, targetWizardIndex?: number, targetEnemyIndex?: number) {
        switch (strategicSpellName) {
            case "braveryCharm": return this.hasStudiedBraveryCharm() && this.hasEnoughFocusForStrategicSpell(strategicSpellName); 
            case "mendingCharm": return this.hasStudiedMendingCharm() && this.hasEnoughFocusForStrategicSpell(strategicSpellName) && this.mendingCharmOnCooldown===false; 
            case "staminaCharm": return this.hasStudiedStaminaCharm() && this.hasEnoughFocusForStrategicSpell(strategicSpellName); 
            case "reviveCharm": 
                if (this.hasStudiedReviveCharm() === false || this.hasEnoughFocusForStrategicSpell(strategicSpellName) === false) return false; 
                if (facts.allWizards.length === 1 || facts.chamber.isAnyWizardDefeated === false) return false; 
                if (targetWizardIndex !== undefined) {
                    let targetWizard = facts.allWizards[targetWizardIndex]; 
                    if (targetWizard !== undefined) {
                        if (targetWizard.getIsDefeated() === false || facts.wizard === targetWizard) return false; 
                    }
                }
                return true; 
        }
        return false; 
    }


}