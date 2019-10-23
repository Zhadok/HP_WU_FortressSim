
import { expect } from "chai";
import { TestData } from "../../../../../../TestData";
import { StaminaCharmEvent } from "../../../../../../../src/sim/events/wizard/room/spells/magizoologist/StaminaCharmEvent";
import focusCostData from "../../../../../../../src/data/focusCosts.json";

describe("StaminaCharmEvent", function() {


    it("staminaCharmEvent_apply", function() {
        let targetWizard = TestData.buildDefaultAuror(); 
        let wizard = TestData.buildDefaultMagizoologist();
        targetWizard.removeStamina(wizard.getMaxStamina() - 1);

        let event = new StaminaCharmEvent(0, 0.35, targetWizard, wizard);
        event.onFinish();

        expect(targetWizard.getCurrentStamina()).to.equal(Math.ceil(1 + targetWizard.getMaxStamina() * 0.35));
        expect(wizard.getFocus()).to.equal(wizard.stats.initialFocus - focusCostData.staminaCharm);
    });

});