import { CombatSpellCastEnemyEvent } from "../../../../../src/sim/events/wizard/combat/CombatSpellCastEnemyEvent";

import { TestData } from "../../../../TestData";
import { expect } from "chai";
import { Logger } from "../../../../../src/util/Logger";
import { Wizard } from "../../../../../src/model/player/Wizard";
import { Enemy } from "../../../../../src/model/env/enemies/Enemy";
import { ExitCombatEvent } from "../../../../../src/sim/events/wizard/combat/ExitCombatEvent";


describe("ExitCombatEvent", function() {

    let wizard: Wizard; 
    let enemy: Enemy; 
    let event: ExitCombatEvent; 
    beforeEach(() => {
        wizard = TestData.buildDefaultProfessor();
        enemy = TestData.buildDefaultEnemy(); 
        wizard.inCombat = true; 
        wizard.inCombatWith = enemy; 
        enemy.inCombat = true; 
        enemy.inCombatWith = wizard; 
        event = new ExitCombatEvent(0, enemy, wizard, TestData.buildNewRNG_0()); 
    }); 

    // Changed in v2.6.0: On exit combat potion buffs should be KEPT
    it("potionBuffs_exitCombat_shouldBeRemoved", function() {
        // Wizard died and enemy still had exstimulo potion buff
        // Should be readded
        wizard.applyExstimuloPotion(5, 2.25); 
        wizard.applyWitSharpeningPotion(3, 0.5); 

        event.onStart(); 
        event.onFinish(); 

        expect(wizard.exstimuloPotionDamageBuff).to.equal(2.25); 
        expect(wizard.witSharpeningPotionDamageBuff).to.equal(0.5); 
    });



}); 