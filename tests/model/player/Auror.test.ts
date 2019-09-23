
import { TestData } from "../../TestData";
import { expect } from "chai";
import { Auror } from "../../../src/model/player/Auror";
import { Enemy } from "../../../src/model/env/enemies/Enemy";



describe("Auror", function() {

    let auror: Auror;
    let enemy: Enemy;
    beforeEach(() => {
        auror = TestData.buildDefaultAuror();
        enemy = TestData.buildDefaultEnemy();
    });

    it("standardPower", function() {
        expect(auror.getPowerAfterModifications(enemy)).to.equal(auror.stats.power);
    });

    it("aurorAdvantage_notTriggered", function() {
        auror.setTrigger("aurorAdvantage", 10);
        expect(auror.getPowerAfterModifications(enemy)).to.equal(auror.stats.power);
    });
    it("aurorAdvantage_triggered", function() {
        enemy.removeStamina(enemy.getMaxStamina()-1);

        auror.setTrigger("aurorAdvantage", 10);
        expect(auror.getPowerAfterModifications(enemy)).to.equal(auror.stats.power + 10);
    });
    

});