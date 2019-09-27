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

    let fortress1: FortressRoom; 
    let fortress2: FortressRoom;
    let fortress3: FortressRoom; 
    let fortress4: FortressRoom; 

    beforeEach(() => {
        let params1 = TestData.buildDefaultSimParameters();
        params1.roomLevel = 1;
        fortress1 = new FortressRoom(params1, TestData.buildNewRNG_0());

        let params2 = TestData.buildDefaultSimParameters();
        params2.roomLevel = 5;
        fortress2 = new FortressRoom(params2, TestData.buildNewRNG_0());

        let params3 = TestData.buildDefaultSimParameters();
        params3.roomLevel = 8;
        fortress3 = new FortressRoom(params3, TestData.buildNewRNG_0());
        
        let params4 = TestData.buildDefaultSimParameters();
        params4.roomLevel = 8;
        params4.runestoneLevels = [2]; 
        fortress4 = new FortressRoom(params4, TestData.buildNewRNG_0());
        
    });

    it('focusBudget_fromComputedData', function() {
        expect(fortress1.computeFocusBudget()).equal(4);
        expect(fortress2.computeFocusBudget()).equal(8);
        expect(fortress3.computeFocusBudget()).equal(10);
        expect(fortress4.computeFocusBudget()).equal(10);
    });

    it("focusBudget_fromVideo", function() {
        expect(fortress1.computeFocusBudget()).to.equal(4);
        expect(fortress2.computeFocusBudget()).to.equal(8);
        expect(fortress3.computeFocusBudget()).to.equal(10);
        expect(fortress4.computeFocusBudget()).to.equal(10);
    });

    it("difficulty_fromComputedData", function() {
        expect(fortress1.computeOverallDifficulty()).equal(39);
        expect(fortress2.computeOverallDifficulty()).equal(445);
        expect(fortress3.computeOverallDifficulty()).equal(1362);
        expect(fortress4.computeOverallDifficulty()).equal(1395);
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
        let enemies = getDefaultEnemies();
        fortress1.addEnemyToActive(enemies[0]);
        expect(fortress1.enemiesActive).to.have.length(1);
        fortress1.addEnemyToActive(enemies[1]);
        expect(fortress1.enemiesActive).to.have.length(2);
    });

    it("removeEnemyFromActive", function() {
        let enemies = getDefaultEnemies();
        fortress1.addEnemyToActive(enemies[0]);
        fortress1.addEnemyToActive(enemies[1]);
        expect(fortress1.enemiesActive).to.have.length(2);

        fortress1.removeEnemyFromActive(enemies[0]);
        expect(fortress1.enemiesActive).to.have.length(1);
        expect(fortress1.enemiesActive[0].enemyIndex).to.equal(1);

        fortress1.removeEnemyFromActive(enemies[1]);
        expect(fortress1.enemiesActive).to.have.length(0);
    });





});