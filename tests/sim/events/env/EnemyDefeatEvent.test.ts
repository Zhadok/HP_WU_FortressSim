
import { expect } from "chai";
import { TestData } from "../../../TestData";
import { EnemyDefeatEvent } from "../../../../src/sim/events/env/EnemyDefeatEvent";
import { ExstimuloPotionEvent } from "../../../../src/sim/events/wizard/potions/ExstimuloPotionEvent";
import { WitSharpeningPotionEvent } from "../../../../src/sim/events/wizard/potions/WitSharpeningPotionEvent";



describe("EnemyDefeatEvent", function() {

    // Changed in v2.6.0: Charges are now carried over to next enemy
    it("shouldKeepPotionUses", function() {
        let wizard = TestData.buildDefaultProfessor();
        let enemy = TestData.buildDefaultEnemyElite();

        let potionEvent = new ExstimuloPotionEvent(0, wizard, enemy, TestData.buildDefaultPotionParameters(), 2.25, 5, "potent");
        potionEvent.onFinish();

        let potionEvent2 = new WitSharpeningPotionEvent(0, wizard, enemy, 0.5, 3, TestData.buildDefaultPotionParameters()); 
        potionEvent2.onFinish(); 

        expect(wizard.getExstimuloDamageBuff()).to.equal(2.25); 
        expect(wizard.getWitSharpeningDamageBuff(enemy)).to.equal(0.5); 

        let event = new EnemyDefeatEvent(0, enemy, wizard);
        event.onFinish();

        expect(wizard.exstimuloPotionDamageBuff).to.equal(2.25);
        expect(wizard.witSharpeningPotionDamageBuff).to.equal(0.5);
    });

});