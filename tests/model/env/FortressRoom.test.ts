import { FortressRoom } from "../../../src/model/env/FortressRoom";
import { expect } from 'chai';
import { Enemy } from "../../../src/model/env/enemies/Enemy";
import { TestData } from "../../TestData";
import { Logger } from "../../../src/util/Logger";

function getDefaultEnemies(): Array<Enemy> {
    return [
        Enemy.buildEnemy("acromantula", 0, false, 1, 3, 3),
        Enemy.buildEnemy("pixie", 1, false, 1, 1, 2)
    ]
}

describe("FortressRoom", function() {
    Logger.verbosity = 0;
    var fortress1: FortressRoom = new FortressRoom([1], 1, 1, TestData.buildNewRNG_0());
    var fortress2: FortressRoom = new FortressRoom([1], 5, 1, TestData.buildNewRNG_0());
    var fortress3: FortressRoom = new FortressRoom([1], 8, 1, TestData.buildNewRNG_0());
    var fortress4: FortressRoom = new FortressRoom([2], 8, 1, TestData.buildNewRNG_0());

    it('focusBudget_fromComputedData', function() {
        expect(fortress1.computeFocusBudget()).equal(4);
        expect(fortress2.computeFocusBudget()).equal(8);
        expect(fortress3.computeFocusBudget()).equal(10);
        expect(fortress4.computeFocusBudget()).equal(10);
    });

    it("focusBudget_fromVideo", function() {
        expect((new FortressRoom([1], 6, 1, TestData.buildNewRNG_0())).computeFocusBudget()).to.equal(8);
        expect((new FortressRoom([1], 7, 1, TestData.buildNewRNG_0())).computeFocusBudget()).to.equal(9);
        expect((new FortressRoom([1], 8, 1, TestData.buildNewRNG_0())).computeFocusBudget()).to.equal(10);
        expect((new FortressRoom([2], 8, 1, TestData.buildNewRNG_0())).computeFocusBudget()).to.equal(10);
        expect((new FortressRoom([1], 9, 1, TestData.buildNewRNG_0())).computeFocusBudget()).to.equal(11);
        expect((new FortressRoom([2], 9, 1, TestData.buildNewRNG_0())).computeFocusBudget()).to.equal(11);
    });

    it("difficulty_fromComputedData", function() {
        expect(fortress1.computeOverallDifficulty()).equal(39);
        expect(fortress2.computeOverallDifficulty()).equal(445);
        expect(fortress3.computeOverallDifficulty()).equal(1362);
        expect(fortress4.computeOverallDifficulty()).equal(1395);
    });
    it("difficulty_fromVideo", function() {
        expect((new FortressRoom([1], 6, 1, TestData.buildNewRNG_0())).computeOverallDifficulty()).to.equal(647);
        expect((new FortressRoom([1], 7, 1, TestData.buildNewRNG_0())).computeOverallDifficulty()).to.equal(970);
        expect((new FortressRoom([1], 8, 1, TestData.buildNewRNG_0())).computeOverallDifficulty()).to.equal(1362);
        expect((new FortressRoom([2], 8, 1, TestData.buildNewRNG_0())).computeOverallDifficulty()).to.equal(1395);
        expect((new FortressRoom([1], 9, 1, TestData.buildNewRNG_0())).computeOverallDifficulty()).to.equal(1850);
        expect((new FortressRoom([2], 9, 1, TestData.buildNewRNG_0())).computeOverallDifficulty()).to.equal(1891);
        
    });

    it("maxTime", function() {
        expect(fortress1.computeMaxtime()).equal(300);
        expect(fortress2.computeMaxtime()).equal(360);
        expect(fortress3.computeMaxtime()).equal(420);
        expect(fortress4.computeMaxtime()).equal(420);
    });

    it("knockoutTime", function() {
        expect(fortress1.computeKnockoutTime()).equal(1000 * 30);
        expect(fortress2.computeKnockoutTime()).equal(1000 * 38);
        expect(fortress3.computeKnockoutTime()).equal(1000 * 44);
        expect(fortress4.computeKnockoutTime()).equal(1000 * 44);
    });

    it("addEnemyToActive", function() {
        let fortress = new FortressRoom([1], 1, 1, TestData.buildNewRNG_0());
        let enemies = getDefaultEnemies();
        fortress.addEnemyToActive(enemies[0]);
        expect(fortress.enemiesActive).to.have.length(1);
        fortress.addEnemyToActive(enemies[1]);
        expect(fortress.enemiesActive).to.have.length(2);
    });

    it("removeEnemyFromActive", function() {
        let fortress = new FortressRoom([1], 1, 1, TestData.buildNewRNG_0());
        let enemies = getDefaultEnemies();
        fortress.addEnemyToActive(enemies[0]);
        fortress.addEnemyToActive(enemies[1]);
        expect(fortress.enemiesActive).to.have.length(2);

        fortress.removeEnemyFromActive(enemies[0]);
        expect(fortress.enemiesActive).to.have.length(1);
        expect(fortress.enemiesActive[0].enemyIndex).to.equal(1);

        fortress.removeEnemyFromActive(enemies[1]);
        expect(fortress.enemiesActive).to.have.length(0);
    });





});