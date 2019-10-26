import { Wizard } from "./Wizard";
import focusCostData from "../../data/focusCosts.json";
import { Enemy } from "../env/enemies/Enemy";
import { WizardStats } from "./WizardStats";
import { statNameType, actionNameType, ruleFactType, strategicSpellNameType } from '../../types';


export class Auror extends Wizard {


    constructor(stats: WizardStats, playerIndex: number, knockoutTime: number) {
        super(stats, "auror", playerIndex, knockoutTime);
    }


    isProficientAgainst(enemy: Enemy): boolean {
        switch (enemy.name) {
            case "darkWizard": return true;
            case "deathEater": return true;
            default: return false;
        }
    }

    hasStudiedWeakeningHex(): boolean {
        return this.getTriggers().weakeningHex !== null;
    }
    hasStudiedBatBogeyHex(): boolean {
        return this.getTriggers().batBogeyHex !== null;
    }
    hasStudiedConfusionHex(): boolean {
        return this.getTriggers().confusionHex !== null;
    }
    hasStudiedFocusCharm(): boolean {
        return this.getTriggers().focusCharm !== null;
    }

    getPowerAfterModifications(enemy: Enemy): number {
        let powerBuffs = 0;
        if (this.getTriggers().aurorAdvantage !== null && enemy.getCurrentStaminaPercent() < 0.5) {
            powerBuffs += this.getTriggers().aurorAdvantage!;
        }
        return super.getPowerAfterModifications(enemy) + powerBuffs;
    }
    getCritChanceAfterModifications(enemy: Enemy): number {
        let critChanceBuffs = 0;
        if (this.getTriggers().dancingWithDummies !== null && enemy.getCurrentStaminaPercent() === 1) {
            critChanceBuffs += this.getTriggers().dancingWithDummies!;
        }
        if (this.getTriggers().trickWithDeathEaters !== null && enemy.name === "deathEater") {
            critChanceBuffs += this.getTriggers().trickWithDeathEaters!
        }
        return super.getCritChanceAfterModifications(enemy) + critChanceBuffs;
    }
    getCriticalPowerAfterModifications(enemy: Enemy): number {
        let criticalPowerBuffs = 0;
        if (this.getTriggers().firstStrike !== null && enemy.getCurrentStaminaPercent() === 1) {
            criticalPowerBuffs += this.getTriggers().firstStrike!;
        }
        return super.getCriticalPowerAfterModifications(enemy) + criticalPowerBuffs;
    }

    getDefenceAfterModifications(enemy: Enemy): number {
        let defenceBuffs = 0;
        if (this.getTriggers().playingDirty !== null && enemy.getCurrentStaminaPercent() < 0.5) {
            defenceBuffs += this.getTriggers().playingDirty!;
        }
        return super.getDefenceAfterModifications(enemy) + defenceBuffs;
    }
    getProtegoPowerAfterModifications(enemy: Enemy): number {
        let buffs = 0;
        if (this.getTriggers().mundungusAmongUs !== null && enemy.name === "darkWizard") {
            buffs += this.getTriggers().mundungusAmongUs!;
        }
        return super.getProtegoPowerAfterModifications(enemy) + buffs;
    }

    static isValidStatForClass(statName: statNameType): boolean {
        switch (statName) {
            // Magizoologist
            case "staminaCharmValue":
            case "reviveCharmValue":
            case "braveryCharmValue":

            // Professor
            case "deteriorationHexDamage":
            case "mendingCharmStaminaRestore":
            case "defenceCharmIncrease":
            case "proficiencyPowerCharmIncrease": return false;
        }
        return true;
    }

    isValidStrategicSpell(actionName: actionNameType): boolean {
        switch (actionName) {
            // Magizoologist
            case "staminaCharm":
            case "reviveCharm":
            case "braveryCharm":

            // Professor
            case "deteriorationHex":
            case "mendingCharm":
            case "defenceCharm":
            case "proficiencyPowerCharm": return false;
        }
        return true;
    }

    canCastStrategicSpell(strategicSpellName: strategicSpellNameType, facts: ruleFactType, targetWizardIndex?: number, targetEnemyIndex?: number) {
        switch (strategicSpellName) {
            case "weakeningHex": return this.hasStudiedWeakeningHex() && this.hasEnoughFocusForStrategicSpell(strategicSpellName); 
            case "confusionHex": return this.hasStudiedConfusionHex() && this.hasEnoughFocusForStrategicSpell(strategicSpellName); 
            case "focusCharm": 
                if (this.hasStudiedFocusCharm() === false || this.hasEnoughFocusForStrategicSpell(strategicSpellName) === false) return false; 
                if (facts.allWizards.length === 1) return false; 
                if (targetWizardIndex !== undefined) {
                    let targetWizard = facts.allWizards[targetWizardIndex]; 
                    if (targetWizard !== undefined) {
                        if (facts.wizard === targetWizard) return false; 
                    }
                }
                return true; 
            case "batBogeyHex": return this.hasStudiedBatBogeyHex() && this.hasEnoughFocusForStrategicSpell(strategicSpellName) && this.batBogeyHexOnCooldown===false; 
        }
        return false; 
    }


}