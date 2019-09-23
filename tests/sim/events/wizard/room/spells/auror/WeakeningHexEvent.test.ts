
import { expect } from "chai";
import { TestData } from "../../../../../../TestData";
import { WeakeningHexEvent } from "../../../../../../../src/sim/events/wizard/room/spells/auror/WeakeningHexEvent";
import focusCostData from "../../../../../../../src/data/focusCosts.json";
import { CombatSpellCastEnemyEvent } from "../../../../../../../src/sim/events/wizard/combat/CombatSpellCastEnemyEvent";

describe("WeakeningHexEvent", function() {


    it("weakeningHex_apply", function() {
        let wizard = TestData.buildDefaultAuror();
        let enemy = TestData.buildDefaultEnemy();

        let event = new WeakeningHexEvent(0, 0.5, enemy, wizard);
        event.onFinish();

        expect(enemy.hasWeakeningHex).to.be.true;
        expect(enemy.weakeningHexValue).to.equal(0.5);
        expect(wizard.getFocus()).to.equal(wizard.stats.initialFocus - focusCostData.weakeningHex);
    });

    it("weakeningHex_lessDamage", function() {
        let wizard = TestData.buildDefaultAuror();
        let enemy = TestData.buildDefaultEnemy();

        let previousDamage = CombatSpellCastEnemyEvent.computeEnemyDamage(wizard, enemy, 1);

        let event = new WeakeningHexEvent(0, 0.5, enemy, wizard);
        event.onFinish();

        let newDamage = CombatSpellCastEnemyEvent.computeEnemyDamage(wizard, enemy, 1);

        expect(Math.ceil(previousDamage * 0.5)).to.equal(newDamage);
    });

});