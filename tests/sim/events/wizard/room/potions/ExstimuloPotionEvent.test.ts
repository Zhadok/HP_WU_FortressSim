import { TestData } from "../../../../../TestData";
import { CombatSpellCastWizardEvent } from "../../../../../../src/sim/events/wizard/combat/CombatSpellCastWizardEvent";
import { expect } from "chai";
import { ExstimuloPotionEvent } from "../../../../../../src/sim/events/wizard/potions/ExstimuloPotionEvent";
import potionData from "../../../../../../src/data/potions.json";
import { fail } from "assert";



describe("ExstimuloPotionEvent", function() {

    it("potion_apply", function() {
        let wizard = TestData.buildDefaultMagizoologist();
        let potions = TestData.buildDefaultPotionParameters();
        let enemy = TestData.buildDefaultEnemyElite();

        let eventPotion = new ExstimuloPotionEvent(0, wizard, potions, potionData.potentExstimuloPotionDamageBuff, potionData.potentExstimuloPotionUses, "potent");
        eventPotion.onFinish();

        expect(wizard.exstimuloPotionDamageBuff).to.equal(2.25);
        expect(wizard.exstimuloPotionUsesRemaining).to.equal(5);
        expect(wizard.getDamageBuffMultiplier(enemy)).to.equal(3.25);
       
        wizard.performAttackCast(); // 4 remaining
        expect(wizard.exstimuloPotionDamageBuff).to.equal(2.25);
        expect(wizard.exstimuloPotionUsesRemaining).to.equal(4);
        expect(wizard.getDamageBuffMultiplier(enemy)).to.equal(3.25);
       
        wizard.performAttackCast(); // 3 remaining
        wizard.performAttackCast(); // 2 remaining
        wizard.performAttackCast(); // 1 remaining
        expect(wizard.exstimuloPotionDamageBuff).to.equal(2.25);
        expect(wizard.exstimuloPotionUsesRemaining).to.equal(1);
        expect(wizard.getDamageBuffMultiplier(enemy)).to.equal(3.25);
       
        wizard.performAttackCast(); // 0 remaining
        expect(wizard.exstimuloPotionDamageBuff).to.equal(0);
        expect(wizard.exstimuloPotionUsesRemaining).to.equal(0);
        expect(wizard.getDamageBuffMultiplier(enemy)).to.equal(1);
    });

    it("potion_damageIncrease", function() {

        let wizard = TestData.buildDefaultMagizoologist();
        let potions = TestData.buildDefaultPotionParameters();
        let enemy = TestData.buildDefaultEnemyElite();

        let previousDamage = CombatSpellCastWizardEvent.computeWizardDamage(wizard, enemy, 0);

        let eventPotion = new ExstimuloPotionEvent(0, wizard, potions, potionData.potentExstimuloPotionDamageBuff, potionData.potentExstimuloPotionUses, "potent");
        eventPotion.onFinish();

        let newDamage = CombatSpellCastWizardEvent.computeWizardDamage(wizard, enemy, 0);
        expect(Math.ceil(previousDamage * (1+2.25))).to.equal(newDamage);
    });

    it("potion_alreadyActive", function() {
        let wizard = TestData.buildDefaultMagizoologist();
        let potions = TestData.buildDefaultPotionParameters();

        expect(potions.nPotentExstimuloAvailable).to.equal(2);

        let eventPotion = new ExstimuloPotionEvent(0, wizard, potions, potionData.potentExstimuloPotionDamageBuff, potionData.potentExstimuloPotionUses, "potent");
        eventPotion.onFinish();

        expect(potions.nPotentExstimuloAvailable).to.equal(1);

        let eventPotion2 = new ExstimuloPotionEvent(0, wizard, potions, potionData.potentExstimuloPotionDamageBuff, potionData.potentExstimuloPotionUses, "potent");
        eventPotion2.onFinish();

        expect(potions.nPotentExstimuloAvailable).to.equal(1);

    });

    it("potion_notAvailable", function() {
        let wizard = TestData.buildDefaultMagizoologist();
        let potions = TestData.buildDefaultPotionParameters();

        let eventPotion = new ExstimuloPotionEvent(0, wizard, potions, potionData.potentExstimuloPotionDamageBuff, potionData.potentExstimuloPotionUses, "potent");
        eventPotion.onFinish();
        wizard.exstimuloPotionDamageBuff = 0;
        wizard.exstimuloPotionUsesRemaining = 0;

        let eventPotion2 = new ExstimuloPotionEvent(0, wizard, potions, potionData.potentExstimuloPotionDamageBuff, potionData.potentExstimuloPotionUses, "potent");
        eventPotion2.onFinish();
        wizard.exstimuloPotionDamageBuff = 0;
        wizard.exstimuloPotionUsesRemaining = 0;

        try {
            let eventPotion3 = new ExstimuloPotionEvent(0, wizard, potions, potionData.potentExstimuloPotionDamageBuff, potionData.potentExstimuloPotionUses, "potent");
            eventPotion3.onFinish();
            fail("Should have failed after drinking unavailable potion!");
        }
        catch (e) {}
    });

});