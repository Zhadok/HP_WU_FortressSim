import { Enemy } from "../../../../src/model/env/enemies/Enemy";
import { expect } from 'chai';
import enemyData from "../../../../src/data/enemies.json";
import { enemyNameType } from "../../../../src/types";

import enemyStatsConfig from "../../../../src/data/enemyStatsConfig.json";

describe("Enemy", function() {

    it('buildAllEnemyTypes', function() {
        
        let enemyIndexCount = 0;
        for (let enemyName in enemyData) {

            for (let difficulty = 1; difficulty <= 5; difficulty++) {

                let enemy1 = Enemy.buildEnemy(enemyName as enemyNameType, enemyIndexCount++, false, difficulty, 1, 3);
                
                let expectedStamina = Math.floor(enemyData[enemyName as enemyNameType].stats[difficulty-1].normal.stamina * (1 + enemyStatsConfig.growthAdjustStaminaPerLevel));
                if (expectedStamina !== enemy1.stats.stamina) {
                    console.log("ExpectedStamina=" + expectedStamina + ", enemy.stamina=", enemy1.stats.stamina + ", during difficulty=" + difficulty);
                    console.log(enemy1);
                }
                expect(enemy1.stats.stamina).to.equal(expectedStamina);
            }
        }

    });

    it("Sanity tests from videos", function() {

        // Total enemy count: 38
        // Proficient enemy count: 21

        // First comments: Always same number of enemies for given level, elite counts for 2

        // Probably wrong...
        // Difficulty spread ~= 2 * sum(EnemyStars * EnemyLevel * (1 + IsElite))

        // Ruins 1 (Video 1), difficulty 39
        // 39 ~= 2 * (1*3+1*5) = 16
        expect(Enemy.buildEnemy("werewolf", 0, false, 1, 3, 0).getMaxStamina()).to.equal(87); 
        expect(Enemy.buildEnemy("deathEater", 0, false, 1, 5, 0).getMaxStamina()).to.equal(116); 

        // Ruins 2, difficulty 71
        // 71 ~= 2 * (1*5+2*11) = 56
        expect(Enemy.buildEnemy("werewolf", 0, false, 1, 5, 0).getMaxStamina()).to.equal(98); 
        expect(Enemy.buildEnemy("acromantula", 0, false, 2, 11, 0).getMaxStamina()).to.equal(172); 
        
        // Ruins 3 (Video 2), difficulty 158
        // 158 ~= 2 * (19+18+19) = 112
        expect(Enemy.buildEnemy("acromantula", 0, false, 1, 19, 0).getMaxStamina()).to.equal(183);
        expect(Enemy.buildEnemy("werewolf", 0, false, 1, 18, 0).getMaxStamina()).to.equal(172); 
        expect(Enemy.buildEnemy("acromantula", 0, false, 1, 19, 0).getMaxStamina()).to.equal(183);
        
        // Ruins 4, difficulty 283
        // 283 ~= 2 * (30+30) = 120
        expect(Enemy.buildEnemy("pixie", 0, false, 1, 30, 0).getMaxStamina()).to.equal(141);
        expect(Enemy.buildEnemy("pixie", 0, true, 1, 30, 0).getMaxStamina()).to.equal(265);
        
        // Ruins 4
        expect(Enemy.buildEnemy("pixie", 0, false, 2, 27, 0).getMaxStamina()).to.equal(160);
        expect(Enemy.buildEnemy("pixie", 0, false, 1, 25, 0).getMaxStamina()).to.equal(124);
        expect(Enemy.buildEnemy("pixie", 0, false, 1, 26, 0).getMaxStamina()).to.equal(127);
        
        // Ruins 5 (4:28), 445 difficulty
        expect(Enemy.buildEnemy("darkWizard", 0, false, 1, 39, 0).getMaxStamina()).to.equal(259);
        expect(Enemy.buildEnemy("werewolf", 0, false, 2, 37, 0).getMaxStamina()).to.equal(353);
        expect(Enemy.buildEnemy("werewolf", 0, false, 1, 36, 0).getMaxStamina()).to.equal(275);
        
        // Tower 1 (6:34), 647 difficulty
        expect(Enemy.buildEnemy("werewolf", 0, false, 3, 48, 0).getMaxStamina()).to.equal(535); // 3 focus
        expect(Enemy.buildEnemy("acromantula", 0, false, 1, 48, 0).getMaxStamina()).to.equal(354); // 3 focus
        expect(Enemy.buildEnemy("acromantula", 0, false, 2, 47, 0).getMaxStamina()).to.equal(440); // 2 focus
        
        // Tower II (9:00), 970 difficulty
        expect(Enemy.buildEnemy("deathEater", 0, false, 3, 55, 0).getMaxStamina()).to.equal(669); // 3 focus
        expect(Enemy.buildEnemy("werewolf", 0, false, 3, 60, 0).getMaxStamina()).to.equal(642); // 3 focus
        expect(Enemy.buildEnemy("pixie", 0, false, 3, 61, 0).getMaxStamina()).to.equal(346); // 3 focus
        
        // Tower III (0:12), 1362 difficulty (Video 3)
        expect(Enemy.buildEnemy("pixie", 0, false, 2, 71, 0).getMaxStamina()).to.equal(339); // 3 focus
        expect(Enemy.buildEnemy("acromantula", 0, false, 3, 69, 0).getMaxStamina()).to.equal(722); // 3 focus
        expect(Enemy.buildEnemy("erkling", 0, false, 2, 65, 0).getMaxStamina()).to.equal(586); // 2 focus
        expect(Enemy.buildEnemy("darkWizard", 0, false, 2, 65, 0).getMaxStamina()).to.equal(479); // 2 focus
        
        // Tower III (3:40), 1395 difficulty, runestone 2
        expect(Enemy.buildEnemy("erkling", 0, true, 3, 70, 0).getMaxStamina()).to.equal(1342); // 4 focus, chain attack
        expect(Enemy.buildEnemy("pixie", 0, false, 3, 68, 0).getMaxStamina()).to.equal(379); // 3 focus
        expect(Enemy.buildEnemy("darkWizard", 0, false, 1, 66, 0).getMaxStamina()).to.equal(395); // 3 focus
        
        // Tower IV (06:40), 1850 difficulty
        expect(Enemy.buildEnemy("erkling", 0, false, 3, 76, 0).getMaxStamina()).to.equal(770); // 3 focus
        expect(Enemy.buildEnemy("pixie", 0, false, 2, 76, 0).getMaxStamina()).to.equal(360); // 2 focus
        expect(Enemy.buildEnemy("werewolf", 0, false, 2, 77, 0).getMaxStamina()).to.equal(640); // 2 focus
        expect(Enemy.buildEnemy("erkling", 0, false, 2, 75, 0).getMaxStamina()).to.equal(662); // 2 focus
        expect(Enemy.buildEnemy("werewolf", 0, false, 2, 77, 0).getMaxStamina()).to.equal(640); // 2 focus
        
        // Tower IV (11:15), 1891 difficulty, runestone 2, 15:38 end
        expect(Enemy.buildEnemy("pixie", 0, false, 3, 81, 0).getMaxStamina()).to.equal(441); // 3 focus
        expect(Enemy.buildEnemy("darkWizard", 0, false, 2, 76, 0).getMaxStamina()).to.equal(547); // 2 focus
        expect(Enemy.buildEnemy("werewolf", 0, false, 2, 82, 0).getMaxStamina()).to.equal(676); // 2 focus
        expect(Enemy.buildEnemy("darkWizard", 0, false, 2, 76, 0).getMaxStamina()).to.equal(547); // 2 focus
        expect(Enemy.buildEnemy("werewolf", 0, false, 1, 79, 0).getMaxStamina()).to.equal(521); // 2 focus
        

    });

});