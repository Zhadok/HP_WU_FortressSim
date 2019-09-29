
import { expect } from "chai";
import { TestData } from "../../../../../../TestData";
import focusCostData from "../../../../../../../src/data/focusCosts.json";
import potionData from "../../../../../../../src/data/potions.json";

import { BraveryCharmEvent } from "../../../../../../../src/sim/events/wizard/room/spells/magizoologist/BraveryCharmEvent";
import { CombatSpellCastWizardEvent } from "../../../../../../../src/sim/events/wizard/combat/CombatSpellCastWizardEvent";
import { ExstimuloPotionEvent } from "../../../../../../../src/sim/events/wizard/potions/ExstimuloPotionEvent";
import { WitSharpeningPotionEvent } from "../../../../../../../src/sim/events/wizard/potions/WitSharpeningPotionEvent";

describe("BraveryCharmEvent", function() {


    it("braveryCharm_apply", function() {
        let wizards = [
            TestData.buildDefaultMagizoologist(),
            TestData.buildDefaultMagizoologist(),
            TestData.buildDefaultMagizoologist(),
            TestData.buildDefaultMagizoologist()
        ]
        let caster = wizards[0];
        caster.addFocus(999);

        let event = new BraveryCharmEvent(0, 1.5, wizards, caster);
        event.onFinish();

        expect(caster.getFocus()).to.equal(caster.stats.maxFocus - focusCostData.braveryCharm);
        for (let wizard of wizards) {
            expect(wizard.hasBraveryCharm);
            expect(wizard.braveryCharmValue).to.equal(1.5);
        }
    });

    it("braveryCharm_damageIncrease_againstElite", function() {
        let wizard = TestData.buildDefaultMagizoologist();
        let enemy = TestData.buildDefaultEnemyElite();

        wizard.addFocus(999);

        let previousDamage = CombatSpellCastWizardEvent.computeWizardDamage(wizard, enemy, 0);

        let event = new BraveryCharmEvent(0, 1.5, [wizard], wizard);
        event.onFinish();

        let newDamage = CombatSpellCastWizardEvent.computeWizardDamage(wizard, enemy, 0);

        expect(Math.ceil(previousDamage*(1+1.5))).to.equal(newDamage);
    });

    it("braveryCharm_damageIncrease_againstNonElite", function() {
        let wizard = TestData.buildDefaultMagizoologist();
        let enemy = TestData.buildDefaultEnemy();

        wizard.addFocus(999);

        let previousDamage = CombatSpellCastWizardEvent.computeWizardDamage(wizard, enemy, 0);

        let event = new BraveryCharmEvent(0, 1.5, [wizard], wizard);
        event.onFinish();

        let newDamage = CombatSpellCastWizardEvent.computeWizardDamage(wizard, enemy, 0);

        expect(previousDamage).to.equal(newDamage);
    });


    it("braveryCharm_damageIncrease_withExstimuloPotion", function() {
        let wizard = TestData.buildDefaultMagizoologist();
        let potions = TestData.buildDefaultPotionParameters();
        let enemy = TestData.buildDefaultEnemyElite();

        wizard.addFocus(999);

        let previousDamage = CombatSpellCastWizardEvent.computeWizardDamage(wizard, enemy, 0);

        let eventBraveryCharm = new BraveryCharmEvent(0, 1.5, [wizard], wizard);
        eventBraveryCharm.onFinish();

        let eventPotion = new ExstimuloPotionEvent(0, wizard, enemy, potions, potionData.potentExstimuloPotionDamageBuff, potionData.potentExstimuloPotionUses, "potent");
        eventPotion.onFinish();

        let newDamage = CombatSpellCastWizardEvent.computeWizardDamage(wizard, enemy, 0);

        expect(Math.ceil(previousDamage * (1+2.25+1.5))).to.equal(newDamage);
    });

    it("braveryCharm_damageIncrease_withExstimuloPotion_withWitSharpeningPotion", function() {
        let wizard = TestData.buildDefaultMagizoologist();
        let potions = TestData.buildDefaultPotionParameters();
        let enemy = TestData.buildDefaultEnemyElite();

        wizard.addFocus(999);

        let previousDamage = CombatSpellCastWizardEvent.computeWizardDamage(wizard, enemy, 0);

        let eventBraveryCharm = new BraveryCharmEvent(0, 1.5, [wizard], wizard);
        eventBraveryCharm.onFinish();

        let eventPotion = new ExstimuloPotionEvent(0, wizard, enemy, potions, potionData.potentExstimuloPotionDamageBuff, potionData.potentExstimuloPotionUses, "potent");
        eventPotion.onFinish();
        let eventPotion2 = new WitSharpeningPotionEvent(0, wizard, enemy, potionData.witSharpeningPotionDamageBuff, potionData.witSharpeningPotionUses, potions);
        eventPotion2.onFinish();

        let newDamage = CombatSpellCastWizardEvent.computeWizardDamage(wizard, enemy, 0);

        expect(Math.ceil(previousDamage * (1+2.25+0.5+1.5))).to.equal(newDamage);
    });

});