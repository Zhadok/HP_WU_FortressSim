import { Enemy } from "../../../../src/model/env/enemies/Enemy";
import { expect } from 'chai';
import enemyData from "../../../../src/data/enemies.json";
import { enemyNameType } from "../../../../src/types";

import enemyStatsConfig from "../../../../src/data/enemyStatsConfig.json";
import { EnemyGenerator } from "../../../../src/model/env/enemies/EnemyGenerator";
import { TestData } from "../../../TestData";

describe("EnemyGenerator", function() {

    let enemyGenerator: EnemyGenerator;
    beforeEach(() => {
        enemyGenerator = EnemyGenerator.buildEnemyGeneratorWithRng(TestData.buildNewRNG_0());
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

});