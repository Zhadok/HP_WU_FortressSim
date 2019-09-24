
import { expect } from "chai";
import { TestData } from "../../../../../../TestData";
import { ReviveCharmEvent } from "../../../../../../../src/sim/events/wizard/room/spells/magizoologist/ReviveCharmEvent";
import { CombatSimulation } from "../../../../../../../src/sim/CombatSimulation";
import { WizardDefeatEvent } from "../../../../../../../src/sim/events/wizard/combat/WizardDefeatEvent";
import { WizardReviveEvent } from "../../../../../../../src/sim/events/wizard/room/WizardReviveEvent";
import focusCostData from "../../../../../../../src/data/focusCosts.json";


describe("ReviveCharmEvent", function() {


    it("reviveCharmEvent_focusCost", function() {
        let wizard = TestData.buildDefaultMagizoologist();
        let deadWizard = TestData.buildDefaultAuror();
        deadWizard.removeStamina(999);

        let event = new ReviveCharmEvent(0, deadWizard, wizard);
        event.onFinish();

        expect(wizard.getFocus()).to.equal(wizard.stats.initialFocus - focusCostData.reviveCharm);
    });

    
    it("combatSimulation_deadAndRevive_eventOrder", async function() {
        let sim1 = new CombatSimulation(TestData.buildDefaultSimParametersTwoWizards(), TestData.buildNewRNG_0());
        let enemy = TestData.buildDefaultEnemy();
        sim1.addEnemyToActive(enemy);

        expect(sim1.eventQueue).to.be.empty;
        let deadWizard = sim1.wizards[0];
        deadWizard.removeStamina(999);
        expect(deadWizard.getIsDefeated()).to.be.true;

        // Would be pushed when wizard died
        let wizardDefeatEvent = new WizardDefeatEvent(0, enemy, deadWizard, TestData.buildNewRNG_0());
        expect(wizardDefeatEvent.hasFollowupEvent()).to.be.false;

        sim1.addEvent(wizardDefeatEvent);
        expect(sim1.peekNextEvent().timestampEnd).to.equal(sim1.fortressRoom.computeKnockoutTime());

        let usefulWizard = sim1.wizards[1];
        let reviveCharmEvent = new ReviveCharmEvent(500, deadWizard, usefulWizard);
        sim1.addEvent(reviveCharmEvent);
        expect(sim1.peekNextEvent() instanceof ReviveCharmEvent).to.be.true;

        await sim1.processNextEvent(); // Process ReviveCharmEvent
        expect(usefulWizard.getFocus()).to.equal(usefulWizard.stats.initialFocus - focusCostData.reviveCharm);
        expect(sim1.peekNextEvent() instanceof WizardReviveEvent).to.be.true;

        await sim1.processNextEvent(); // Process WizardReviveEvent
        expect(deadWizard.getCurrentStamina()).to.equal(deadWizard.getMaxStamina());
        expect(deadWizard.getIsDefeated()).to.be.false;
        expect(reviveCharmEvent.allowWizardFollowupAction()).to.be.true; // Dead wizard should be allowed a followup action        
        expect(wizardDefeatEvent.allowWizardFollowupAction()).to.be.false; // After revived there should be no allowed followup action from original defeat event

    });

});