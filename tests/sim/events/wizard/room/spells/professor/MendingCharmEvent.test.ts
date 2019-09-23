
import { expect } from "chai";
import { MendingCharmEvent } from "../../../../../../../src/sim/events/wizard/room/spells/professor/MendingCharmEvent";
import { TestData } from "../../../../../../TestData";


describe("MendingCharmEvent", function() {


    it("shouldRestoreHP", function() {
        let wizard = TestData.buildDefaultProfessor();
        wizard.removeStamina(10);

        let event = new MendingCharmEvent(0, 4, wizard, wizard);
        event.onFinish();

        expect(wizard.getCurrentStamina()).to.equal(wizard.getMaxStamina() - 6);
    });

});