
import { TestData } from "../../TestData";
import { expect } from "chai";
import { Wizard } from "./Wizard";
import { WizardDefeatEvent } from "../../../src/sim/events/wizard/combat/WizardDefeatEvent";
import { Enemy } from "../../../src/model/env/enemies/Enemy";
import { ExstimuloPotionEvent } from "../../../src/sim/events/wizard/potions/ExstimuloPotionEvent";
import { WitSharpeningPotionEvent } from "../../../src/sim/events/wizard/potions/WitSharpeningPotionEvent";
import { PotionAvailabilityParameters } from "../../../src/sim/PotionAvailabilityParameters";



describe("Wizard", function() {

    let wizard: Wizard;
    let enemy: Enemy;  
    let exstimuloEvent: ExstimuloPotionEvent; 
    let witSharpeningEvent: WitSharpeningPotionEvent; 
    beforeEach(() => {
        wizard = TestData.buildDefaultProfessor(); 
        enemy = TestData.buildDefaultEnemy(); 
        exstimuloEvent = new ExstimuloPotionEvent(0, wizard, enemy, TestData.buildDefaultPotionParameters(), 2.25, 5, "potent"); 
        witSharpeningEvent = new WitSharpeningPotionEvent(0, wizard, enemy, 0.5, 4, TestData.buildDefaultPotionParameters());
    }); 


    it("numberOfEnhancements_none", function() {
        expect(wizard.getNumberOfEnhancements(enemy)).to.equal(0);
    }); 
    it("numberOfEnhancements_spellBuffs", function() {
        wizard.hasBraveryCharm = true; 
        wizard.hasDefenceCharm = true; 
        wizard.hasProficiencyPowerCharm = true; 
        expect(wizard.getNumberOfEnhancements(enemy)).to.equal(3);
    });
    it("numberOfEnhancements_exstimulo_witSharpening", function() {
        exstimuloEvent.onFinish();
        witSharpeningEvent.onFinish(); 
        // Count exstimulo OR wit sharpening but not both
        expect(wizard.getNumberOfEnhancements(enemy)).to.equal(1);
    });
    it("numberOfEnhancements_nonCombatPotions", function() {
        wizard.getPotions().hasBaruffiosBrainElixir = true;
        wizard.getPotions().hasTonicForTraceDetection = true;
        expect(wizard.getNumberOfEnhancements(enemy)).to.equal(2);
    });
    it("numberOfEnhancements_allPotions", function() {
        wizard.getPotions().hasBaruffiosBrainElixir = true;
        wizard.getPotions().hasTonicForTraceDetection = true;
        
        exstimuloEvent.onFinish(); 
        witSharpeningEvent.onFinish(); 
        expect(wizard.getNumberOfEnhancements(enemy)).to.equal(3);
    });


    it("performAttackCast_stats", function() {
        expect(wizard.numberEnhancementsDuringAttacks).to.deep.equal([0, 0, 0, 0, 0, 0, 0]); 
        expect(wizard.numberImpairmentsDuringAttacks).to.deep.equal([0, 0, 0, 0]); 

        wizard.performAttackCast(50, false, false, enemy); 

        expect(wizard.totalDamage).to.equal(50); 
        expect(wizard.numberAttackCasts).to.equal(1); 
        expect(wizard.numberCriticalCasts).to.equal(0); 
        expect(wizard.numberDodgedCasts).to.equal(0); 
        expect(wizard.numberEnhancementsDuringAttacks).to.deep.equal([1, 0, 0, 0, 0, 0, 0]); 
        expect(wizard.numberImpairmentsDuringAttacks).to.deep.equal([1, 0, 0, 0]); 
        
        wizard.hasDefenceCharm = true; 
        enemy.hasConfusionHex = true; 
        wizard.performAttackCast(75, true, false, enemy); 
        expect(wizard.totalDamage).to.equal(125); 
        expect(wizard.numberAttackCasts).to.equal(2); 
        expect(wizard.numberCriticalCasts).to.equal(1); 
        expect(wizard.numberDodgedCasts).to.equal(0); 
        expect(wizard.numberEnhancementsDuringAttacks).to.deep.equal([1, 1, 0, 0, 0, 0, 0]); 
        expect(wizard.numberImpairmentsDuringAttacks).to.deep.equal([1, 1, 0, 0]); 
      
        enemy.hasDeteriorationHex = true; 
        wizard.performAttackCast(0, false, true, enemy); 
        expect(wizard.totalDamage).to.equal(125); 
        expect(wizard.numberAttackCasts).to.equal(3); 
        expect(wizard.numberCriticalCasts).to.equal(1); 
        expect(wizard.numberDodgedCasts).to.equal(1); 
        expect(wizard.numberEnhancementsDuringAttacks).to.deep.equal([1, 2, 0, 0, 0, 0, 0]); 
        expect(wizard.numberImpairmentsDuringAttacks).to.deep.equal([1, 1, 1, 0]); 
      
    });

    it("timeSpentDead_raw", function() {
        wizard.removeStamina(999); 
        wizard.timestampDefeated = 50*1000; 
        wizard.revive(60*1000); 

        expect(wizard.timeSpentDefeated).to.equal(10*1000); 
    
        wizard.removeStamina(999); 
        wizard.timestampDefeated = 80*1000; 
        wizard.revive(100*1000); 
        
        expect(wizard.timeSpentDefeated).to.equal(30*1000); 
    }); 

    it("timeSpentDead_events", function() {
        wizard.removeStamina(999); 
        let event1 = new WizardDefeatEvent(10*1000, enemy, wizard, TestData.buildNewRNG_0()); 
        event1.onStart(); 
        event1.onFinish();
        
        expect(wizard.timeSpentDefeated).to.equal(wizard.knockoutTime); 
    });

    it("potionsUsed", function() {
        let potionsAtBeginning: PotionAvailabilityParameters = {
            hasBaruffiosBrainElixir: true, 
            hasTonicForTraceDetection: false, 

            nExstimuloAvailable: 5,
            nStrongExstimuloAvailable: 4,
            nPotentExstimuloAvailable: 10,
            nHealingPotionsAvailable: 14,
            nWeakInvigorationAvailable: 25,
            nStrongInvigorationAvailable: 45,
            nWitSharpeningAvailable: 95
        };
        wizard.setPotions(potionsAtBeginning); 
        wizard.getPotions().nExstimuloAvailable -= 1; 
        wizard.getPotions().nStrongExstimuloAvailable -= 2; 
        wizard.getPotions().nPotentExstimuloAvailable -= 3; 
        wizard.getPotions().nHealingPotionsAvailable -= 4; 
        wizard.getPotions().nWeakInvigorationAvailable -= 5; 
        wizard.getPotions().nStrongInvigorationAvailable -= 6; 
        wizard.getPotions().nWitSharpeningAvailable -= 7; 
        

        let potionsUsed = wizard.getPotionsUsed(); 
        expect(potionsUsed.nExstimuloAvailable).to.equal(1); 
        expect(potionsUsed.nStrongExstimuloAvailable).to.equal(2); 
        expect(potionsUsed.nPotentExstimuloAvailable).to.equal(3); 
        expect(potionsUsed.nHealingPotionsAvailable).to.equal(4); 
        expect(potionsUsed.nWeakInvigorationAvailable).to.equal(5); 
        expect(potionsUsed.nStrongInvigorationAvailable).to.equal(6); 
        expect(potionsUsed.nWitSharpeningAvailable).to.equal(7); 

    });

}); 


