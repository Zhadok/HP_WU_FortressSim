import { CombatSpellCastEnemyEvent } from "../../../../../src/sim/events/wizard/combat/CombatSpellCastEnemyEvent";

import { TestData } from "../../../../TestData";
import { expect } from "chai";
import { Logger } from "../../../../../src/util/Logger";



describe("CombatSpellCastWizardEvent", function() {


    it("enemyDamage_nonProtego", function() {
        let enemies = TestData.buildDefaultEnemies();
        let wizard = TestData.buildDefaultProfessor();
        
        let damage = CombatSpellCastEnemyEvent.computeEnemyDamage(wizard, enemies[0], 0);
        expect(damage).to.equal(8);
    });

    it("enemyDamage_withProtego", function() {
        let enemies = TestData.buildDefaultEnemies();
        let wizard = TestData.buildDefaultProfessor();
        
        let damage = CombatSpellCastEnemyEvent.computeEnemyDamage(wizard, enemies[0], 1);
        expect(damage).to.equal(6);
    });

    it("enemyDamageAfterEvent", function() {
        let enemies = TestData.buildDefaultEnemies();
        let wizard = TestData.buildDefaultProfessor();
        let rng = TestData.buildNewRNG_1(); // Ensure non-chain attack
        let event = new CombatSpellCastEnemyEvent(0, enemies[0], wizard, rng);

        event.onFinish();

        expect(wizard.getCurrentStamina()).to.equal(wizard.getMaxStamina() - 6);
    });

    it("enemyDamageAfterEvent_withDeteriorationHex", function() {
        let enemies = TestData.buildDefaultEnemies();
        let wizard = TestData.buildDefaultProfessor();
        enemies[0].hasDeteriorationHex = true;
        enemies[0].deteriorationHexDamage = 15;
        let rng = TestData.buildNewRNG_1(); // Ensure non-chain attack
        let event = new CombatSpellCastEnemyEvent(0, enemies[0], wizard, rng);

        event.onFinish();

        expect(enemies[0].getCurrentStamina()).to.equal(enemies[0].getMaxStamina() - (15));
        expect(wizard.getCurrentStamina()).to.equal(wizard.getMaxStamina() - 6);
    })

});