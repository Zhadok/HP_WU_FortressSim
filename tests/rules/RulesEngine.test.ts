import { RulesEngine } from "../../src/rules/RulesEngine";
import { TestData } from "../TestData";
import { expect } from "chai";
import * as chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { fail } from "assert";
import { Professor } from "../../src/model/player/Professor";
import { Enemy } from "../../src/model/env/enemies/Enemy";
import { ruleFactType } from "../../src/types";
import { EnterCombatEvent } from "../../src/sim/events/wizard/combat/EnterCombatEvent";
import { DefenceCharmEvent } from "../../src/sim/events/wizard/room/spells/professor/DefenceCharmEvent";
import { SimEvent } from "../../src/sim/events/SimEvent";
import { CombatSpellCircleEvent } from "../../src/sim/events/wizard/combat/CombatSpellCircleEvent";
import { MendingCharmEvent } from "../../src/sim/events/wizard/room/spells/professor/MendingCharmEvent";
import { InvigorationPotionEvent } from "../../src/sim/events/wizard/potions/InvigorationPotionEvent";
import { ExstimuloPotionEvent } from "../../src/sim/events/wizard/potions/ExstimuloPotionEvent";

// https://github.com/domenic/chai-as-promised/issues/192
before(() => {
    chai.should();
    chai.use(chaiAsPromised);
});

