
import { expect } from "chai";
import { TestData } from "../../../../../../TestData";
import { WeakeningHexEvent } from "../../../../../../../src/sim/events/wizard/room/spells/auror/WeakeningHexEvent";
import focusCostData from "../../../../../../../src/data/focusCosts.json";
import { CombatSpellCastEnemyEvent } from "../../../../../../../src/sim/events/wizard/combat/CombatSpellCastEnemyEvent";
import { FocusCharmEvent } from "../../../../../../../src/sim/events/wizard/room/spells/auror/FocusCharmEvent";

describe("FocusCharmEvent", function() {


    it("focusCharm_apply", function() {
        let caster = TestData.buildDefaultAuror();
        let targetWizard = TestData.buildDefaultProfessor();

        let event = new FocusCharmEvent(0, 1, targetWizard, caster);
        event.onFinish();

        expect(targetWizard.getFocus()).to.equal(targetWizard.stats.initialFocus + event.focusIncrease);
        expect(caster.getFocus()).to.equal(caster.stats.initialFocus - focusCostData.focusCharm);
    });

});