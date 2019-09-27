import { Enemy } from "../../../../src/model/env/enemies/Enemy";
import { expect } from 'chai';
import enemyData from "../../../../src/data/enemies.json";
import { enemyNameType } from "../../../../src/types";

import enemyStatsConfig from "../../../../src/data/enemyStatsConfig.json";
import { EnemyGenerator } from "../../../../src/model/env/enemies/EnemyGenerator";
import { TestData } from "../../../TestData";
import { FortressRoom } from "../../../../src/model/env/FortressRoom";
import Prando from "prando";
import { fail } from "assert";

describe("EnemyGenerator", function() {

    let enemyGenerator: EnemyGenerator;
    beforeEach(() => {
        enemyGenerator = EnemyGenerator.buildEnemyGeneratorWithRng(new Prando(0));
    });

    it("divideFocusBudget", function() {
        let budget = 10;
        let nEnemies = 4;

        let result = enemyGenerator.getFocusRewards(nEnemies, budget);

        expect(result.length).to.equal(nEnemies);
        expect(result).to.deep.equal([3, 3, 2, 2]);

        expect(enemyGenerator.getFocusRewards(4, 11)).to.deep.equal([3, 3, 3, 2]);
        expect(enemyGenerator.getFocusRewards(4, 12)).to.deep.equal([3, 3, 3, 3]);
        expect(enemyGenerator.getFocusRewards(4, 13)).to.deep.equal([4, 3, 3, 3]);
        
    });

    it("generateRealisticEnemies_nEnemies", function() {
        // Ruins I should always be 2 enemies
        for (let seed=0;seed<100;seed++) {
            let room = new FortressRoom([1], 1, 1, new Prando(seed));
            expect(room.getNEnemiesElitesCountDouble()).to.equal(2);
        }

        // Tower IV and Tower V should be seen with 4, 5 and 6 enemies
        for (let roomLevel=9; roomLevel<=10; roomLevel++) {
            let seen4 = false;
            let seen5 = false;
            let seen6 = false; 
            for (let seed=0;seed<100;seed++) {
                let room = new FortressRoom([1], roomLevel, 1, new Prando(seed));
                if (room.getNEnemiesElitesCountDouble()===4) seen4 = true; 
                if (room.getNEnemiesElitesCountDouble()===5) seen5 = true; 
                if (room.getNEnemiesElitesCountDouble()===6) seen6 = true; 
                //EnemyGenerator.describeEnemies(room.enemiesAll);
                if (room.getNEnemiesElitesCountDouble() < 4 || room.getNEnemiesElitesCountDouble() > 6) {
                    fail("Room level " + roomLevel + " should not have nEnemies=" + room.getNEnemiesElitesCountDouble());
                }
            }
            expect(seen4).to.be.true;
            expect(seen5).to.be.true;
            expect(seen6).to.be.true;
        }
    });


    it("generateRealisticEnemies_difficultyBudgetPerEnemy", function() {
        let room = new FortressRoom([1], 10, 1, new Prando(0));
        let normalizedDifficultyBudgetPerEnemy4 = enemyGenerator.getDifficultyBudgetPerEnemy(room.overallDifficulty, room.roomLevel, 4);
        let normalizedDifficultyBudgetPerEnemy5 = enemyGenerator.getDifficultyBudgetPerEnemy(room.overallDifficulty, room.roomLevel, 5);
        let normalizedDifficultyBudgetPerEnemy6 = enemyGenerator.getDifficultyBudgetPerEnemy(room.overallDifficulty, room.roomLevel, 6);
        
        expect(normalizedDifficultyBudgetPerEnemy4).to.be.greaterThan(normalizedDifficultyBudgetPerEnemy5);
        expect(normalizedDifficultyBudgetPerEnemy5).to.be.greaterThan(normalizedDifficultyBudgetPerEnemy6);
    });

    it("generateRealisticEnemies_enemyDifficulty", function() {

        // Difficulty should be 1 star only room level 1
        let room = new FortressRoom([1], 1, 1, new Prando(0));
        expect(room.enemiesAll.map(enemy => enemy.difficulty)).to.deep.equal([1, 1]);

        // Difficulty should be between 1 and 4 stars for room level 10
        // MORE WORK IS NEEDED HERE
        let seen = [false, false, false, false, false];
        for (let seed=0;seed<100;seed++) {
            let room = new FortressRoom([1], 10, 1, new Prando(seed));
            for (let enemy of room.enemiesAll) {
                seen[enemy.difficulty-1] = true; 
            }    
            //room.describeRoom();
        }
        expect(seen).to.deep.equal([true, true, true, true, false]);
    });


});