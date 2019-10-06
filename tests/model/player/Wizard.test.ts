
import { TestData } from "../../TestData";
import { expect } from "chai";
import { Wizard } from "./Wizard";
import { WizardDefeatEvent } from "../../../src/sim/events/wizard/combat/WizardDefeatEvent";
import { Enemy } from "../env/enemies/Enemy";



describe("Wizard", function() {

    let wizard: Wizard;
    let enemy: Enemy;  
    beforeEach(() => {
        wizard = TestData.buildDefaultProfessor(); 
        enemy = TestData.buildDefaultEnemy(); 
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


