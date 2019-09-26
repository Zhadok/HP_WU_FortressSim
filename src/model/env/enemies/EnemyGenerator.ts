import { Enemy } from "./Enemy";

import { enemyNameType } from "../../../types";
import { firstBy } from "thenby";
import Prando from "prando";
import { Logger } from "../../../util/Logger";

export class EnemyGenerator {

    readonly eliteProbability = 0.10; // Each enemy has a 10% chance to be elite (and then counts for 2)
    readonly rng: Prando;  

    private constructor(rng: Prando) {
        this.rng = rng;
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
        return this.rng.next() - 0.5 * magnitude; 
    }

    generateEnemies(overallDifficulty: number, focusBudget: number, playerCount: number, roomLevel: number, runestoneLevels: Array<number>): Array<Enemy> {
        let result: Array<Enemy> = [];

        const averageNEnemies = 1.72132702158096 + 0.0661370810873348 * Math.sqrt(overallDifficulty);  // sqrt of overallDifficulty 
        let nEnemiesRemaining = Math.round(averageNEnemies + this.jitter()); // Concrete nEnemies for this room
        
        // Difficulty budget per enemy: This value has a multiplier
        // difficulty = multiplier * nEnemies * (level * enemyDifficulty * (1+isElite)))
        // difficultyBudgetPerEnemy = (level * enemyDifficulty * (1+isElite))
        // difficultyBudgetPerEnemy = difficulty / (multiplier * nEnemies)
        const difficultyBudgetPerEnemyMultiplier = 2.20611936028795 + 10.1673379263563 * Math.exp(-roomLevel); 
        const difficultyBudgetPerEnemy = overallDifficulty / (difficultyBudgetPerEnemyMultiplier * nEnemiesRemaining); 

        // Unknown if average runestone level should be used here
        const averageRunestoneLevel = runestoneLevels.reduce((a, b) => ( a += b)) / runestoneLevels.length;
        //let averageEnemyLevel = -11.2882802691465 + 0.865920623399864 * averageRunestoneLevel + 9.85336218225852 * roomLevel;
        
        // Seems like this might be the simplest answer, except for ruins I
        // -3 because jitter later does +-3
        let averageEnemyLevel = -13 + averageRunestoneLevel + 10 * roomLevel; 
        
        if (roomLevel === 1) {
            averageEnemyLevel = 3; // Ruins 1 has higher average so that we push between 1 and 5
        }
        //const averageDifficulty = nEnemiesRemaining / averageEnemyLevel; 

        Logger.log(2, "Generating enemies for room with following parameters:");
        Logger.log(2, "Room level: " + roomLevel + 
                      ", average runestone level: " + averageRunestoneLevel + 
                      ", number of enemies: " + nEnemiesRemaining + 
                      ", average enemy level: " + averageEnemyLevel + 
                      ", difficulty budget per enemy: " + difficultyBudgetPerEnemy);
        let enemyIndex = 0;
        let enemyParams = []; 
        while (nEnemiesRemaining > 0) {
            const isElite = (this.rng.next() >= this.eliteProbability && nEnemiesRemaining >= 2);
            if (isElite) {
                nEnemiesRemaining--; // Count elite as extra
            }

            // difficultyBudget for this enemy is: level * enemyDifficulty
            const level = Math.ceil(averageEnemyLevel + this.jitterByAmount(6)); // for example for ruins I seen level between 1 and 5
            const difficulty = Math.round( difficultyBudgetPerEnemy / level );
            let enemyParam = {
                type: "acromantula", 
                enemyIndex: enemyIndex, 
                isElite: isElite, 
                difficulty: difficulty, 
                level: level
            }
            console.log("Generating enemy: " + JSON.stringify(enemyParam));
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

    describeEnemies(enemies: Enemy[]): void {
        console.log("Number of enemies: " + enemies.length);
        console.log("Number of elites: " + enemies.filter(enemy => enemy.isElite).length);
        
        let sumLevel = enemies.map(enemy => enemy.level).reduce((previous, current) => current += previous);
        let sumDifficulty = enemies.map(enemy => enemy.difficulty).reduce((previous, current) => current += previous);

        console.log("Average enemy level: " + sumLevel/enemies.length);
        console.log("Average enemy difficulty: " + sumDifficulty/enemies.length);

    }

    // Overall difficulty could be divided like this:
    // 2 * sum(EnemyStars * EnemyLevel * (1 + IsElite))
    // Factor 2 is inaccurate for rooms below level 11
    // Source: https://www.reddit.com/r/harrypotterwu/comments/csgsdd/all_about_combat_damage_what_i_know_or_i_think_i/?st=k0gijz3i&sh=acd204fd
    

}
