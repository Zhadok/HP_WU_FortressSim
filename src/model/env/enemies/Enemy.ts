import enemyConfig from "../../../data/enemyStatsConfig.json";
import enemyData from "../../../data/enemies.json";
import { Combatant } from "../../Combatant";
import { EnemyStats } from "./EnemyStats";
import { enemyNameType } from "../../../types.js";
import { Wizard } from "../../player/Wizard";
import { Magizoologist } from "../../player/Magizoologist";
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

    static buildDemoEnemy(): Enemy {
        return Enemy.buildEnemy("acromantula", 0, false, 3, 50, 3); 
    }

    toUserFriendlyDescription(): string {
        let eliteString = this.isElite ? "elite " : "";  
        let starString = "";
        for (let i=0; i<this.difficulty; i++) starString += "★"; 
        return this.nameUserFriendly + " (" + eliteString + this.level + " " + 
                starString + ", id=" + this.enemyIndex + ")"; 
    }
}