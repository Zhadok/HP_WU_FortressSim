import {Enemy} from "./enemies/Enemy";
import fortressDifficultyData from "../../data/fortressDifficulties.json";
import fortressRewardData from "../../data/fortressRewards.json"; 
import { enemyNameType, nameClassType } from "../../types";
import { EnemyGenerator } from "./enemies/EnemyGenerator";
import Prando from "prando";
import { CombatSimulationParameters } from "../../sim/CombatSimulationParameters";

export class FortressRoom {

    // data source: https://wizardsunitehub.info/wiki/fortress/#Fortress_floors_time_limits_minimum_level_base_rating_chart

    readonly runestoneLevels: Array<number>; // Currently: 1-5
    readonly nameClasses: Array<nameClassType>; 
    readonly roomLevel: number; // Currently: 1-20 (1=ruins I, 6=Tower I)
    readonly playerCount: number; // 1-5 players allowed
    readonly overallDifficulty: number; // Function of player count, room level and runestone levels used
    readonly focusBudget: number; // Function of room level
    readonly maxtime: number; // e.g. 5 minutes at Ruins I, 8 minutes in tower X and so on
    readonly knockoutTime: number; // starts with 30s at Ruins I, 68s at Dark Chamber V

    readonly enemiesAll: Array<Enemy>;
    readonly enemiesActive: Array<Enemy> = [];

    constructor(params: CombatSimulationParameters, 
        rng: Prando) {
        this.runestoneLevels = params.runestoneLevels;
        this.nameClasses = params.nameClasses; 
        this.roomLevel = params.roomLevel;
        this.playerCount = params.runestoneLevels.length;

        this.overallDifficulty = this.computeOverallDifficulty();
        this.focusBudget = this.computeFocusBudget();
        this.maxtime = this.computeMaxtime();
        this.knockoutTime = this.computeKnockoutTime();

        this.enemiesAll = this.generateEnemies(rng);
    };

    addEnemyToActive(enemy: Enemy) {
        if (this.enemiesActive.indexOf(enemy) === -1) {
            this.enemiesActive.push(enemy);
        }
        else {
            throw new Error("Tried adding already active enemy to active enemy array!");
        }
    }
    removeEnemyFromActive(enemyParam: Enemy) {
        let indexToRemove = -1;
        for (let i=0;i<this.enemiesActive.length;i++) {
            if (this.enemiesActive[i].enemyIndex === enemyParam.enemyIndex) {
                indexToRemove = i;
            }
        }
        if (indexToRemove === -1) {
            throw new Error("Attempted to remove active enemy which was not active! (enemy not found in active array)");
        }
        this.enemiesActive.splice(indexToRemove, 1);
    }

    // Which enemy will be the next to be active?
    hasNextActiveEnemy(): boolean {
        for (let enemy of this.enemiesAll) {
            if (enemy.isActive == false && enemy.getIsDefeated() == false) {
                return true;
            }
        }
        return false;
    }
    getNextActiveEnemy(skip?: number): Enemy {
        if (skip === undefined) {
            skip = 0; 
        }
        for (let i=skip; i<this.enemiesAll.length; i++) {
            let enemy = this.enemiesAll[i]; 
            if (enemy.isActive == false && enemy.getIsDefeated() == false) {
                return enemy;
            }
        }
        throw new Error("Tried getting active enemy but all enemies either already active or already defeated")
    }
    areAllEnemiesDefeated(): boolean {
        for (let enemy of this.enemiesAll) {
            if (enemy.getIsDefeated() === false) {
                return false;
            }
        }
        return true; 
    }
    getRemainingEnemiesCount(): number {
        let result = 0; 
        for (let enemy of this.enemiesAll) {
            if (enemy.getIsDefeated() === false) {
                result++; 
            }
        }
        return result; 
    }



    // More research needed: 3 for 1 player, 6 for 2 players, ...?
    getMaxNumberOfActiveEnemies(): number {
        return this.runestoneLevels.length * 3;
    }

    generateEnemies(rng: Prando): Array<Enemy> {
        return EnemyGenerator
                .buildEnemyGeneratorWithRng(rng)
                .generateEnemies(this.overallDifficulty, this.focusBudget, this.playerCount, this.roomLevel, this.runestoneLevels, this.nameClasses);
    }

    // How much focus can we divide among enemies?
    // Source: https://www.reddit.com/r/harrypotterwu/comments/ci9mux/each_fortress_floor_awards_a_different_amount_of/?st=k06fkamr&sh=1eba4c0f
    // This is HIGHLY LIKELY indepedent of team size
    computeFocusBudget(): number {
        switch (this.roomLevel) {
            case 1: return 4;
            case 2: return 5;
            case 3: return 6;
            case 4: return 7;
            case 5: return 8;
            case 6: return 8;
            case 7: return 9;
            case 8: return 10;
            case 9: return 11;
            case 10: return 12;
            case 11: return 12;
            case 12: return 13;
            case 13: return 14;
            case 14: return 15;
            case 15: return 16;
            case 16: return 16;
            case 17: return 17;
            case 18: return 18;
            case 19: return 19;
            case 20: return 20;
        }

        return -1;
    }

