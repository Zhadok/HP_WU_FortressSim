
import { expect } from "chai";
import { MendingCharmEvent } from "../../../../../../../src/sim/events/wizard/room/spells/professor/MendingCharmEvent";
import { TestData } from "../../../../../../TestData";
import { Professor } from "../../../../../../../src/model/player/Professor";


describe("MendingCharmEvent", function() {

    let wizard: Professor; 
    beforeEach(()=> {
        wizard = TestData.buildDefaultProfessor();
    }); 

    it("mendingCharm_shouldRestoreHP", function() {
        wizard.removeStamina(10); 
        let event = new MendingCharmEvent(0, 4, wizard, wizard);
        event.onStart(); 
        event.onFinish();
        
        expect(wizard.getCurrentStamina()).to.equal(wizard.getMaxStamina() - 6);
    });

    it("mendingCharm_shouldBeOnCooldown", function() {
        let event = new MendingCharmEvent(0, 4, wizard, wizard);
        event.onStart(); 
        event.onFinish();

        let cooldownStart = event.timestampBegin; 

        expect(wizard.mendingCharmOnCooldown).to.be.true; 

        let followUp = event.getFollowupEvent(); 
        followUp.onFinish(); 

        expect(wizard.mendingCharmOnCooldown).to.be.false; 

        let cooldownEnd = followUp.timestampEnd; 
        expect(cooldownEnd - cooldownStart).to.equal(6000); 
    });

});