import { Combatant } from "../Combatant";
import { WizardStats } from "./WizardStats";
import { nameClassType, nameClassUserFriendlyType, strategicSpellNameType, statNameType } from "../../types";
import { Enemy } from "../env/enemies/Enemy";

import focusCostData from "../../data/focusCosts.json";
import potionData from "../../data/potions.json"; 
import { triggerNameType, triggerMapType } from "../../types";
import { SkillTree } from "./SkillTree/SkillTree";
import { SkillTreeNode } from "./SkillTree/SkillTreeNode";
import { Logger } from "../../util/Logger";
import { PotionAvailabilityParameters } from "../../sim/PotionAvailabilityParameters";

export abstract class Wizard extends Combatant {

    readonly focusCostData = focusCostData;
    readonly potionData = potionData; 

    readonly stats: WizardStats;
    readonly nameClass: nameClassType;
    readonly nameClassUserFriendly: nameClassUserFriendlyType;
    readonly playerIndex: number;
    readonly knockoutTime: number; 

    private focus: number;

    // Skill tree triggers (e.g. more power when X happens)
    private triggers: triggerMapType;

    inCombatWith: Enemy | null = null;
    // Used for rules to check whether exstimulo should be applied
    exstimuloPotionDamageBuff: number = 0; 
    witSharpeningPotionDamageBuff: number = 0; 


    // Potions
    private potions: PotionAvailabilityParameters | undefined; 

    // Buffs
    // Professor
    hasDefenceCharm: boolean = false;
    defenceCharmValue: number = 0;
    hasProficiencyPowerCharm: boolean = false;    
    proficiencyPowerCharmValue: number = 0;

    // Magizoologist
    hasBraveryCharm: boolean = false;
    braveryCharmValue: number = 0;

    // Stats
    totalDamage: number = 0; 
    numberAttackCasts: number = 0;
    numberCriticalCasts: number = 0;
    numberDodgedCasts: number = 0;

    constructor(stats: WizardStats, 
        nameClass: nameClassType,
        playerIndex: number, 
        knockoutTime: number) {
        super(stats.stamina);
        this.stats = stats;
        this.nameClass = nameClass;
        this.nameClassUserFriendly = this.getNameClassUserFriendly(nameClass);
        this.playerIndex = playerIndex;
        this.knockoutTime = knockoutTime;

        this.focus = 0;
        this.addFocus(this.stats.initialFocus);
        //this.triggers = new Map<triggerNameType, number>();
        
        this.triggers = {
            // Auror
            aurorAdvantage: null,
            weakeningHex: null,
            batBogeyHex: null,
            playingDirty: null,
            focusCharm: null,
            dancingWithDummies: null,
            confusionHex: null,
            trickWithDeathEaters: null,
            firstStrike: null,
            mundungusAmongUs: null,

            // Professor
            confidence: null, 
            defenceCharm: null, 
            deteriorationHex: null,
            fullMoonHunter: null,
            idealExchange: null,
            mendingCharm: null,
            onSabbatical: null,
            peskyPixies: null,
            proficiencyPowerCharm: null,
            sparringSpecifics: null, 
            strengthInNumbers: null,
            teamTeaching: null,
            teamworkMakesTheDreamWork: null
        };
    }

    
    /*setTriggers(triggers: Map<triggerNameType, number>): void {
        this.triggers = triggers;
    }*/
    setTrigger(triggerName: triggerNameType, value: number | null): void {
        this.triggers[triggerName] = value;
    }
    getTriggers(): triggerMapType {
        return this.triggers;
    }

    getNameClassUserFriendly(nameClass: nameClassType): nameClassUserFriendlyType {
        switch (nameClass) {
            case "auror": return "Auror";
            case "magizoologist": return "Magizoologist";
            case "professor": return "Professor";
        }
    }

    addFocus(delta: number) {
        this.focus += delta;
        if (this.focus > this.stats.maxFocus) {
            this.focus = this.stats.maxFocus;
        }
    }
    removeFocus(delta: number) {
        this.focus -= delta;
        if (this.focus < 0) {
            throw new Error("Tried using too much focus, this.focus=" + this.focus + ", delta=" + delta + ", maxFocus=" + this.stats.maxFocus);
        }
    }
    getFocus(): number {
        return this.focus;
    }

    getProficiencyPowerAfterModifications() {
        return this.stats.proficiencyPower + this.proficiencyPowerCharmValue;
    }
    getDefenceAfterModifications(enemy: Enemy) {
        return this.stats.defence + this.defenceCharmValue;
    }
    getDefenceBreachAfterModifications(enemy: Enemy): number {
        return this.stats.defenceBreach;
    }
    getDeficiencyDefenceAfterModifications() {
        return this.stats.deficiencyDefence;
    }
    getPowerAfterModifications(enemy: Enemy) {
        return this.stats.power;
    }
    getCritChanceAfterModifications(enemy: Enemy) {
        return this.stats.critChance; // + auror if 100% stamina
    }
    getCriticalPowerAfterModifications(enemy: Enemy) {
        return this.stats.criticalPower; // + auror if 100% stamina
    }
    getProtegoPowerAfterModifications() {
        return this.stats.protegoPower;
    }
    getAccuracyAfterModifications(enemy: Enemy) {
        return this.stats.accuracy;
    }

    // Potions, magizoologist bravery charm:
    // Source: https://www.reddit.com/r/harrypotterwu/comments/csgsdd/all_about_combat_damage_what_i_know_or_i_think_i/?st=k0gijz3i&sh=acd204fd
    getDamageBuffMultiplier(enemy: Enemy) {   
        return 1 + 
               enemy.getExstimuloDamageBuff(this.playerIndex) +
               enemy.getWitSharpeningDamageBuff(this.playerIndex) + 
               //this.exstimuloPotionDamageBuff + 
               //this.witSharpeningPotionDamageBuff + 
               (enemy.isElite ? this.braveryCharmValue : 0);
    }
    

    performAttackCast(damage: number, isCritical: boolean, isDodge: boolean, enemy: Enemy): void {
        enemy.decreasePotionUsesRemaining(this); 

        // Stats
        this.totalDamage += damage; 
        this.numberAttackCasts++;
        if (isCritical) this.numberCriticalCasts++;
        if (isDodge) this.numberDodgedCasts++;
    }


    hasEnoughFocusForStrategicSpell(strategicSpellName: strategicSpellNameType): boolean {
        return this.getFocus() >= focusCostData[strategicSpellName];
    }
    processFocusCostStrategicSpell(strategicSpellName: strategicSpellNameType): void {
        this.removeFocus(focusCostData[strategicSpellName]);
    }

    // https://www.reddit.com/r/harrypotterwu/comments/d02hyh/potions_count_as_an_enhancement_for_professors/?st=k0p91lra&sh=4f6c4a34
    getNumberOfEnhancements(enemy: Enemy): number {
        return (this.hasBraveryCharm ? 1 : 0) + 
               (this.hasDefenceCharm ? 1 : 0) + 
               (this.hasProficiencyPowerCharm ? 1 : 0) +
               // Potions count as enhancements. But only exstimulo OR wit sharpening, not both
               (enemy.getExstimuloDamageBuff(this.playerIndex) > 0 || enemy.getWitSharpeningDamageBuff(this.playerIndex) > 0 ? 1 : 0); 
    }

    setPotions(potions: PotionAvailabilityParameters) {
        this.potions = potions; 
    }
    getPotions(): PotionAvailabilityParameters {
        return this.potions!; 
    }

    abstract isProficientAgainst(enemy: Enemy): boolean;

}