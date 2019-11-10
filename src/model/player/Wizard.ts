import { Combatant } from "../Combatant";
import { WizardStats } from "./WizardStats";
import { nameClassType, nameClassUserFriendlyType, strategicSpellNameType, statNameType, actionNameType, ruleFactType } from "../../types";
import { Enemy } from "../env/enemies/Enemy";

import focusCostData from "../../data/focusCosts.json";
import potionData from "../../data/potions.json"; 
import { triggerNameType, triggerMapType } from "../../types";
import { SkillTree } from "./SkillTree/SkillTree";
import { SkillTreeNode } from "./SkillTree/SkillTreeNode";
import { Logger } from "../../util/Logger";
import { PotionAvailabilityParameters } from "../../sim/PotionAvailabilityParameters";
import potionsBrewTime from "../../../src/data/potionsBrewTime.json";
import { CombatSimulationResultsWizard } from "../../sim/CombatSimulationResultsWizard";

export abstract class Wizard extends Combatant {

    readonly focusCostData = focusCostData;
    readonly potionData = potionData; 

    readonly stats: WizardStats;
    readonly nameClass: nameClassType;
    readonly nameClassUserFriendly: nameClassUserFriendlyType;
    readonly playerIndex: number;
    readonly knockoutTime: number; 

    private focus: number;
    private maximumFocusMinusCurrentFocus: number; // Needed for rules (e.g. 15 max focus, 12 current focus, value of this variable is 3)

    // Skill tree triggers (e.g. more power when X happens)
    private triggers: triggerMapType;

    inCombatWith: Enemy | null = null;

    // Used for calculating time spent defeated
    timestampDefeated: number = -1;  // When was combatant defeated?
    timeSpentDefeated: number = 0; 

    // Potions
    private potionsAtBeginning: PotionAvailabilityParameters | undefined; 
    private potions: PotionAvailabilityParameters | undefined; 

    exstimuloPotionUsesRemaining: number = 0; 
    exstimuloPotionDamageBuff: number = 0; 
    
    witSharpeningPotionUsesRemaining: number = 0; 
    witSharpeningPotionDamageBuff: number = 0; 

    // Buffs
    // Auror
    batBogeyHexOnCooldown: boolean = false; 

    // Professor
    hasDefenceCharm: boolean = false;
    defenceCharmValue: number = 0;
    hasProficiencyPowerCharm: boolean = false;    
    proficiencyPowerCharmValue: number = 0;
    mendingCharmOnCooldown: boolean = false; 

    // Magizoologist
    hasBraveryCharm: boolean = false;
    braveryCharmValue: number = 0;

    // Stats
    totalDamage: number = 0; 
    numberAttackCasts: number = 0;
    numberCriticalCasts: number = 0;
    numberDodgedCasts: number = 0;
    numberEnhancementsDuringAttacks: Array<number> = [0, 0, 0, 0, 0, 0, 0]; // up to 6
    numberImpairmentsDuringAttacks: Array<number> = [0, 0, 0, 0]; // up to 3

    totalDamageReceived: number = 0; 
    numberAttacksReceived: number = 0; 
    numberEnhancementsDuringAttacksReceived: Array<number> = [0, 0, 0, 0, 0, 0, 0]; // up to 6
    numberImpairmentsDuringAttacksReceived: Array<number> = [0, 0, 0, 0]; // up to 3


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
        this.maximumFocusMinusCurrentFocus = this.stats.maxFocus; 
        this.addFocus(this.stats.initialFocus);
        
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