describe("RulesEngine", function() {

    let wizard: Professor;
    let enemy: Enemy; 
    let rng = TestData.buildNewRNG_0();
    let facts: ruleFactType;
    let rulesEngine: RulesEngine;
    this.beforeEach(() => {
        wizard = TestData.buildDefaultProfessor();
        wizard.setPotions(TestData.buildDefaultPotionParameters_noPotions()); 
        enemy = TestData.buildDefaultEnemy();
        facts = {
            wizard: wizard,
            highestPriorityAvailableEnemy: enemy,
            allWizards: [wizard]
        };
        rulesEngine = new RulesEngine(wizard.nameClass, rng);

    });

    it("professor_notEnoughFocusDefenceCharm", function()  {
        
        wizard.inCombat = false; 
        wizard.removeFocus(wizard.getFocus());
        wizard.hasDefenceCharm = false;
        wizard.setTrigger("defenceCharm", 1);

        return rulesEngine.getNextAction(0, facts).then(simEvent => {
            expect(simEvent instanceof EnterCombatEvent).to.be.true; 
        });

    });
    it("professor_castDefenceCharm", function()  {
        wizard.inCombat = false; 
        wizard.addFocus(3);
        wizard.hasDefenceCharm = false;
        wizard.setTrigger("defenceCharm", 0.16);

        expect(wizard.hasStudiedDefenceCharm()).to.be.true; 

        return rulesEngine.getNextAction(0, facts).then(simEvent => {
            expect(simEvent instanceof DefenceCharmEvent).to.be.true; 
            expect((simEvent as DefenceCharmEvent).targetWizard).to.equal(wizard);
            expect((simEvent as DefenceCharmEvent).defenceIncrease).to.equal(wizard.stats.defenceCharmIncrease);
        });
    });

    it("professor_shouldEnterCombat", function() {
        wizard.inCombat = false; 
        enemy.inCombat = false; 
        wizard.removeFocus(wizard.getFocus());

        return rulesEngine.getNextAction(0, facts).then(simEvent => {
            expect(simEvent instanceof EnterCombatEvent).to.be.true; 
            expect((simEvent as EnterCombatEvent).wizard).to.equal(wizard);
            expect((simEvent as EnterCombatEvent).enemy).to.equal(enemy);
        });
    })
    it("professor_shouldCombatSpellCast", function() {
        wizard.inCombatWith = enemy;
        wizard.inCombat = true; 
        enemy.inCombatWith = wizard;
        enemy.inCombat = true;

        return rulesEngine.getNextAction(0, facts).then(simEvent => {
            expect(simEvent instanceof CombatSpellCircleEvent).to.be.true; 
            expect((simEvent as CombatSpellCircleEvent).wizard).to.equal(wizard);
            expect((simEvent as CombatSpellCircleEvent).enemy).to.equal(enemy);
        }); 
    });
    it("professor_shouldCastMendingCharm", function() {
        wizard.inCombat = false;
        wizard.removeFocus(wizard.getFocus());
        facts.highestPriorityAvailableEnemy = null;

        return rulesEngine.getNextAction(0, facts).then(simEvent => {
            expect(simEvent instanceof MendingCharmEvent).to.be.true; 
            expect((simEvent as MendingCharmEvent).wizard).to.equal(wizard);
            expect((simEvent as MendingCharmEvent).targetWizard).to.equal(wizard);
        }); 
    });

    it("professor_shouldDrink_strongInvigorationPotion", function() {
        wizard.inCombat = false;
        wizard.removeFocus(wizard.getFocus());
        wizard.getPotions().nStrongInvigorationAvailable = 1; 

        return rulesEngine.getNextAction(0, facts).then(simEvent => {
            expect(simEvent instanceof InvigorationPotionEvent).to.be.true; 
            expect((simEvent as InvigorationPotionEvent).focusReward).to.equal(3); 
        }); 
    });
    it("professor_shouldDrink_weakInvigorationPotion", function() {
        wizard.inCombat = false;
        wizard.removeFocus(wizard.getFocus());
        wizard.getPotions().nWeakInvigorationAvailable = 1; 

        return rulesEngine.getNextAction(0, facts).then(simEvent => {
            expect(simEvent instanceof InvigorationPotionEvent).to.be.true; 
            expect((simEvent as InvigorationPotionEvent).focusReward).to.equal(1); 
        }); 
    });
    it("professor_shouldDrink_potentExstimuloPotion", function() {
        wizard.inCombatWith = enemy;
        wizard.inCombat = true; 
        enemy.inCombatWith = wizard;
        enemy.inCombat = true;
        wizard.getPotions().nPotentExstimuloAvailable = 1; 

        return rulesEngine.getNextAction(0, facts).then(simEvent => {
            console.log(simEvent); 
            expect(simEvent instanceof ExstimuloPotionEvent).to.be.true; 
            expect((simEvent as ExstimuloPotionEvent).damageBuff).to.equal(2.25); 
            expect((simEvent as ExstimuloPotionEvent).uses).to.equal(5); 
        }); 
    });
    /*it("professor_shouldDrink_strongExstimuloPotion", function() {
        wizard.inCombatWith = enemy;
        wizard.inCombat = true; 
        enemy.inCombatWith = wizard;
        enemy.inCombat = true;
        wizard.getPotions().nStrongExstimuloAvailable = 1; 

        return rulesEngine.getNextAction(0, facts).then(simEvent => {
            expect(simEvent instanceof ExstimuloPotionEvent).to.be.true; 
            expect((simEvent as ExstimuloPotionEvent).damageBuff).to.equal(1.25); 
            expect((simEvent as ExstimuloPotionEvent).uses).to.equal(4); 
        }); 
    });
    it("professor_shouldDrink_exstimuloPotion", function() {
        wizard.inCombatWith = enemy;
        wizard.inCombat = true; 
        enemy.inCombatWith = wizard;
        enemy.inCombat = true;
        wizard.getPotions().nExstimuloAvailable = 1; 

        return rulesEngine.getNextAction(0, facts).then(simEvent => {
            expect(simEvent instanceof ExstimuloPotionEvent).to.be.true; 
            expect((simEvent as ExstimuloPotionEvent).damageBuff).to.equal(0.5); 
            expect((simEvent as ExstimuloPotionEvent).uses).to.equal(3); 
        }); 
    });*/

    it("professor_shouldNotDrink_alreadyApplied", function() {
        wizard.inCombatWith = enemy;
        wizard.inCombat = true; 
        enemy.inCombatWith = wizard;
        enemy.inCombat = true;
        enemy.applyExstimuloPotion(wizard.playerIndex, 5, 2.25); 
        wizard.getPotions().nExstimuloAvailable = 1; 

        return rulesEngine.getNextAction(0, facts).then(simEvent => {
            expect(simEvent instanceof ExstimuloPotionEvent).to.be.true; 
            expect((simEvent as ExstimuloPotionEvent).damageBuff).to.equal(0.5); 
            expect((simEvent as ExstimuloPotionEvent).uses).to.equal(3); 
        }); 
    });
});