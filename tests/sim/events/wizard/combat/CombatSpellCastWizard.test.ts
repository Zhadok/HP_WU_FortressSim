import { CombatSpellCastWizardEvent } from "../../../../../src/sim/events/wizard/combat/CombatSpellCastWizardEvent";

import { TestData } from "../../../../TestData";
import { expect } from "chai";
import Prando from "prando";



describe("CombatSpellCastWizardEvent", function() {

    it("defenceMultiplier", function() {
        let enemy = TestData.buildDefaultEnemy();
        let wizard = TestData.buildDefaultProfessor();

        expect(CombatSpellCastWizardEvent.computeDefenceMultiplier(wizard, enemy)).to.equal(1);
        
        enemy.stats.defence = 0.5;
        expect(CombatSpellCastWizardEvent.computeDefenceMultiplier(wizard, enemy)).to.equal(0.5);
       
        wizard.stats.defenceBreach = 0.3;
        expect(CombatSpellCastWizardEvent.computeDefenceMultiplier(wizard, enemy)).to.equal(0.8);
       
        wizard.stats.defenceBreach = 0.8;
        expect(CombatSpellCastWizardEvent.computeDefenceMultiplier(wizard, enemy)).to.equal(1);
    });

    it("wizardDamage_nonCrit", function() {
        let enemies = TestData.buildDefaultEnemies();
        let wizard = TestData.buildDefaultProfessor();
        
        let damage = CombatSpellCastWizardEvent.computeWizardDamage(wizard, enemies[0], 0);
        expect(damage).to.equal(wizard.stats.power);

    });
    it("wizardDamage_withCrit", function() {
        let enemies = TestData.buildDefaultEnemies();
        let wizard = TestData.buildDefaultProfessor();
        
        let damage = CombatSpellCastWizardEvent.computeWizardDamage(wizard, enemies[0], 1);
        expect(damage).to.equal(wizard.stats.power * (1+wizard.stats.criticalPower));
    });


    it("wizardDamageAfterEvent", function() {
        let enemies = TestData.buildDefaultEnemies();
        let wizard = TestData.buildDefaultProfessor();
        let rng = TestData.buildNewRNG_1(); // Ensure non-crit
        let event = new CombatSpellCastWizardEvent(0, enemies[0], wizard, rng);
        event.onFinish();

        expect(enemies[0].getCurrentStamina()).to.equal(enemies[0].stats.stamina - wizard.stats.power);
    });

    it("wizardDamageAfterEvent_withCrit", function() {
        let enemies = TestData.buildDefaultEnemies();
        let wizard = TestData.buildDefaultProfessor();
        let rng = TestData.buildNewRNG_Sequence([1, 1, 0]); // non-chain attack, non-dodge, then crit
        let event = new CombatSpellCastWizardEvent(0, enemies[0], wizard, rng);
        event.onFinish();

        expect(enemies[0].getCurrentStamina()).to.equal(enemies[0].stats.stamina - wizard.stats.power * (1+wizard.stats.criticalPower));
    });

    it("wizardDamageAfterEvent_withDeteriorationHex", function() {
        let enemies = TestData.buildDefaultEnemies();
        enemies[0].hasDeteriorationHex = true;
        enemies[0].deteriorationHexDamage = 15;
        let wizard = TestData.buildDefaultProfessor();
        let rng = TestData.buildNewRNG_1(); // Ensure non-crit
        let event = new CombatSpellCastWizardEvent(0, enemies[0], wizard, rng);

        event.onFinish();

        expect(enemies[0].getCurrentStamina()).to.equal(enemies[0].getMaxStamina() - (wizard.stats.power+15));
    });

    it("wizardDamageAfterEvent_withDodge", function() {
        let enemies = TestData.buildDefaultEnemies();
        let wizard = TestData.buildDefaultProfessor();
        let rng = TestData.buildNewRNG_0(); // Ensure dodge
        let event = new CombatSpellCastWizardEvent(0, enemies[0], wizard, rng);
        event.onFinish();

        expect(enemies[0].getCurrentStamina()).to.equal(enemies[0].getMaxStamina());
    });

    it("wizardDamageAfterEvent_withDodge_withDeteriorationHex", function() {
        let enemies = TestData.buildDefaultEnemies();
        enemies[0].hasDeteriorationHex = true;
        enemies[0].deteriorationHexDamage = 15;
        let wizard = TestData.buildDefaultProfessor();
        let rng = TestData.buildNewRNG_0(); // Ensure dodge
        let event = new CombatSpellCastWizardEvent(0, enemies[0], wizard, rng);
        event.onFinish();

        expect(enemies[0].getCurrentStamina()).to.equal(enemies[0].getMaxStamina() - 15);
    });


});

class testRNG extends Prando {

}
   
