import { RulesEngine } from "../../src/rules/action/RulesEngine";
import { TestData } from "../TestData";
import { expect } from "chai";
import * as chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { fail } from "assert";
import { Auror } from "../../src/model/player/Auror";
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
import { WeakeningHexEvent } from "../../src/sim/events/wizard/room/spells/auror/WeakeningHexEvent";
import { ConfusionHexEvent } from "../../src/sim/events/wizard/room/spells/auror/ConfusionHexEvent";

// https://github.com/domenic/chai-as-promised/issues/192
before(() => {
    chai.should();
    chai.use(chaiAsPromised);
});

describe("RulesEngine_Auror", function() {

    let wizard: Auror;
    let enemy: Enemy; 
    let rng = TestData.buildNewRNG_0();
    let facts: ruleFactType;
    let rulesEngine: RulesEngine;
    this.beforeEach(() => {
        wizard = TestData.buildDefaultAuror(); 
        wizard.setPotions(TestData.buildDefaultPotionParameters_noPotions()); 
        enemy = TestData.buildDefaultEnemy();
        facts = TestData.buildDefaultRuleFacts(wizard, enemy); 
        rulesEngine = RulesEngine.buildFromStandard(wizard.nameClass, rng);

    });

    

    it("auror_castWeakeningHex", function() {
        wizard.inCombat = false; 
        wizard.addFocus(3);
        enemy.hasWeakeningHex = false; 
        wizard.setTrigger("weakeningHex", 0.5);

        expect(wizard.hasStudiedWeakeningHex()).to.be.true; 

        return rulesEngine.getNextAction(0, facts).then(simEvent => {
            expect(simEvent instanceof WeakeningHexEvent).to.be.true; 
            expect((simEvent as WeakeningHexEvent).targetEnemy).to.equal(enemy);
            expect((simEvent as WeakeningHexEvent).powerDecreasePercent).to.equal(wizard.stats.weakeningHexValue);
        });
    });
    it("auror_notEnoughFocusWeakeningHex", function()  {
        
        wizard.inCombat = false; 
        wizard.removeFocus(wizard.getFocus());
        enemy.hasWeakeningHex = false; 
        wizard.setTrigger("weakeningHex", 0.5); 

        return rulesEngine.getNextAction(0, facts).then(simEvent => {
            expect(simEvent instanceof EnterCombatEvent).to.be.true; 
        });

    });
    it("auror_notStudiedWeakeningHex", function()  {
        wizard.setTrigger("weakeningHex", null); 
        wizard.inCombat = false; 
        enemy.hasWeakeningHex = false; 

        return rulesEngine.getNextAction(0, facts).then(simEvent => {
            expect(simEvent instanceof WeakeningHexEvent).to.be.false; 
        });
    });

    it("auror_castConfusionHex", function() {
        wizard.inCombat = false; 
        enemy.hasWeakeningHex = true;
        enemy.hasConfusionHex = false; 
        wizard.setTrigger("confusionHex", 0.5);

        expect(wizard.hasStudiedConfusionHex()).to.be.true; 

        return rulesEngine.getNextAction(0, facts).then(simEvent => {
            expect(simEvent instanceof ConfusionHexEvent).to.be.true; 
            expect((simEvent as ConfusionHexEvent).targetEnemy).to.equal(enemy);
            expect((simEvent as ConfusionHexEvent).confusionHexValue).to.equal(wizard.stats.confusionHexValue);
        });
    });
    it("auror_notStudiedConfusionHex", function()  {
        wizard.setTrigger("weakeningHex", null); 
        wizard.setTrigger("confusionHex", null); 
        wizard.inCombat = false; 
        enemy.hasConfusionHex = false; 
        wizard.addFocus(1); 

        return rulesEngine.getNextAction(0, facts).then(simEvent => {
            expect(simEvent instanceof ConfusionHexEvent).to.be.false; 
        });
    });

    it("auror_shouldEnterCombat", function() {
        wizard.inCombat = false; 
        enemy.inCombat = false; 
        wizard.removeFocus(wizard.getFocus());

        return rulesEngine.getNextAction(0, facts).then(simEvent => {
            expect(simEvent instanceof EnterCombatEvent).to.be.true; 
            expect((simEvent as EnterCombatEvent).wizard).to.equal(wizard);
            expect((simEvent as EnterCombatEvent).enemy).to.equal(enemy);
        });
    });
    it("auror_shouldCombatSpellCast", function() {
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
    it("auror_shouldDrink_strongInvigorationPotion", function() {
        enemy.hasConfusionHex = false; 
        enemy.hasWeakeningHex = false; 
        wizard.inCombat = false;
        wizard.removeFocus(wizard.getFocus());
        wizard.getPotions().nStrongInvigorationAvailable = 1; 

        return rulesEngine.getNextAction(0, facts).then(simEvent => {
            expect(simEvent instanceof InvigorationPotionEvent).to.be.true; 
            expect((simEvent as InvigorationPotionEvent).focusReward).to.equal(3); 
        }); 
    });
    it("auror_shouldDrink_weakInvigorationPotion", function() {
        enemy.hasConfusionHex = false; 
        enemy.hasWeakeningHex = false; 
        wizard.inCombat = false;
        wizard.removeFocus(wizard.getFocus());
        wizard.getPotions().nWeakInvigorationAvailable = 1; 

        return rulesEngine.getNextAction(0, facts).then(simEvent => {
            expect(simEvent instanceof InvigorationPotionEvent).to.be.true; 
            expect((simEvent as InvigorationPotionEvent).focusReward).to.equal(1); 
        }); 
    });
    it("auror_shouldDrink_potentExstimuloPotion", function() {
        wizard.inCombatWith = enemy;
        wizard.inCombat = true; 
        enemy.inCombatWith = wizard;
        enemy.inCombat = true;
        wizard.getPotions().nPotentExstimuloAvailable = 1; 

        return rulesEngine.getNextAction(0, facts).then(simEvent => {
            expect(simEvent instanceof ExstimuloPotionEvent).to.be.true; 
            expect((simEvent as ExstimuloPotionEvent).damageBuff).to.equal(2.25); 
            expect((simEvent as ExstimuloPotionEvent).uses).to.equal(5); 
        }); 
    });
    it("auror_shouldDrink_strongExstimuloPotion", function() {
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
    it("auror_shouldDrink_exstimuloPotion", function() {
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
    });
    it("auror_shouldNotDrinkExstimulo_alreadyApplied", function() {
        wizard.inCombatWith = enemy;
        wizard.inCombat = true; 
        enemy.inCombatWith = wizard;
        enemy.inCombat = true;
        wizard.applyExstimuloPotion(5, 2.25); 
        wizard.getPotions().nPotentExstimuloAvailable = 1; 
        wizard.getPotions().nStrongExstimuloAvailable = 1; 
        wizard.getPotions().nExstimuloAvailable = 1; 
        
        return rulesEngine.getNextAction(0, facts).then(simEvent => {
            expect(simEvent instanceof ExstimuloPotionEvent).to.be.false; 
        }); 
    });
    it("auror_shouldDrink_witSharpeningPotion", function() {
        let eliteEnemy = TestData.buildDefaultEnemyElite(); 
        wizard.inCombatWith = eliteEnemy;
        wizard.inCombat = true; 
        eliteEnemy.inCombatWith = wizard;
        eliteEnemy.inCombat = true;
        wizard.getPotions().nWitSharpeningAvailable = 1; 

        return rulesEngine.getNextAction(0, facts).then(simEvent => {
            expect(simEvent instanceof WitSharpeningPotionEvent).to.be.true; 
            expect((simEvent as WitSharpeningPotionEvent).damageBuff).to.equal(0.5); 
            expect((simEvent as WitSharpeningPotionEvent).uses).to.equal(3); 
        }); 
    });

    it("auror_shouldNotDrinkWitSharpening_alreadyApplied", function() {
        let eliteEnemy = TestData.buildDefaultEnemyElite(); 
        let event = new WitSharpeningPotionEvent(0, wizard, eliteEnemy, 0.5, 3, TestData.buildDefaultPotionParameters()); 
        event.onFinish(); 
        expect(wizard.getWitSharpeningDamageBuff(eliteEnemy)).to.equal(0.5); 

        wizard.inCombatWith = eliteEnemy;
        wizard.inCombat = true; 
        eliteEnemy.inCombatWith = wizard;
        eliteEnemy.inCombat = true;
        wizard.getPotions().nWitSharpeningAvailable = 1; 

        return rulesEngine.getNextAction(0, facts).then(simEvent => {
            expect(simEvent).to.not.be.instanceOf(WitSharpeningPotionEvent); 
        }); 
    })
    it("auror_shouldNotDrinkWitSharpening_notElite", function() {
        wizard.inCombatWith = enemy;
        wizard.inCombat = true; 
        enemy.inCombatWith = wizard;
        enemy.inCombat = true;
        wizard.getPotions().nWitSharpeningAvailable = 1; 

        return rulesEngine.getNextAction(0, facts).then(simEvent => {
            expect(simEvent).to.not.be.instanceOf(WitSharpeningPotionEvent); 
        }); 
    });
    it("auror_shouldDrink_healthPotion", function() {
        wizard.inCombatWith = enemy;
        wizard.inCombat = true; 
        enemy.inCombatWith = wizard;
        enemy.inCombat = true;
        wizard.getPotions().nHealingPotionsAvailable = 1; 
        wizard.removeStamina(wizard.getMaxStamina() * 0.4); // wizard is at 60% hp

        return rulesEngine.getNextAction(0, facts).then(simEvent => {
            expect(simEvent).to.be.instanceOf(HealthPotionEvent); 
            expect((simEvent as HealthPotionEvent).staminaRestorePercent).to.equal(0.35); 
        }); 
    });
    it("auror_shouldNotDrink_healthPotion", function () {
        wizard.inCombatWith = enemy;
        wizard.inCombat = true; 
        enemy.inCombatWith = wizard;
        enemy.inCombat = true;
        wizard.getPotions().nHealingPotionsAvailable = 1; 

        // Wizard is at 100% hp
        return rulesEngine.getNextAction(0, facts).then(simEvent => {
            expect(simEvent).to.not.be.instanceOf(HealthPotionEvent); 
        }); 
    });



}); 