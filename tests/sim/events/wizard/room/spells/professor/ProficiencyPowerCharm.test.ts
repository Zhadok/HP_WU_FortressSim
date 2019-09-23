
import { expect } from "chai";
import { TestData } from "../../../../../../TestData";
import focusCostData from "../../../../../../../src/data/focusCosts.json";
import { ProficiencyPowerCharmEvemt } from "../../../../../../../src/sim/events/wizard/room/spells/professor/ProficiencyPowerCharmEvent";

describe("ProficiencyPowerCharmEvent", function() {


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

});