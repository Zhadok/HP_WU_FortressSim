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
        wizard.setTrigger("defenceCharm", 1);

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
    

});