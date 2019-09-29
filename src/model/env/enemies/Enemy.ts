import enemyConfig from "../../../data/enemyStatsConfig.json";
import enemyData from "../../../data/enemies.json";
import { Combatant } from "../../Combatant";
import { EnemyStats } from "./EnemyStats";
import { enemyNameType } from "../../../types.js";
import { Wizard } from "../../player/Wizard";
import { Magizoologist } from "../../player/Magizoloogist";
import { Auror } from "../../player/Auror";
import { Professor } from "../../player/Professor";



export class Enemy extends Combatant {

    readonly name: enemyNameType; // e.g. "darkWizard"
    readonly nameUserFriendly: string; // e.g. "Dark Wizard"
    readonly enemyIndex: number;

    // How many stars? E.g. "common", "formidable", "Imposing", "Dangerous", "Fierce"
    readonly difficulty: number; 
    readonly level: number;
    readonly isElite: boolean;
    readonly stats: EnemyStats;
    readonly focusReward: number; // between 1 and 4

    isActive: boolean = false; // Is it visible in room?
    inCombatWith: Combatant | null = null; // Who is it currently fighting?

    // Auror
    hasConfusionHex: boolean = false;
    confusionHexValue: number = 0; // e.g., defence - 10% if value here is 0.1
    hasWeakeningHex: boolean = false;
    weakeningHexValue: number = 0; // e.g., power -30% if value here is 0.3


    // Professor
    hasDeteriorationHex: boolean = false;
    deteriorationHexDamage: number = 0;

    // Potions are applied against an enemy, not of the wizard
    // Each player can use a potion against an enemy...
    // Exstimulo potion
    exstimuloPotionUsesRemaining: number[] = [];
    exstimuloPotionDamageBuff: number[] = [];

    // Wit sharpening potion
    witSharpeningPotionUsesRemaining: number[] = [];
    witSharpeningPotionDamageBuff: number[] = [];


    constructor(
        name: enemyNameType,
        nameUserFriendly: string,
        enemyIndex: number, 
        stats: EnemyStats,
        difficulty: number,
        level: number,
        isElite: boolean,
        focusReward: number) {
        super(stats.stamina);

        this.name = name;
        this.nameUserFriendly = nameUserFriendly;
        this.enemyIndex = enemyIndex;
        this.stats = stats;
        this.difficulty = difficulty;
        this.level = level;
        this.isElite = isElite;
        this.focusReward = focusReward;
    }

    getNumberOfImpairments(): number {
        return (this.hasConfusionHex ? 1 : 0) +
               (this.hasWeakeningHex ? 1 : 0) + 
               (this.hasDeteriorationHex ? 1 : 0);
    }


    decreasePotionUsesRemaining(playerIndex: number): void {
        // Exstimulo potion
        if (this.exstimuloPotionUsesRemaining[playerIndex] > 0) {
            this.exstimuloPotionUsesRemaining[playerIndex]--;
        }
        if (this.exstimuloPotionUsesRemaining[playerIndex] === 0) {
            this.exstimuloPotionDamageBuff[playerIndex] = 0;
        }
        // Wit sharpening potion
        if (this.witSharpeningPotionUsesRemaining[playerIndex] > 0) {
            this.witSharpeningPotionUsesRemaining[playerIndex];
        }
        if (this.witSharpeningPotionUsesRemaining[playerIndex] === 0) {
            this.witSharpeningPotionDamageBuff[playerIndex] = 0;
        }
    }

    resetPotionUsesRemaining(playerIndex: number): void {
        this.exstimuloPotionUsesRemaining[playerIndex] = 0;
        this.exstimuloPotionDamageBuff[playerIndex] = 0;
        this.witSharpeningPotionUsesRemaining[playerIndex] = 0;
        this.witSharpeningPotionDamageBuff[playerIndex] = 0;
    }

    applyExstimuloPotion(playerIndex: number, potionUses: number, damageBuff: number) {
        this.exstimuloPotionUsesRemaining[playerIndex] = potionUses; 
        this.exstimuloPotionDamageBuff[playerIndex] = damageBuff; 
    }
    applyWitSharpeningPotion(playerIndex: number, potionUses: number, damageBuff: number) {
        this.witSharpeningPotionUsesRemaining[playerIndex] = potionUses; 
        this.witSharpeningPotionDamageBuff[playerIndex] = damageBuff; 
    }