            // Magizoologist
            ministryMagizoologyOrientation: null, 
            forumQuorum: null, 
            becomeTheBeast: null, 
            birdInHand: null,
            spiders: null,
            vileCreatures: null,
            staminaCharm: null,
            reviveCharm: null,
            braveryCharm: null,

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
            restrictedSection: null, 
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
        this.setFocus(this.focus + delta); 
    }
    removeFocus(delta: number) {
        this.setFocus(this.focus - delta); 
    }
    setFocus(focus: number) {
        this.focus = focus; 
        this.maximumFocusMinusCurrentFocus = this.stats.maxFocus - this.focus; 
        if (this.focus > this.stats.maxFocus) {
            this.focus = this.stats.maxFocus;
            this.maximumFocusMinusCurrentFocus = 0; 
        }
        if (this.focus < 0) {
            throw new Error("Tried using too much focus, this.focus=" + this.focus +  + ", maxFocus=" + this.stats.maxFocus);
        }
    }
    getFocus(): number {
        return this.focus;
    }

    revive(timestampRevived: number): void {
        this.isDefeated = false;
        this.addStamina(this.getMaxStamina());
        if (this.timestampDefeated > -1 && timestampRevived > -1 && timestampRevived > this.timestampDefeated) {
            this.timeSpentDefeated += timestampRevived - this.timestampDefeated; 
        }
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
    getProtegoPowerAfterModifications(enemy: Enemy) {
        return this.stats.protegoPower;
    }
    getAccuracyAfterModifications(enemy: Enemy) {
        return this.stats.accuracy;
    }

    // Potions, magizoologist bravery charm:
    // Source: https://www.reddit.com/r/harrypotterwu/comments/csgsdd/all_about_combat_damage_what_i_know_or_i_think_i/?st=k0gijz3i&sh=acd204fd
    getDamageBuffMultiplier(enemy: Enemy) {   
        return 1 + 
               this.getExstimuloDamageBuff() +
               this.getWitSharpeningDamageBuff(enemy) + 
               //this.exstimuloPotionDamageBuff + 
               //this.witSharpeningPotionDamageBuff + 
               (enemy.isElite ? this.braveryCharmValue : 0);
    }
    

    performAttackCast(damage: number, isCritical: boolean, isDodge: boolean, enemy: Enemy): void {
        this.decreasePotionUsesRemaining(); 

        // Stats
        this.totalDamage += damage; 
        this.numberAttackCasts++;
        if (isCritical) this.numberCriticalCasts++;
        if (isDodge) this.numberDodgedCasts++;
        this.incrementNumberEnhancementsDuringAttacks(this.getNumberOfEnhancements(enemy)); 
        this.incrementNumberImpairmentsDuringAttacks(enemy.getNumberOfImpairments()); 
    }

    decreasePotionUsesRemaining(): void {
        // Exstimulo potion
        if (this.exstimuloPotionUsesRemaining > 0) {
            this.exstimuloPotionUsesRemaining--;
        }
        if (this.exstimuloPotionUsesRemaining === 0) {
            // Potion used up
            this.exstimuloPotionDamageBuff = 0;
        }
        // Wit sharpening potion
        if (this.witSharpeningPotionUsesRemaining > 0) {
            this.witSharpeningPotionUsesRemaining--;
        }
        if (this.witSharpeningPotionUsesRemaining === 0) {
            // Potion used up
            this.witSharpeningPotionDamageBuff = 0;
        }
    }

    resetPotionUsesRemaining(): void {
        this.exstimuloPotionUsesRemaining = 0;
        this.exstimuloPotionDamageBuff = 0;
        this.witSharpeningPotionUsesRemaining = 0;
        this.witSharpeningPotionDamageBuff = 0;
    }

    applyExstimuloPotion(potionUses: number, damageBuff: number) {
        this.exstimuloPotionUsesRemaining = potionUses; 
        this.exstimuloPotionDamageBuff = damageBuff; 
    }

    applyWitSharpeningPotion(potionUses: number, damageBuff: number) {
        this.witSharpeningPotionUsesRemaining = potionUses; 
        this.witSharpeningPotionDamageBuff = damageBuff; 
    }

    getExstimuloDamageBuff(): number {
        return this.exstimuloPotionDamageBuff;
    }
    getExstimuloUsesRemaining(): number {
        return this.exstimuloPotionUsesRemaining; 
    }

    isWitSharpeningBuffActive(): boolean {
        return this.getWitSharpeningUsesRemaining() > 0; 
    }
    getWitSharpeningDamageBuff(enemy: Enemy): number {
        if (enemy.isElite === true) {
            return this.witSharpeningPotionDamageBuff;
        }
        else {
            return 0; 
        }
    }
    getWitSharpeningUsesRemaining(): number {
        return this.witSharpeningPotionUsesRemaining
    }

    receiveAttack(damage: number, enemy: Enemy) {
        this.totalDamageReceived += damage; 
        this.numberAttacksReceived++; 
        this.incrementNumberEnhancementsDuringAttacksReceived(this.getNumberOfEnhancements(enemy)); 
        this.incrementNumberImpairmentsDuringAttacksReceived(enemy.getNumberOfImpairments()); 
    }

    incrementNumberEnhancementsDuringAttacks(nEnhancements: number): void {
        this.numberEnhancementsDuringAttacks[nEnhancements]++; 
    }
    incrementNumberImpairmentsDuringAttacks(nImpairments: number): void {
        this.numberImpairmentsDuringAttacks[nImpairments]++; 
    }
    incrementNumberEnhancementsDuringAttacksReceived(nEnhancements: number): void {
        this.numberEnhancementsDuringAttacksReceived[nEnhancements]++; 
    }
    incrementNumberImpairmentsDuringAttacksReceived(nImpairments: number): void {
        this.numberImpairmentsDuringAttacksReceived[nImpairments]++; 
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
               ((this.getExstimuloDamageBuff() > 0 || this.getWitSharpeningDamageBuff(enemy) > 0) ? 1 : 0) +
               // Potions from outside combat count too
               (this.hasBaruffiosBrainElixir() ? 1 : 0) + 
               (this.hasTonicForTraceDetection() ? 1 : 0)
               ; 
    }

    setPotions(potions: PotionAvailabilityParameters) {
        this.potionsAtBeginning = JSON.parse(JSON.stringify(potions)); 
        this.potions = potions; 
    }
    getPotions(): PotionAvailabilityParameters {
        return this.potions!; 
    }
    getPotionsAtBeginning(): PotionAvailabilityParameters {
        return this.potionsAtBeginning!;
    }
    getPotionsUsed(): PotionAvailabilityParameters {
        // Diff between original potions and new potions
        return {
            nHealingPotionsAvailable: this.potionsAtBeginning!.nHealingPotionsAvailable - this.getPotions().nHealingPotionsAvailable,

            nWeakInvigorationAvailable: this.potionsAtBeginning!.nWeakInvigorationAvailable - this.getPotions().nWeakInvigorationAvailable,
            nStrongInvigorationAvailable: this.potionsAtBeginning!.nStrongInvigorationAvailable - this.getPotions().nStrongInvigorationAvailable,
        
            nExstimuloAvailable: this.potionsAtBeginning!.nExstimuloAvailable - this.getPotions().nExstimuloAvailable,
            nStrongExstimuloAvailable: this.potionsAtBeginning!.nStrongExstimuloAvailable - this.getPotions().nStrongExstimuloAvailable,
            nPotentExstimuloAvailable: this.potionsAtBeginning!.nPotentExstimuloAvailable - this.getPotions().nPotentExstimuloAvailable,
        
            nWitSharpeningAvailable: this.potionsAtBeginning!.nWitSharpeningAvailable - this.getPotions().nWitSharpeningAvailable,
        
            // Buffs (outside combat)
            hasBaruffiosBrainElixir: this.potionsAtBeginning!.hasBaruffiosBrainElixir,
            hasTonicForTraceDetection: this.potionsAtBeginning!.hasTonicForTraceDetection
        }
    }
    getPotionsUsedBrewTime(useMasterNotes: boolean): number {
        return Wizard.getPotionsBrewTime(this.getPotionsUsed(), useMasterNotes); 
    }

    hasBaruffiosBrainElixir(): boolean {
        return this.potions!.hasBaruffiosBrainElixir; 
    }
    hasTonicForTraceDetection(): boolean {
        return this.potions!.hasTonicForTraceDetection; 
    }

    toUserFriendlyDescription(): string {
        return this.nameClassUserFriendly + " (id=" + this.playerIndex + ")"; 
    }

    abstract isProficientAgainst(enemy: Enemy): boolean;

    isValidAction(actionName: actionNameType, facts: ruleFactType, targetWizardIndex?: number, targetEnemyIndex?: number): boolean {
        // check potions
        switch (actionName) {
            case "potentExstimuloPotion": if (this.potions!.nPotentExstimuloAvailable === 0 || this.inCombat === false) return false; break; 
            case "strongExstimuloPotion": if (this.potions!.nStrongExstimuloAvailable === 0 || this.inCombat === false) return false; break; 
            case "exstimuloPotion": if (this.potions!.nExstimuloAvailable === 0 || this.inCombat === false) return false; break; 
            case "healthPotion": if (this.potions!.nHealingPotionsAvailable === 0) return false; break; 
            case "strongInvigorationPotion": if (this.potions!.nStrongInvigorationAvailable === 0) return false; break; 
            case "weakInvigorationPotion": if (this.potions!.nWeakInvigorationAvailable === 0) return false; break; 
            case "witSharpeningPotion": if (this.potions!.nWitSharpeningAvailable === 0 || this.inCombat === false) return false; break; 
        }
        // Check inCombat
        if (this.inCombat === false) {
            switch (actionName) {
                case "combatSpellCastWizard": return false; break; 
                case "exitCombat": return false; break; 
                case "enterCombat": 
                    // Check if we are allowed to enter combat with this particular enemy
                    if (targetEnemyIndex !== undefined) {
                        let targetEnemy = facts.allActiveEnemies.filter((enemy) => enemy.enemyIndex === targetEnemyIndex)[0];
                        if (targetEnemy !== undefined) {
                            if (targetEnemy.inCombat === true) {
                                return false; 
                            }
                        }
                    }
                //case "noAction": return false; break; 
            }
            if (this.isActionStrategicSpell(actionName) && 
                (this.isValidStrategicSpell(actionName as strategicSpellNameType) === false 
                    || this.canCastStrategicSpell(actionName as strategicSpellNameType, facts, targetWizardIndex, targetEnemyIndex) === false)) return false; 
        }
        if (this.inCombat === true) {
            switch (actionName) {
                //case "enterCombatWithHighestPriorityAvailableEnemy": return false; break; 
                case "enterCombat": return false; break; 
            }
            if (this.isActionStrategicSpell(actionName)) return false; 
        }

        return true; 
    }
    protected abstract canCastStrategicSpell(strategicSpellName: strategicSpellNameType, facts: ruleFactType, targetWizardIndex?: number, targetEnemyIndex?: number): boolean; 
    protected abstract isValidStrategicSpell(strategicSpellName: strategicSpellNameType): boolean; 

    isActionStrategicSpell(actionName: actionNameType) {
        return Object.keys(focusCostData).indexOf(actionName) > -1; 
    }

    static getPotionsBrewTime(potions: PotionAvailabilityParameters, useMasterNotes: boolean): number {
        let hours = potions.nExstimuloAvailable * potionsBrewTime.exstimuloPotion +
            potions.nStrongExstimuloAvailable * potionsBrewTime.strongExstimuloPotion +
            potions.nPotentExstimuloAvailable * potionsBrewTime.potentExstimuloPotion +
            potions.nHealingPotionsAvailable * potionsBrewTime.healthPotion +
            potions.nWeakInvigorationAvailable * potionsBrewTime.weakInvigorationPotion +
            potions.nStrongInvigorationAvailable * potionsBrewTime.strongInvigorationPotion +
            potions.nWitSharpeningAvailable * potionsBrewTime.witSharpeningPotion;

        if (useMasterNotes === true) {
            hours *= potionsBrewTime.masterNotesDecrease; 
        }
        return hours;
    }

}