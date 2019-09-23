
import { expect } from "chai";
import { TestData } from "../../../../../../TestData";
import focusCostData from "../../../../../../../src/data/focusCosts.json";
import { ProficiencyPowerCharmEvemt } from "../../../../../../../src/sim/events/wizard/room/spells/professor/ProficiencyPowerCharmEvent";
import { DefenceCharmEvent } from "../../../../../../../src/sim/events/wizard/room/spells/professor/DefenceCharmEvent";
import { CombatSpellCastEnemyEvent } from "../../../../../../../src/sim/events/wizard/combat/CombatSpellCastEnemyEvent";

describe("DefenceCharmEvent", function() {


    it("defenceCharm_apply", function() {
        let wizard = TestData.buildDefaultProfessor();
        wizard.addFocus(999);

        let event = new DefenceCharmEvent(0, 0.3, wizard, wizard);
        event.onFinish();

        expect(wizard.getFocus()).to.equal(wizard.stats.maxFocus - focusCostData.defenceCharm);
        expect(wizard.hasDefenceCharm);
        expect(wizard.defenceCharmValue).to.equal(0.3);
    });

    it("defenceCharm_lessDamage", function() {
        let wizard = TestData.buildDefaultProfessor();
        wizard.addFocus(999);
        let enemy = TestData.buildDefaultEnemy();

        let previousDamage = CombatSpellCastEnemyEvent.computeEnemyDamage(wizard, enemy, 0);

        let event = new DefenceCharmEvent(0, 0.3, wizard, wizard);
        event.onFinish();

        let newDamage = CombatSpellCastEnemyEvent.computeEnemyDamage(wizard, enemy, 0);

       // console.log("Previous damage: " + previousDamage + ", expected: " + (Math.ceil(previousDamage*(1-0.3))) + ", newDamage: " + newDamage);    

        expect(Math.ceil(previousDamage * (1- (wizard.stats.defence+0.3)))).to.equal(newDamage);
    });

});