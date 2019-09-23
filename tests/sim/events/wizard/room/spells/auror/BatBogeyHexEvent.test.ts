
import { expect } from "chai";
import { TestData } from "../../../../../../TestData";
import { BatBogeyHexEvent } from "../../../../../../../src/sim/events/wizard/room/spells/auror/BatBogeyHexEvent";

describe("BatBogeyHexEvent", function() {


    it("batBogeyHex_damage", function() {
        let wizard = TestData.buildDefaultAuror();
        let enemy = TestData.buildDefaultEnemy();

        let event = new BatBogeyHexEvent(0, 4, enemy, wizard);
        event.onFinish();

        expect(enemy.getCurrentStamina()).to.equal(enemy.getMaxStamina() - 4);
    });

});