    // Sources: 
    // https://www.reddit.com/r/WizardsUnite/comments/cluyg5/fortress_difficulty_visualized/?st=k06wsl42&sh=6415c2a4
    // https://docs.google.com/spreadsheets/d/1jtBjdncxspRt51K048islZdEPTZ06yBKuZX7_MBzprI/edit#gid=0
    // NOTE: Currently unknown how difficulty scales with different levels of runestones
    // so currently interface will ONLY use first runestone in array
    static computeOverallDifficultyStatic(roomLevel: number, runestoneLevel: number, playerCount: number): number {
        
        // Strangely, difficulty is rounded (see data on videos) and notes in tests
        return Math.round(fortressDifficultyData.runestoneDifficulties[roomLevel-1][runestoneLevel-1] * 
               fortressDifficultyData.playerCountMultipliers[roomLevel-1][playerCount-1] * playerCount);

    }

    computeOverallDifficulty(): number {
        const playerCount = this.runestoneLevels.length;
        const runestoneLevel = this.runestoneLevels[0];
        return FortressRoom.computeOverallDifficultyStatic(this.roomLevel, runestoneLevel, playerCount);
    }

    computeMaxtime(): number {
        return FortressRoom.computeMaxtimeStatic(this.roomLevel); 
    }

    static computeMaxtimeStatic(roomLevel: number): number {
        switch(roomLevel) {
            case 1: return 300;
            case 2: return 300;
            case 3: return 300;
            case 4: return 360;
            case 5: return 360;
            case 6: return 360;
            case 7: return 420;
            case 8: return 420;
            case 9: return 420;
            case 10: return 480;
            case 11: return 480;
            case 12: return 480;
            case 13: return 540;
            case 14: return 540;
            case 15: return 540;
            case 16: return 600;
            case 17: return 600;
            case 18: return 600;
            case 19: return 600;
            case 20: return 600;
        }
        return -1;
    }


    computeKnockoutTime(): number {
        return FortressRoom.computeKnockoutTimeStatic(this.roomLevel);
    }

    static computeKnockoutTimeStatic(roomLevel: number): number {
        return 1000 * (30+(roomLevel-1)*2);
    }

    computeChallengeXPRewards(isWin: boolean, isSponsoredFortress?: boolean): number[] {
        return FortressRoom.computeChallengeXPRewardsStatic(this.roomLevel, this.runestoneLevels, isWin, isSponsoredFortress); 
    }    

    // https://i.redd.it/wz2vwfh5u4k31.jpg
    static computeChallengeXPRewardsStatic(roomLevel: number, runestoneLevels: number[], isWin: boolean, isSponsoredFortress?: boolean): number[] {
        let baseXP = fortressRewardData.data.baseXP[roomLevel-1]; 
        let rewards: number[] = []; 
        let nWizards = runestoneLevels.length;
        let friendBonus = fortressRewardData.data.friendsBonus[nWizards-1]; 
        let groupBonus = fortressRewardData.data.groupBonus[nWizards-1];  
        // Assumes all wizards in group are friends
        for (let runestoneLevel of runestoneLevels) {
            let xp = (baseXP * runestoneLevel) + baseXP * (friendBonus + groupBonus); 
            if (isWin === false) {
                xp *= 0.1; 
            }
            if (isSponsoredFortress === true) {
                xp *= 1 + fortressRewardData.sponsoredFortressRewardsChallengeXPIncrease; 
            }
            rewards.push(Math.round(xp)); 
        }
        return rewards;
    }

    getEnergyReward(isSponsoredFortress: boolean): number {
        return FortressRoom.getEnergyRewardStatic(this.roomLevel, isSponsoredFortress); 
    }

    static getEnergyRewardStatic(roomLevel: number, isSponsoredFortress: boolean) {
        if (isSponsoredFortress === false || isSponsoredFortress === undefined || isSponsoredFortress === null) {
            return 0; 
        }
        else {
            return Math.ceil(roomLevel / 2); 
        }
    }

    // Elites count as double 
    getNEnemiesElitesCountDouble(): number {
        return this.enemiesAll.length + this.enemiesAll.filter(enemy => enemy.isElite).length;
    }

    describeRoom(): void {
        console.log("Room level: " + this.roomLevel + ", runestoneLevels: " + this.runestoneLevels);
        EnemyGenerator.describeEnemies(this.enemiesAll);
    }


}
