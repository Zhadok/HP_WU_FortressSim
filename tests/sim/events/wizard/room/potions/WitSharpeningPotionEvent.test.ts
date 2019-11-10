import { TestData } from "../../../../../TestData";
import { CombatSpellCastWizardEvent } from "../../../../../../src/sim/events/wizard/combat/CombatSpellCastWizardEvent";
import { expect } from "chai";
import { ExstimuloPotionEvent } from "../../../../../../src/sim/events/wizard/potions/ExstimuloPotionEvent";
import potionData from "../../../../../../src/data/potions.json";
import { fail } from "assert";
import { Wizard } from "../../../../../model/player/Wizard";
import { PotionAvailabilityParameters } from "../../../../PotionAvailabilityParameters";
import { Enemy } from "../../../../../model/env/enemies/Enemy";
import { WitSharpeningPotionEvent } from "../../../../../../src/sim/events/wizard/potions/WitSharpeningPotionEvent"; 



describe("WitSharpeningPotionEvent", function() {

    let wizard: Wizard; 
    let potions: PotionAvailabilityParameters;
    let enemy: Enemy;
    let event: WitSharpeningPotionEvent; 
    beforeEach(() => {
        wizard = TestData.buildDefaultMagizoologist();
        potions = TestData.buildDefaultPotionParameters();
        enemy = TestData.buildDefaultEnemyElite();
    });

    it("apply", function() {
        event = new WitSharpeningPotionEvent(0, wizard, enemy, potionData.witSharpeningPotionDamageBuff, potionData.witSharpeningPotionUses, potions);
        event.onFinish(); 
        
        expect(wizard.getWitSharpeningDamageBuff(enemy)).to.equal(potionData.witSharpeningPotionDamageBuff); 
        expect(wizard.getWitSharpeningUsesRemaining()).to.equal(potionData.witSharpeningPotionUses);
        expect(wizard.witSharpeningPotionDamageBuff).to.be.equal(potionData.witSharpeningPotionDamageBuff);  
    });

    // Changed in v2.6.0: Wit sharpening can be drunk against normal enemies but do not lead to damage buffs. Attack casts will still lead to uses being decreased
    it("should", function() {
        let normalEnemy = TestData.buildDefaultEnemy(); 
        event = new WitSharpeningPotionEvent(0, wizard, normalEnemy, potionData.witSharpeningPotionDamageBuff, potionData.witSharpeningPotionUses, potions);
        event.onFinish(); 

        expect(wizard.getWitSharpeningDamageBuff(normalEnemy)).to.equal(0); 
        expect(wizard.getWitSharpeningUsesRemaining()).to.equal(3);
        expect(wizard.witSharpeningPotionDamageBuff).to.be.equal(0.5);  
    });

    it("usesShouldDecrease_onAttack", function() {
        let normalEnemy = TestData.buildDefaultEnemy(); 
        
        event = new WitSharpeningPotionEvent(0, wizard, enemy, potionData.witSharpeningPotionDamageBuff, potionData.witSharpeningPotionUses, potions);
        event.onFinish(); 
        
        wizard.performAttackCast(1, false, false, enemy); // 3 remaining, then 2
        expect(wizard.getWitSharpeningDamageBuff(enemy)).to.equal(0.5);
        expect(wizard.getWitSharpeningDamageBuff(normalEnemy)).to.equal(0);
        expect(wizard.getWitSharpeningUsesRemaining()).to.equal(2); 

        wizard.performAttackCast(1, false, false, enemy); // 2 remaining, then 1
        expect(wizard.getWitSharpeningDamageBuff(enemy)).to.equal(0.5);
        expect(wizard.getWitSharpeningDamageBuff(normalEnemy)).to.equal(0);
        expect(wizard.getWitSharpeningUsesRemaining()).to.equal(1); 
        wizard.performAttackCast(1, false, false, enemy); // 1 remaining, then 0
        expect(wizard.getWitSharpeningDamageBuff(enemy)).to.equal(0);
        expect(wizard.getWitSharpeningDamageBuff(normalEnemy)).to.equal(0);
        expect(wizard.getWitSharpeningUsesRemaining()).to.equal(0); 
    });

    it("decreaseAvailable", function() {
        potions.nWitSharpeningAvailable = 2; 
        let eventPotion = new WitSharpeningPotionEvent(0, wizard, enemy, potionData.witSharpeningPotionDamageBuff, potionData.witSharpeningPotionUses, potions); 
        eventPotion.onFinish();
        expect(potions.nWitSharpeningAvailable).to.equal(1); 
    });



}); 