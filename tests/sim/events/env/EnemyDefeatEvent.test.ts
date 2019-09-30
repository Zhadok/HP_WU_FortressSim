
import { expect } from "chai";
import { TestData } from "../../../TestData";
import { EnemyDefeatEvent } from "../../../../src/sim/events/env/EnemyDefeatEvent";
import { ExstimuloPotionEvent } from "../../../../src/sim/events/wizard/potions/ExstimuloPotionEvent";
import { WitSharpeningPotionEvent } from "../../../../src/sim/events/wizard/potions/WitSharpeningPotionEvent";



describe("EnemyDefeatEvent", function() {

    // Might be relevant if the way exstimulo potions are applied is changed
    it("shouldResetPotionUsesRemaining", function() {
        let wizard = TestData.buildDefaultProfessor();
        let enemy = TestData.buildDefaultEnemyElite();

        let potionEvent = new ExstimuloPotionEvent(0, wizard, enemy, TestData.buildDefaultPotionParameters(), 2.25, 5, "potent");
        potionEvent.onFinish();

        let potionEvent2 = new WitSharpeningPotionEvent(0, wizard, enemy, 0.5, 3, TestData.buildDefaultPotionParameters()); 
        potionEvent2.onFinish(); 

        expect(enemy.getExstimuloDamageBuff(wizard.playerIndex)).to.equal(2.25); 
        expect(wizard.exstimuloPotionDamageBuff).to.equal(2.25);
        expect(enemy.getWitSharpeningDamageBuff)
        expect(wizard.witSharpeningPotionDamageBuff).to.equal(0.5); 

        let event = new EnemyDefeatEvent(0, enemy, wizard);
        event.onFinish();

        expect(wizard.exstimuloPotionDamageBuff).to.equal(0);
        expect(wizard.witSharpeningPotionDamageBuff).to.equal(0);
    });

});