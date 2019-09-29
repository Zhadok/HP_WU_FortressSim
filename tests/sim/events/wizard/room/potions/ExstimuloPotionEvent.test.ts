import { TestData } from "../../../../../TestData";
import { CombatSpellCastWizardEvent } from "../../../../../../src/sim/events/wizard/combat/CombatSpellCastWizardEvent";
import { expect } from "chai";
import { ExstimuloPotionEvent } from "../../../../../../src/sim/events/wizard/potions/ExstimuloPotionEvent";
import potionData from "../../../../../../src/data/potions.json";
import { fail } from "assert";
import { Wizard } from "../../../../../model/player/Wizard";
import { PotionAvailabilityParameters } from "../../../../PotionAvailabilityParameters";
import { Enemy } from "../../../../../model/env/enemies/Enemy";



describe("ExstimuloPotionEvent", function() {

    let wizard: Wizard; 
    let potions: PotionAvailabilityParameters;
    let enemy: Enemy;
    beforeEach(() => {
        wizard = TestData.buildDefaultMagizoologist();
        potions = TestData.buildDefaultPotionParameters();
        enemy = TestData.buildDefaultEnemyElite();
    });

    it("potion_apply", function() {

        let eventPotion = new ExstimuloPotionEvent(0, wizard, enemy, potions, potionData.potentExstimuloPotionDamageBuff, potionData.potentExstimuloPotionUses, "potent");
        eventPotion.onFinish();

        expect(enemy.getExstimuloDamageBuff(wizard.playerIndex)).to.equal(2.25);
        expect(enemy.getExstimuloUsesRemaining(wizard.playerIndex)).to.equal(5);
        expect(wizard.getDamageBuffMultiplier(enemy)).to.equal(3.25);
       
        wizard.performAttackCast(1, false, false, enemy); // 4 remaining
        expect(enemy.getExstimuloDamageBuff(wizard.playerIndex)).to.equal(2.25);
        expect(enemy.getExstimuloUsesRemaining(wizard.playerIndex)).to.equal(4);
        expect(wizard.getDamageBuffMultiplier(enemy)).to.equal(3.25);
       
        wizard.performAttackCast(1, false, false, enemy); // 3 remaining
        wizard.performAttackCast(1, false, false, enemy); // 2 remaining
        wizard.performAttackCast(1, false, false, enemy); // 1 remaining
        expect(enemy.getExstimuloDamageBuff(wizard.playerIndex)).to.equal(2.25);
        expect(enemy.getExstimuloUsesRemaining(wizard.playerIndex)).to.equal(1);
        expect(wizard.getDamageBuffMultiplier(enemy)).to.equal(3.25);
       
        wizard.performAttackCast(1, false, false, enemy); // 0 remaining
        expect(enemy.getExstimuloDamageBuff(wizard.playerIndex)).to.equal(0);
        expect(enemy.getExstimuloUsesRemaining(wizard.playerIndex)).to.equal(0);
        expect(wizard.getDamageBuffMultiplier(enemy)).to.equal(1);
    });

    it("potion_damageIncrease", function() {

        let previousDamage = CombatSpellCastWizardEvent.computeWizardDamage(wizard, enemy, 0);

        let eventPotion = new ExstimuloPotionEvent(0, wizard, enemy, potions, potionData.potentExstimuloPotionDamageBuff, potionData.potentExstimuloPotionUses, "potent");
        eventPotion.onFinish();

        let newDamage = CombatSpellCastWizardEvent.computeWizardDamage(wizard, enemy, 0);
        expect(Math.ceil(previousDamage * (1+2.25))).to.equal(newDamage);
    });

    it("potion_alreadyActive", function() {

        potions.nPotentExstimuloAvailable = 2; 
        expect(potions.nPotentExstimuloAvailable).to.equal(2);

        let eventPotion = new ExstimuloPotionEvent(0, wizard, enemy, potions, potionData.potentExstimuloPotionDamageBuff, potionData.potentExstimuloPotionUses, "potent");
        eventPotion.onFinish();

        expect(potions.nPotentExstimuloAvailable).to.equal(1);

        let eventPotion2 = new ExstimuloPotionEvent(0, wizard, enemy, potions, potionData.potentExstimuloPotionDamageBuff, potionData.potentExstimuloPotionUses, "potent");
        eventPotion2.onFinish();

        expect(potions.nPotentExstimuloAvailable).to.equal(1);

    });

    it("potion_notAvailable", function() {
        let wizard = TestData.buildDefaultMagizoologist();
        let potions = TestData.buildDefaultPotionParameters();

        let eventPotion = new ExstimuloPotionEvent(0, wizard, enemy, potions, potionData.potentExstimuloPotionDamageBuff, potionData.potentExstimuloPotionUses, "potent");
        eventPotion.onFinish();
        enemy.resetPotionUsesRemaining(wizard.playerIndex); 

        let eventPotion2 = new ExstimuloPotionEvent(0, wizard, enemy, potions, potionData.potentExstimuloPotionDamageBuff, potionData.potentExstimuloPotionUses, "potent");
        eventPotion2.onFinish();
        enemy.resetPotionUsesRemaining(wizard.playerIndex); 
        
        try {
            let eventPotion3 = new ExstimuloPotionEvent(0, wizard, enemy, potions, potionData.potentExstimuloPotionDamageBuff, potionData.potentExstimuloPotionUses, "potent");
            eventPotion3.onFinish();
            fail("Should have failed after drinking unavailable potion!");
        }
        catch (e) {}
    });

});