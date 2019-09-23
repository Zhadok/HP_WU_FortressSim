
import { expect } from "chai";
import { TestData } from "../../../../../../TestData";
import focusCostData from "../../../../../../../src/data/focusCosts.json";
import { ProficiencyPowerCharmEvemt } from "../../../../../../../src/sim/events/wizard/room/spells/professor/ProficiencyPowerCharmEvent";
import { DefenceCharmEvent } from "../../../../../../../src/sim/events/wizard/room/spells/professor/DefenceCharmEvent";
import { CombatSpellCastEnemyEvent } from "../../../../../../../src/sim/events/wizard/combat/CombatSpellCastEnemyEvent";
import { DeteriorationHexEvent } from "../../../../../../../src/sim/events/wizard/room/spells/professor/DeteriorationHexEvent";

describe("DeteriorationHexEvent", function() {

    it("deteriorationHex_apply", function() {
        let wizard = TestData.buildDefaultProfessor();
        wizard.addFocus(999);
        let enemy = TestData.buildDefaultEnemy();

        let event = new DeteriorationHexEvent(0, 40, enemy, wizard);
        event.onFinish();

        expect(enemy.hasDeteriorationHex).to.equal(true);
        expect(enemy.deteriorationHexDamage).to.equal(40);
        expect(wizard.getFocus()).to.equal(wizard.stats.maxFocus - focusCostData.deteriorationHex);
    });


});