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
import { CombatSpellCircleEvent } from "../../src/sim/events/wizard/combat/CombatSpellCircleEvent";
import { MendingCharmEvent } from "../../src/sim/events/wizard/room/spells/professor/MendingCharmEvent";
import { InvigorationPotionEvent } from "../../src/sim/events/wizard/potions/InvigorationPotionEvent";
import { ExstimuloPotionEvent } from "../../src/sim/events/wizard/potions/ExstimuloPotionEvent";
import { WitSharpeningPotionEvent } from "../../src/sim/events/wizard/potions/WitSharpeningPotionEvent";
import { HealthPotionEvent } from "../../src/sim/events/wizard/potions/HealthPotionEvent";

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
            lowestHPWizard: wizard, 
            highestPriorityAvailableEnemy: enemy,
            allWizards: [wizard],
            allActiveEnemies: [enemy],
            chamber: {
                currentTimeSeconds: 0,
                remainingTimeSeconds: 600,
                remainingEnemies: 10,
                isAnyWizardDefeated: false,
                numberOfWizards: 1,
                isAnyActiveEnemyElite: false
            }
        };
        rulesEngine = RulesEngine.buildFromStandard(wizard.nameClass, rng);
    });

    it("shouldOrderConditionPathsProperly", function() {
        let allowedFactObjects = RulesEngine.allowedFactObjects; 
        //console.log(allowedFactObjects.wizard); 
    })

});