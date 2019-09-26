import { Enemy } from "./Enemy";

import { enemyNameType } from "../../../types";
import { firstBy } from "thenby";
import Prando from "prando";

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
        const averageEnemyLevel = -11.2882802691465 + 0.865920623399864 * averageRunestoneLevel + 9.85336218225852 * roomLevel
        const averageDifficulty = nEnemiesRemaining / averageEnemyLevel; 

        let enemyIndex = 0;
        let enemyParams = []; 
        while (nEnemiesRemaining > 0) {
            const isElite = (this.rng.next() >= this.eliteProbability && nEnemiesRemaining >= 2);
            if (isElite) {
                nEnemiesRemaining--; // Count elite as extra
            }

            // difficultyBudget for this enemy is: level * enemyDifficulty
            const level = Math.round(averageEnemyLevel + this.jitterByAmount(4)); // for example for ruins I seen level between 1 and 5
            const difficulty = Math.round( difficultyBudgetPerEnemy / level );
            enemyParams.push({
                type: "acromantula", 
                enemyIndex: enemyIndex, 
                isElite: isElite, 
                difficulty: difficulty, 
                level: level
            });
            enemyIndex++; 
        }   

        let focusBudgets = this.getFocusBudgets(enemyParams.length, focusBudget);

        for (let i=0;i<enemyParams.length;i++) {
            let enemy = Enemy.buildEnemy(enemyParams[i].type as enemyNameType, 
                enemyParams[i].enemyIndex, enemyParams[i].isElite, enemyParams[i].difficulty, 
                enemyParams[i].level, focusBudgets[i]);
            result.push(enemy);
        }

       

        result.push(Enemy.buildEnemy("acromantula", 0, false, 2, 150, 3));
        result.push(Enemy.buildEnemy("pixie", 1, false, 2, 150, 3));

        return result;
    }

    getFocusBudgets(nEnemies: number, totalBudget: number): Array<number> {
        // Split total focus budget into budget per enemy 
        // example: 10 -> 3, 3, 2, 2
        let result: Array<number> = [];
        let focusPerEnemy = totalBudget / nEnemies; // 2.5
        let remainingTotalBudget = totalBudget; // 10
        for (let i=0;i<nEnemies;i++) {
            var ceilFocus = Math.ceil(focusPerEnemy);
            var floorFocus = Math.floor(focusPerEnemy);

            let chosenValue; 
            if (totalBudget / floorFocus === focusPerEnemy) {
                // If rest of focus budget can be filled by floor value then use that
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
