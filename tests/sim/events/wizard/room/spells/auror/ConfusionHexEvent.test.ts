
import { expect } from "chai";
import { TestData } from "../../../../../../TestData";
import { WeakeningHexEvent } from "../../../../../../../src/sim/events/wizard/room/spells/auror/WeakeningHexEvent";
import focusCostData from "../../../../../../../src/data/focusCosts.json";
import { CombatSpellCastEnemyEvent } from "../../../../../../../src/sim/events/wizard/combat/CombatSpellCastEnemyEvent";
import { ConfusionHexEvent } from "../../../../../../../src/sim/events/wizard/room/spells/auror/ConfusionHexEvent";
import { CombatSpellCastWizardEvent } from "../../../../../../../src/sim/events/wizard/combat/CombatSpellCastWizardEvent";

describe("ConfusionHexEvent", function() {


    it("confusionHex_apply", function() {
        let wizard = TestData.buildDefaultAuror();
        wizard.addFocus(999);
        let enemy = TestData.buildDefaultEnemyWithDefence();

        let event = new ConfusionHexEvent(0, 0.3, enemy, wizard);
        event.onFinish();

        expect(enemy.hasConfusionHex).to.be.true;
        expect(enemy.confusionHexValue).to.equal(0.3);
        expect(wizard.getFocus()).to.equal(wizard.stats.maxFocus - focusCostData.confusionHex);
    });

    it("confusionHex_lessDamage", function() {
        let wizard = TestData.buildDefaultProfessor();
        wizard.stats.defenceBreach = 0;
        wizard.stats.proficiencyPower = 0;
        let enemy = TestData.buildDefaultEnemy();
        enemy.stats.defence = 0.3;

        let previousDamageAgainstEnemy = CombatSpellCastWizardEvent.computeWizardDamage(wizard, enemy, 0);

        let event = new ConfusionHexEvent(0, 0.3, enemy, wizard);
        event.onFinish();

        let newDamageAgainstEnemy = CombatSpellCastWizardEvent.computeWizardDamage(wizard, enemy, 0);

        console.log("Previous damage: " + previousDamageAgainstEnemy + 
                    ", expectedDamage: " + Math.ceil(previousDamageAgainstEnemy / (1-0.3)) + 
                    ", newDamage: " + newDamageAgainstEnemy);    

        expect(Math.ceil(previousDamageAgainstEnemy / (1-0.3))).to.equal(newDamageAgainstEnemy);
    });

});