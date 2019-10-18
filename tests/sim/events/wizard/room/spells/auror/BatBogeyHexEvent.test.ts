
import { expect } from "chai";
import { TestData } from "../../../../../../TestData";
import { BatBogeyHexEvent } from "../../../../../../../src/sim/events/wizard/room/spells/auror/BatBogeyHexEvent";
import { Auror } from "../../../../../../../src/model/player/Auror";
import { Enemy } from "../../../../../../../src/model/env/enemies/Enemy";

describe("BatBogeyHexEvent", function() {

    let wizard: Auror;
    let enemy: Enemy; 
    beforeEach(() => {
        wizard = TestData.buildDefaultAuror();
        enemy = TestData.buildDefaultEnemy();
    });

    it("batBogeyHex_damage", function() {
        let event = new BatBogeyHexEvent(0, 4, enemy, wizard);
        event.onFinish();

        expect(enemy.getCurrentStamina()).to.equal(enemy.getMaxStamina() - 4);
    });

    it("batBogeyHex_shouldBeOnCooldown", function() {
        let event = new BatBogeyHexEvent(0, 4, enemy, wizard);
        event.onStart(); 
        event.onFinish();

        let cooldownStart = event.timestampBegin; 

        expect(wizard.batBogeyHexOnCooldown).to.be.true; 

        let followUp = event.getFollowupEvent(); 
        followUp.onFinish(); 

        expect(wizard.batBogeyHexOnCooldown).to.be.false; 

        let cooldownEnd = followUp.timestampEnd; 
        expect(cooldownEnd - cooldownStart).to.equal(6000); 
    });

});