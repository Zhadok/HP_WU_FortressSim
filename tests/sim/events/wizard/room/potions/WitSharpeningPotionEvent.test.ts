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
        
        expect(enemy.getWitSharpeningDamageBuff(wizard.playerIndex)).to.equal(potionData.witSharpeningPotionDamageBuff); 
        expect(enemy.getWitSharpeningUsesRemaining(wizard.playerIndex)).to.equal(potionData.witSharpeningPotionUses);
        expect(wizard.witSharpeningPotionDamageBuff).to.be.equal(potionData.witSharpeningPotionDamageBuff);  
    });

    it("shouldNotApplyVsNormal", function() {
        let normalEnemy = TestData.buildDefaultEnemy(); 
        event = new WitSharpeningPotionEvent(0, wizard, normalEnemy, potionData.witSharpeningPotionDamageBuff, potionData.witSharpeningPotionUses, potions);
        event.onFinish(); 

        expect(normalEnemy.getWitSharpeningDamageBuff(wizard.playerIndex)).to.equal(0); 
        expect(normalEnemy.getWitSharpeningUsesRemaining(wizard.playerIndex)).to.equal(0);
        expect(wizard.witSharpeningPotionDamageBuff).to.be.equal(0);  
    });

    it("decreaseAvailable", function() {
        potions.nWitSharpeningAvailable = 2; 
        let eventPotion = new WitSharpeningPotionEvent(0, wizard, enemy, potionData.witSharpeningPotionDamageBuff, potionData.witSharpeningPotionUses, potions); 
        eventPotion.onFinish();
        expect(potions.nWitSharpeningAvailable).to.equal(1); 
    });



}); 