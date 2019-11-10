import { CombatSpellCastEnemyEvent } from "../../../../../src/sim/events/wizard/combat/CombatSpellCastEnemyEvent";

import { TestData } from "../../../../TestData";
import { expect } from "chai";
import { Logger } from "../../../../../src/util/Logger";
import { Wizard } from "../../../../../src/model/player/Wizard";
import { Enemy } from "../../../../../src/model/env/enemies/Enemy";
import { CombatBeginEvent } from "../../../../../src/sim/events/wizard/combat/CombatBeginEvent";


describe("EnterCombatEvent", function() {

    let wizard: Wizard; 
    let enemy: Enemy; 
    let event: CombatBeginEvent; 
    beforeEach(() => {
        wizard = TestData.buildDefaultProfessor();
        enemy = TestData.buildDefaultEnemy(); 
        event = new CombatBeginEvent(0, enemy, wizard, TestData.buildNewRNG_0()); 
    }); 

    it("potionBuffs_enterCombat_shouldBeAdded", function() {
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