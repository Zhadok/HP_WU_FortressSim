import { Enemy } from "./Enemy";

import { enemyNameType, nameClassType } from "../../../types";
import { firstBy } from "thenby";
import Prando from "prando";
import { Logger } from "../../../util/Logger";

export class EnemyGenerator {

    readonly eliteProbability = 0.10; // Each enemy has a 10% chance to be elite (and then counts for 2)
    readonly rng: Prando;  
    readonly proficiencyMap: { [key in nameClassType]: Array<enemyNameType>} = {
        "auror": ["darkWizard", "deathEater"],
        "magizoologist": ["acromantula", "erkling"],
        "professor": ["pixie", "werewolf"]
    };
    readonly inproficiencyMap: { [key in nameClassType]: Array<enemyNameType>} = {
        "auror": ["acromantula", "erkling", "pixie", "werewolf"],
        "magizoologist": ["darkWizard", "deathEater", "pixie", "werewolf"],
        "professor": ["acromantula", "darkWizard", "deathEater", "erkling"]
    };

    private constructor(rng: Prando) {
        this.rng = rng;
        this.rng.skip(100);
    }

    static buildEnemyGeneratorWithRng(rng: Prando): EnemyGenerator {
        return new EnemyGenerator(rng);
    }
    static buildEnemyGenerator(): EnemyGenerator {
        return new EnemyGenerator(new Prando(0));
    }

    // returns value between -0.5 and 0.5
    jitter(): number {
        return this.jitterByAmount(1); 
    }
    jitterByAmount(magnitude: number): number {
        // Center should be 0
        return (this.rng.next() - 0.5) * magnitude; 
    }

    getNEnemies(overallDifficulty: number, roomLevel: number, playerCount: number): number {
        const averageNEnemies = 1.72132702158096 + 0.0661370810873348 * Math.sqrt(overallDifficulty);  // sqrt of overallDifficulty 
        //console.log("averageNEnemies for roomLevel=" + roomLevel + ": " + averageNEnemies);
        // Concrete nEnemies for this room (can vary by +-1)
        // Example: Tower V has been seen with 4, 5 and 6 enemies for 1 player
        // Average is 4.999, so jitter by 2 (==> +-1)
        let nEnemies = Math.round(averageNEnemies + this.jitterByAmount(2)); 
        if (roomLevel === 1) {
            nEnemies = 2 * playerCount;  // Always use 2 enemies per player for ruins I
        }
        return nEnemies;
    }

    getAverageEnemyLevel(roomLevel: number, averageRunestoneLevel: number): number {
        //let averageEnemyLevel = -11.2882802691465 + 0.865920623399864 * averageRunestoneLevel + 9.85336218225852 * roomLevel;
        // Seems like this might be the simplest answer, except for ruins I
        // -3 because jitter later does +-3
        let averageEnemyLevel = -13 + averageRunestoneLevel + 10 * roomLevel; 
        if (roomLevel === 1) {
            averageEnemyLevel = 3; // Ruins 1 has higher average so we push between 1 and 5 (later we jitter by +-2)
        }
        return averageEnemyLevel;
    }

    getAverageProficiency(roomLevel: number) {
        const averageProficiency = 0.703789438124907 -0.0196579934802149 * roomLevel;
        return averageProficiency;
    }
    getEnemyType(averageProficiency: number, nameClass: nameClassType): enemyNameType {
        // You should be proficient roughly against averageProficiency percentage of enemies
        let shouldBeProficient = this.rng.next() >= (1-averageProficiency);
        if (shouldBeProficient === true) {
            return this.proficiencyMap[nameClass][Math.floor(this.rng.next() * 2)]; // array.length = 2
        }
        else {
            return this.inproficiencyMap[nameClass][Math.floor(this.rng.next() * 4)]; //array.length = 4
        }
    }

    // Difficulty budget per enemy: This value has a multiplier
    // difficulty = multiplier * nEnemies * (level * enemyDifficulty * (1+isElite)))
    // difficultyBudgetPerEnemy = (level * enemyDifficulty * (1+isElite))
    // difficultyBudgetPerEnemy = difficulty / (multiplier * nEnemies)
    getNormalizedDifficultyBudgetPerEnemy(overallDifficulty: number, roomLevel: number, nEnemiesRemaining: number): number {
        const difficultyBudgetPerEnemyMultiplier = 2.20611936028795 + 10.1673379263563 * Math.exp(-roomLevel); 
        const normalizedDifficultyBudgetPerEnemy = overallDifficulty / (difficultyBudgetPerEnemyMultiplier * nEnemiesRemaining); 
        return normalizedDifficultyBudgetPerEnemy;
    }

    // Concrete enemy difficulty for one enemy (number of stars)
    getEnemyDifficulty(normalizedDifficultyBudgetPerEnemy: number, enemyLevel: number, roomLevel: number): number {
        if (roomLevel === 1) {
            return 1; // Hard code this since ruins I are only difficulty 1
        }
        let enemyDifficulty = Math.max(1, Math.round( normalizedDifficultyBudgetPerEnemy / enemyLevel + this.jitterByAmount(2) ));
        return Math.min(enemyDifficulty, 5);
    }

   