    getExstimuloDamageBuff(playerIndex: number): number {
        if (this.exstimuloPotionDamageBuff[playerIndex] > 0) {
            return this.exstimuloPotionDamageBuff[playerIndex];
        }
        else {
            return 0; 
        }
    }
    getExstimuloUsesRemaining(playerIndex: number): number {
        if (this.exstimuloPotionUsesRemaining[playerIndex] > 0) {
            return this.exstimuloPotionUsesRemaining[playerIndex];
        }
        else {
            return 0; 
        }
    }
    getWitSharpeningDamageBuff(playerIndex: number): number {
        if (this.witSharpeningPotionDamageBuff[playerIndex] > 0) {
            return this.witSharpeningPotionDamageBuff[playerIndex];
        }
        else {
            return 0; 
        }
    }
    getWitSharpeningUsesRemaining(playerIndex: number): number {
        if (this.witSharpeningPotionUsesRemaining[playerIndex] > 0) {
            return this.witSharpeningPotionUsesRemaining[playerIndex];
        }
        else {
            return 0; 
        }
    }
    
    getDefenceAfterModifications(): number {
        return Math.max(0, this.stats.defence - this.confusionHexValue);
    }

    getDeficiencyDefenceAfterModifications(): number {
        return this.stats.deficiencyDefence;
    }

    getPowerAfterModifications(): number {
        return this.stats.power * (1 - this.weakeningHexValue);
    }

    getProficiencyPowerAfterModifications(): number {
        return this.stats.proficiencyPower;
    }

    getDefenceBreachAfterModifications(): number {
        return Math.max(0, this.stats.defenceBreach - this.confusionHexValue);
    }

    getDodgeAfterModifications(wizard: Wizard): number {
        return Math.max(0, this.stats.dodge - this.confusionHexValue);
    }

    isProficientAgainst(wizard: Wizard): boolean {
        if (wizard instanceof Auror && (this.name==="acromantula" || this.name=="erkling")) return true;
        if (wizard instanceof Magizoologist && (this.name==="pixie" || this.name==="werewolf")) return true;
        if (wizard instanceof Professor && (this.name==="darkWizard" || this.name==="deathEater")) return true;
        return false;
    }



    // Base stats need to be transformed to take into account actual level
    // See base stats for enemies values: https://jibsentertainment.com/2019/07/24/a-complete-and-comprehensive-guide-to-fortresses-and-wizarding-challenges/
    // See formula: https://wizardsunite.gamepress.gg/guide/combat-damage-formula 
    // See values for dodge, defence, etc:  https://i.redd.it/gpwf5k6f4ea31.png
    // See values for growth adjust: https://www.reddit.com/r/harrypotterwu/comments/csgsdd/all_about_combat_damage_what_i_know_or_i_think_i/?st=k0gijz3i&sh=acd204fd
    // TODO: Do we use Math.ceil properly here? 
    static buildEnemy(name: enemyNameType, enemyIndex: number, isElite: boolean, difficulty: number, level: number, focusReward: number): Enemy  {

        if (difficulty < 1 || difficulty > 5 || !difficulty) {
            throw new Error("Invalid value for enemy difficulty (should be between 1 and 5): " + difficulty);
        }
        if (level < 1 || !level) {
            throw new Error("Invalid value for level (should be greater 0): " + level);
        }
        var base: EnemyStats = enemyData[name].stats[difficulty-1][(isElite)?"elite":"normal"];
        var computedStats: EnemyStats = new EnemyStats(
            Math.floor(base.stamina * (1 + enemyConfig.growthAdjustStaminaPerLevel * level)), // The Math.floor is confirmed by video data
            base.defence,
            base.deficiencyDefence, 
            Math.floor(base.power * (1 + enemyConfig.growthAdjustPowerPerLevel * level)),
            base.proficiencyPower * (1 + enemyConfig.growthAdjustProficiencyPowerPerLevel * level),
            base.defenceBreach,
            base.dodge
        );
        //console.log("new enemy with base stamina=" + base.stamina + ",  stamina=" + computedStats.stamina + ", level=" + level);
            
        return new Enemy(
            name,
            enemyData[name].name,
            enemyIndex,
            computedStats,
            difficulty,
            level,
            isElite,
            focusReward
        );

    }

}