
import { TestData } from "../../TestData";
import { expect } from "chai";
import { Wizard } from "./Wizard";
import { WizardDefeatEvent } from "../../../src/sim/events/wizard/combat/WizardDefeatEvent";
import { Enemy } from "../../../src/model/env/enemies/Enemy";
import { ExstimuloPotionEvent } from "../../../src/sim/events/wizard/potions/ExstimuloPotionEvent";
import { WitSharpeningPotionEvent } from "../../../src/sim/events/wizard/potions/WitSharpeningPotionEvent";



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

}); 


