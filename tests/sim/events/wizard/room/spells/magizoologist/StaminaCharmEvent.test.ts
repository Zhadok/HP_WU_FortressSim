
import { expect } from "chai";
import { TestData } from "../../../../../../TestData";
import { StaminaCharmEvent } from "../../../../../../../src/sim/events/wizard/room/spells/magizoologist/StaminaCharmEvent";
import focusCostData from "../../../../../../../src/data/focusCosts.json";

describe("StaminaCharmEvent", function() {


    it("staminaCharmEvent_apply", function() {
        let wizard = TestData.buildDefaultMagizoologist();
        wizard.removeStamina(wizard.getMaxStamina() - 1);

        let event = new StaminaCharmEvent(0, 0.35, wizard, wizard);
        event.onFinish();

        expect(wizard.getCurrentStamina()).to.equal(Math.ceil(1 + wizard.getMaxStamina() * 0.35));
        expect(wizard.getFocus()).to.equal(wizard.stats.initialFocus - focusCostData.staminaCharm);

    });

});