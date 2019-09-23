
import { expect } from "chai";
import { TestData } from "../../../TestData";
import { EnemyDefeatEvent } from "../../../../src/sim/events/env/EnemyDefeatEvent";
import { ExstimuloPotionEvent } from "../../../../src/sim/events/wizard/potions/ExstimuloPotionEvent";



describe("EnemyDefeatEvent", function() {

    it("shouldResetPotionUsesRemaining", function() {
        let wizard = TestData.buildDefaultProfessor();
        let enemy = TestData.buildDefaultEnemy();

        let potionEvent = new ExstimuloPotionEvent(0, wizard, TestData.buildDefaultPotionParameters(), 2.25, 5, "potent");
        potionEvent.onFinish();

        expect(wizard.exstimuloPotionUsesRemaining).to.equal(5);
        expect(wizard.exstimuloPotionDamageBuff).to.equal(2.25);

        let event = new EnemyDefeatEvent(0, enemy, wizard);
        event.onFinish();

        expect(wizard.exstimuloPotionUsesRemaining).to.equal(0);
        expect(wizard.exstimuloPotionDamageBuff).to.equal(0);
    });

});