    generateEnemies(overallDifficulty: number, focusBudget: number, playerCount: number, 
        roomLevel: number, runestoneLevels: Array<number>, nameClasses: Array<nameClassType>): Array<Enemy> {
        let result: Array<Enemy> = [];
        let nEnemiesRemaining = this.getNEnemies(overallDifficulty, roomLevel, playerCount);
        const normalizedDifficultyBudgetPerEnemy = this.getNormalizedDifficultyBudgetPerEnemy(overallDifficulty, roomLevel, nEnemiesRemaining);
        
        // Unknown if average runestone level should be used here
        const averageRunestoneLevel = runestoneLevels.reduce((a, b) => ( a += b)) / runestoneLevels.length;
        const averageEnemyLevel = this.getAverageEnemyLevel(roomLevel, averageRunestoneLevel);
        const averageProficiency = this.getAverageProficiency(roomLevel); 

        Logger.log(2, "Generating enemies for room with following parameters:");
        Logger.log(2, "Room level: " + roomLevel + 
                      ", average runestone level: " + averageRunestoneLevel + 
                      ", number of enemies: " + nEnemiesRemaining + 
                      ", average enemy level: " + averageEnemyLevel + 
                      ", difficulty budget per enemy: " + normalizedDifficultyBudgetPerEnemy);
        let enemyIndex = 0;
        let enemyParams = []; 
        while (nEnemiesRemaining > 0) {
            const isElite = (this.rng.next() >= (1-this.eliteProbability) && nEnemiesRemaining >= 2 && roomLevel >= 4);
            if (isElite) {
                nEnemiesRemaining--; // Count elite as extra
            }

            // for example for ruins I seen level between 1 and 5 (so jitter by 4 or +-2), in tower V seen +-3
            let jitterAmount = (roomLevel === 1) ? 4 : 6; 
            const enemyLevel = Math.round(averageEnemyLevel + this.jitterByAmount(jitterAmount)); 

            // difficultyBudget for this enemy is: level * enemyDifficulty
            let enemyDifficulty = this.getEnemyDifficulty(normalizedDifficultyBudgetPerEnemy, enemyLevel, roomLevel);

            // First approach for proficiency: Allow each player in turn to get a chance to get a proficient enemy or not
            let proficiencyPlayerIndex = 0;
            let type = this.getEnemyType(averageProficiency, nameClasses[proficiencyPlayerIndex % playerCount]);
            proficiencyPlayerIndex++;

            let enemyParam = {
                type: type, 
                enemyIndex: enemyIndex, 
                isElite: isElite, 
                difficulty: enemyDifficulty, 
                level: enemyLevel
            }
            Logger.log(2, "Generating enemy: " + JSON.stringify(enemyParam));
            enemyParams.push(enemyParam);
            enemyIndex++; 
            nEnemiesRemaining--; 
        }   

        let focusBudgets = this.getFocusRewards(enemyParams.length, focusBudget);

        for (let i=0;i<enemyParams.length;i++) {
            //console.log(enemyParams[i]);
            let enemy = Enemy.buildEnemy(enemyParams[i].type as enemyNameType, 
                enemyParams[i].enemyIndex, enemyParams[i].isElite, enemyParams[i].difficulty, 
                enemyParams[i].level, focusBudgets[i]);
            result.push(enemy);
        }

       

        //result.push(Enemy.buildEnemy("acromantula", 0, false, 2, 150, 3));
        //result.push(Enemy.buildEnemy("pixie", 1, false, 2, 150, 3));

        return result;
    }

    getFocusRewards(nEnemies: number, totalBudget: number): Array<number> {
        // Split total focus budget into budget per enemy 
        // example: 10 -> 3, 3, 2, 2
        let result: Array<number> = [];
        let focusPerEnemy = totalBudget / nEnemies; // 2.5
        let remainingTotalBudget = totalBudget; // 10
        for (let i=0;i<nEnemies;i++) {
            var ceilFocus = Math.ceil(focusPerEnemy);
            var floorFocus = Math.floor(focusPerEnemy);

            let chosenValue; 
            if (remainingTotalBudget / floorFocus === nEnemies-i ) {
                // If rest of focus budget can be filled by floor value then use that
                // Example: 
                // 10 / 2 = 4? NO
                //  7 / 2 = 3? NO
                //  4 / 2 = 2? YES
                //  2 / 2 = 1? YES
                chosenValue = floorFocus;
            }
            else {
                chosenValue = ceilFocus;
            }
            remainingTotalBudget -= chosenValue; 
            result.push(chosenValue);
        }
        return result;
    }

    static describeEnemies(enemies: Enemy[]): void {
        console.log("Number of enemies: " + enemies.length + " (" +  enemies.filter(enemy => enemy.isElite).length + " elites)");
        
        let minLevel = Math.min(...enemies.map(enemy => enemy.level));
        let sumLevel = enemies.map(enemy => enemy.level).reduce((previous, current) => current += previous);
        let maxLevel = Math.max(...enemies.map(enemy => enemy.level));

        let minDifficulty = Math.min(...enemies.map(enemy => enemy.difficulty));
        let sumDifficulty = enemies.map(enemy => enemy.difficulty).reduce((previous, current) => current += previous);
        let maxDifficulty = Math.max(...enemies.map(enemy => enemy.difficulty));
        
        console.log("Average enemy level: " + sumLevel/enemies.length + " (min: " + minLevel + ", max: " + maxLevel + ")");
        console.log("Average enemy difficulty: " + sumDifficulty/enemies.length + " (min: " + minDifficulty + ", max: " + maxDifficulty + ")");

    }

    // Overall difficulty could be divided like this:
    // 2 * sum(EnemyStars * EnemyLevel * (1 + IsElite))
    // Factor 2 is inaccurate for rooms below level 11
    // Source: https://www.reddit.com/r/harrypotterwu/comments/csgsdd/all_about_combat_damage_what_i_know_or_i_think_i/?st=k0gijz3i&sh=acd204fd
    

}
