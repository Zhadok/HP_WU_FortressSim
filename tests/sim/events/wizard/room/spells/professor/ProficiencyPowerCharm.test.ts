
import { expect } from "chai";
import { TestData } from "../../../../../../TestData";
import focusCostData from "../../../../../../../src/data/focusCosts.json";
import { ProficiencyPowerCharmEvemt } from "../../../../../../../src/sim/events/wizard/room/spells/professor/ProficiencyPowerCharmEvent";
import { Professor } from "../../../../../../../src/model/player/Professor";

describe("ProficiencyPowerCharmEvent", function() {

    let wizard: Professor; 
    beforeEach(() => {
        wizard = TestData.buildDefaultProfessor(); 
    });

    it("proficiencyPowerCharm_apply", function() {
        let wizards = [
            TestData.buildDefaultProfessor(),
            TestData.buildDefaultProfessor(),
            TestData.buildDefaultProfessor(),
            TestData.buildDefaultProfessor()
        ]
        let caster = wizards[0];
        caster.addFocus(999);

        let event = new ProficiencyPowerCharmEvemt(0, 0.5, wizards, caster);
        event.onFinish();

        expect(caster.getFocus()).to.equal(caster.stats.maxFocus - focusCostData.proficiencyPowerCharm);
        for (let wizard of wizards) {
            expect(wizard.hasProficiencyPowerCharm);
            expect(wizard.proficiencyPowerCharmValue).to.equal(0.5);
        }
    });

    it("proficiencyPowerCharm_noFocusRemoved_IfAlreadyApplied", function() {
        let wizards = [wizard]
        wizard.addFocus(999);
        wizard.hasProficiencyPowerCharm = true; 
        wizard.proficiencyPowerCharmValue = wizard.stats.proficiencyPowerCharmIncrease; 

        let event = new ProficiencyPowerCharmEvemt(0, wizard.stats.proficiencyPowerCharmIncrease, wizards, wizard);
        event.onFinish();

        expect(wizard.getFocus()).to.equal(wizard.stats.maxFocus);
        for (let wizard of wizards) {
            expect(wizard.hasProficiencyPowerCharm).to.be.true;
            expect(wizard.proficiencyPowerCharmValue).to.equal(wizard.stats.proficiencyPowerCharmIncrease);
        }
    });

});