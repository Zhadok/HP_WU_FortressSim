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

    it("potionBuffs_exitCombat_shouldBeRemoved", function() {
        // Wizard died and enemy still had exstimulo potion buff
        // Should be readded
        enemy.applyExstimuloPotion(wizard, 5, 2.25); 
        enemy.applyWitSharpeningPotion(wizard, 3, 0.5); 

        event.onStart(); 
        event.onFinish(); 

        expect(wizard.exstimuloPotionDamageBuff).to.equal(0); 
        expect(wizard.witSharpeningPotionDamageBuff).to.equal(0); 
    });



}); 