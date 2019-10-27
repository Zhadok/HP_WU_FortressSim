import { RulesEngine } from "../../src/rules/RulesEngine";
import { TestData } from "../TestData";
import { expect } from "chai";
import * as chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { fail } from "assert";
import { Magizoologist } from "../model/player/Magizoologist";
import { Auror } from "../model/player/Auror";
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
import { ReviveCharmEvent } from "../../src/sim/events/wizard/room/spells/magizoologist/ReviveCharmEvent";
import { ExitCombatEvent } from "../../src/sim/events/wizard/combat/ExitCombatEvent";
import { StaminaCharmEvent } from "../../src/sim/events/wizard/room/spells/magizoologist/StaminaCharmEvent";

// https://github.com/domenic/chai-as-promised/issues/192
before(() => {
    chai.should();
    chai.use(chaiAsPromised);
});

describe("RulesEngine", function() {

    let wizard: Magizoologist;
    let otherWizard: Auror; 
    let enemy: Enemy; 
    let rng = TestData.buildNewRNG_0();
    let facts: ruleFactType;
    let rulesEngine: RulesEngine;
    this.beforeEach(() => {
        wizard = TestData.buildDefaultMagizoologist(); 
        wizard.setPotions(TestData.buildDefaultPotionParameters_noPotions()); 
        otherWizard = TestData.buildDefaultAuror(); 
        enemy = TestData.buildDefaultEnemy();
        facts = {
            wizard: wizard,
            lowestHPWizard: wizard,
            highestPriorityAvailableEnemy: enemy,
            allWizards: [wizard, otherWizard],
            allActiveEnemies: [enemy],
            chamber: {
                currentTimeSeconds: 0,
                remainingTimeSeconds: 600,
                remainingEnemies: 10,
                isAnyWizardDefeated: false,
                numberOfWizards: 2
            }
        };
        rulesEngine = RulesEngine.buildFromStandard(wizard.nameClass, rng);

    });

    it("magizoologist_shouldCastReviveCharm", function() {
        otherWizard.removeStamina(999); 
        facts.chamber.isAnyWizardDefeated = true; 
        wizard.addFocus(1); 

        return rulesEngine.getNextAction(0, facts).then(simEvent => {
            expect(simEvent instanceof ReviveCharmEvent).to.be.true; 
            expect((simEvent as ReviveCharmEvent).targetWizard).to.equal(otherWizard); 
            expect((simEvent as ReviveCharmEvent).reviveCharmValue).to.equal(wizard.stats.reviveCharmValue); 
        }); 
    });

    it("magizoologist_shouldNotCastReviveCharm_notEnoughFocus", function() {
        otherWizard.removeStamina(999); 
        wizard.setFocus(0); 

        return rulesEngine.getNextAction(0, facts).then(simEvent => {
            expect(simEvent instanceof ReviveCharmEvent).to.be.false; 
        }); 
    });

    it("magizoologist_shouldExitCombat_ifDeadWizard", function() {
        wizard.inCombat = true; 
        wizard.inCombatWith = enemy; 
        enemy.inCombat = true; 
        enemy.inCombatWith = wizard; 
        wizard.setFocus(1); 
        wizard.setTrigger("reviveCharm", 0.7); 
        
        facts.chamber.isAnyWizardDefeated = true; 
        otherWizard.removeStamina(999); 

        return rulesEngine.getNextAction(0, facts).then(simEvent => {
            expect(simEvent instanceof ExitCombatEvent).to.be.true; 
        }); 
    });

    it("magizoologist_shouldCastStaminaCharm", function() {
        wizard.inCombat = false; 
        facts.lowestHPWizard = wizard; 
        wizard.removeStamina(wizard.getCurrentStamina() - 1); 
        wizard.addFocus(999); 

        return rulesEngine.getNextAction(0, facts).then(simEvent => {
            expect(simEvent instanceof StaminaCharmEvent).to.be.true; 
            expect((simEvent as StaminaCharmEvent).targetWizard).to.equal(wizard); 
            expect((simEvent as StaminaCharmEvent).staminaRestorePercent).to.equal(wizard.stats.staminaCharmValue); 
        }); 
    });
    it("magizoologist_shouldCastStaminaCharm_otherWizard", function() {
        wizard.inCombat = false; 
        facts.lowestHPWizard = otherWizard; 
        otherWizard.removeStamina(otherWizard.getCurrentStamina() - 1); 
        wizard.addFocus(999); 

        return rulesEngine.getNextAction(0, facts).then(simEvent => {
            expect(simEvent instanceof StaminaCharmEvent).to.be.true; 
            expect((simEvent as StaminaCharmEvent).targetWizard).to.equal(otherWizard); 
            expect((simEvent as StaminaCharmEvent).staminaRestorePercent).to.equal(wizard.stats.staminaCharmValue); 
        }); 
    });
    it("magizoologist_shouldNotCastStaminaCharm_Overhealing", function() {
        wizard.inCombat = false; 
        facts.lowestHPWizard = wizard; 
        wizard.removeStamina(wizard.getCurrentStamina() / 10); 
        wizard.addFocus(999); 

        return rulesEngine.getNextAction(0, facts).then(simEvent => {
            expect(simEvent instanceof StaminaCharmEvent).to.be.false; 
        }); 
    });


    it("magizoologist_shouldDrink_strongInvigorationPotion_withDefeatedWizard", function() {
        facts.chamber.isAnyWizardDefeated = true; 
        wizard.inCombat = false;
        wizard.removeFocus(wizard.getFocus());
        wizard.getPotions().nStrongInvigorationAvailable = 1; 

        return rulesEngine.getNextAction(0, facts).then(simEvent => {
            expect(simEvent instanceof InvigorationPotionEvent).to.be.true; 
            expect((simEvent as InvigorationPotionEvent).focusReward).to.equal(3); 
        }); 
    });
    it("magizoologist_shouldDrink_strongInvigorationPotion_withBecomeTheBeast", function() {
        wizard.inCombat = false;
        wizard.setFocus(4); 
        wizard.getPotions().nStrongInvigorationAvailable = 1; 
        wizard.setTrigger("becomeTheBeast", 40); 

        return rulesEngine.getNextAction(0, facts).then(simEvent => {
            expect(simEvent instanceof InvigorationPotionEvent).to.be.true; 
            expect((simEvent as InvigorationPotionEvent).focusReward).to.equal(3); 
        }); 
    });
    it("magizoologist_shouldDrink_strongInvigorationPotion_withBirdInHand", function() {
        wizard.inCombat = false;
        wizard.setFocus(4); 
        wizard.getPotions().nStrongInvigorationAvailable = 1; 
        wizard.setTrigger("birdInHand", 0.06); 

        return rulesEngine.getNextAction(0, facts).then(simEvent => {
            expect(simEvent instanceof InvigorationPotionEvent).to.be.true; 
            expect((simEvent as InvigorationPotionEvent).focusReward).to.equal(3); 
        }); 
    });
    it("magizoologist_shouldNotDrink_strongInvigorationPotion_ifNotNeeded", function() {
        wizard.inCombat = false;
        wizard.setFocus(4); 
        wizard.getPotions().nStrongInvigorationAvailable = 1; 
        wizard.setTrigger("birdInHand", null); 
        wizard.setTrigger("becomeTheBeast", null); 

        return rulesEngine.getNextAction(0, facts).then(simEvent => {
            expect(simEvent instanceof InvigorationPotionEvent).to.be.false; 
        }); 
    }); 

    it("magizoologist_shouldDrink_weakInvigorationPotion_withDefeatedWizard", function() {
        facts.chamber.isAnyWizardDefeated = true; 
        wizard.inCombat = false;
        wizard.removeFocus(wizard.getFocus());
        wizard.getPotions().nWeakInvigorationAvailable = 1; 

        return rulesEngine.getNextAction(0, facts).then(simEvent => {
            expect(simEvent instanceof InvigorationPotionEvent).to.be.true; 
            expect((simEvent as InvigorationPotionEvent).focusReward).to.equal(1); 
        }); 
    });
    it("magizoologist_shouldDrink_weakInvigorationPotion_withBecomeTheBeast", function() {
        wizard.inCombat = false;
        wizard.setFocus(4); 
        wizard.getPotions().nWeakInvigorationAvailable = 1; 
        wizard.setTrigger("becomeTheBeast", 40); 

        return rulesEngine.getNextAction(0, facts).then(simEvent => {
            expect(simEvent instanceof InvigorationPotionEvent).to.be.true; 
            expect((simEvent as InvigorationPotionEvent).focusReward).to.equal(1); 
        }); 
    });
    it("magizoologist_shouldDrink_weakInvigorationPotion_withBirdInHand", function() {
        wizard.inCombat = false;
        wizard.setFocus(4); 
        wizard.getPotions().nWeakInvigorationAvailable = 1; 
        wizard.setTrigger("birdInHand", 0.06); 

        return rulesEngine.getNextAction(0, facts).then(simEvent => {
            expect(simEvent instanceof InvigorationPotionEvent).to.be.true; 
            expect((simEvent as InvigorationPotionEvent).focusReward).to.equal(1); 
        }); 
    });
    it("magizoologist_shouldNotDrink_weakInvigorationPotion_ifNotNeeded", function() {
        wizard.inCombat = false;
        wizard.setFocus(4); 
        wizard.getPotions().nWeakInvigorationAvailable = 1; 
        wizard.setTrigger("birdInHand", null); 
        wizard.setTrigger("becomeTheBeast", null); 

        return rulesEngine.getNextAction(0, facts).then(simEvent => {
            expect(simEvent instanceof InvigorationPotionEvent).to.be.false; 
        }); 
    }); 


    it("magizoologist_shouldCastMendingCharm_beforeCombat", function() {
        wizard.inCombat = false;
        wizard.removeFocus(wizard.getFocus());
        wizard.removeStamina(1); 

        return rulesEngine.getNextAction(0, facts).then(simEvent => {
            expect(simEvent instanceof MendingCharmEvent).to.be.true; 
            expect((simEvent as MendingCharmEvent).wizard).to.equal(wizard);
            expect((simEvent as MendingCharmEvent).targetWizard).to.equal(wizard);
        }); 
    });


    it("magizoologist_shouldEnterCombat", function() {
        wizard.inCombat = false; 
        enemy.inCombat = false; 
        wizard.removeFocus(wizard.getFocus());
        wizard.mendingCharmOnCooldown = true; 
        wizard.removeStamina(1); 

        return rulesEngine.getNextAction(0, facts).then(simEvent => {
            expect(simEvent instanceof EnterCombatEvent).to.be.true; 
            expect((simEvent as EnterCombatEvent).wizard).to.equal(wizard);
            expect((simEvent as EnterCombatEvent).enemy).to.equal(enemy);
        });
    }); 



    it("magizoologist_shouldDrink_potentExstimuloPotion", function() {
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
    it("magizoologist_shouldDrink_strongExstimuloPotion", function() {
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
    it("magizoologist_shouldDrink_exstimuloPotion", function() {
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
    it("magizoologist_shouldNotDrinkExstimulo_alreadyApplied", function() {
        wizard.inCombatWith = enemy;
        wizard.inCombat = true; 
        enemy.inCombatWith = wizard;
        enemy.inCombat = true;
        enemy.applyExstimuloPotion(wizard, 5, 2.25); 
        wizard.getPotions().nPotentExstimuloAvailable = 1; 
        wizard.getPotions().nStrongExstimuloAvailable = 1; 
        wizard.getPotions().nExstimuloAvailable = 1; 
        

        return rulesEngine.getNextAction(0, facts).then(simEvent => {
            expect(simEvent instanceof ExstimuloPotionEvent).to.be.false; 
        }); 
    });
    it("magizoologist_shouldDrink_witSharpeningPotion", function() {
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

    it("magizoologist_shouldNotDrinkWitSharpening_alreadyApplied", function() {
        let eliteEnemy = TestData.buildDefaultEnemyElite(); 
        let event = new WitSharpeningPotionEvent(0, wizard, eliteEnemy, 0.5, 3, TestData.buildDefaultPotionParameters()); 
        event.onFinish(); 
        expect(eliteEnemy.getWitSharpeningDamageBuff(wizard.playerIndex)).to.equal(0.5); 

        wizard.inCombatWith = eliteEnemy;
        wizard.inCombat = true; 
        eliteEnemy.inCombatWith = wizard;
        eliteEnemy.inCombat = true;
        wizard.getPotions().nWitSharpeningAvailable = 1; 

        return rulesEngine.getNextAction(0, facts).then(simEvent => {
            expect(simEvent).to.not.be.instanceOf(WitSharpeningPotionEvent); 
        }); 
    })
    it("magizoologist_shouldNotDrinkWitSharpening_notElite", function() {
        wizard.inCombatWith = enemy;
        wizard.inCombat = true; 
        enemy.inCombatWith = wizard;
        enemy.inCombat = true;
        wizard.getPotions().nWitSharpeningAvailable = 1; 

        return rulesEngine.getNextAction(0, facts).then(simEvent => {
            expect(simEvent).to.not.be.instanceOf(WitSharpeningPotionEvent); 
        }); 
    });

    it("magizoologist_shouldCombatSpellCast", function() {
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



    it("magizoologist_shouldCastMendingCharm_ifNoOtherAction", function() {
        wizard.inCombat = false;
        //wizard.removeFocus(wizard.getFocus());
        wizard.setTrigger("mendingCharm", 4); 
        facts.highestPriorityAvailableEnemy = null;
        wizard.mendingCharmOnCooldown = false; 


        return rulesEngine.getNextAction(0, facts).then(simEvent => {
            expect(simEvent instanceof MendingCharmEvent).to.be.true; 
            expect((simEvent as MendingCharmEvent).wizard).to.equal(wizard);
            expect((simEvent as MendingCharmEvent).targetWizard).to.equal(wizard);
        }); 
    });





}); 