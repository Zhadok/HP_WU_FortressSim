import { CombatSimulation } from "../../src/sim/CombatSimulation";
import { expect } from 'chai';
import { CombatSimulationParameters } from "../../src/sim/CombatSimulationParameters";
import { Logger } from "../../src/util/Logger";
import eventData from "../../src/data/events.json";
import { Enemy } from "../../src/model/env/enemies/Enemy";
import { EnterCombatEvent } from "../../src/sim/events/wizard/combat/EnterCombatEvent";
import { DefenceCharmEvent } from "../../src/sim/events/wizard/room/spells/professor/DefenceCharmEvent";
import { InitialEnemySpawnEvent } from "../../src/sim/events/env/InitialEnemySpawnEvent";
import { CombatSpellTraceEvent } from "../../src/sim/events/wizard/combat/CombatSpellTraceEvent";
import { CombatSpellCircleEvent } from "../../src/sim/events/wizard/combat/CombatSpellCircleEvent";
import { CombatBeginEvent } from "../../src/sim/events/wizard/combat/CombatBeginEvent";
import { CombatSpellCastWizardEvent } from "../../src/sim/events/wizard/combat/CombatSpellCastWizardEvent";
import { CombatSpellCastEnemyEvent } from "../../src/sim/events/wizard/combat/CombatSpellCastEnemyEvent";
import { TestData } from "../TestData";
import { EnemyDefeatEvent } from "../../src/sim/events/env/EnemyDefeatEvent";
import { EnemySpawnEvent } from "../../src/sim/events/env/EnemySpawnEvent";
import { DeteriorationHexEvent } from "../../src/sim/events/wizard/room/spells/professor/DeteriorationHexEvent";
import { WizardDefeatEvent } from "../../src/sim/events/wizard/combat/WizardDefeatEvent";
import { Wizard } from "../../src/model/player/Wizard";
import { Professor } from "../model/player/Professor";
import Prando from "prando";
import { FortressRoom } from "../../src/model/env/FortressRoom";
import { WizardsOutOfTimeEvent } from "../../src/sim/events/env/WizardsOutOfTimeEvent";
import { SkillTree } from "../../src/model/player/SkillTree/SkillTree";
import professorRules_onlyDeteriorationHex from "../../src/rules/store/professorRules_onlyDeteriorationHex.json"; 
import professorRules_onlyMendingCharm from "../../src/rules/store/professorRules_onlyMendingCharm.json"; 
import aurorRules_onlyBatBogeyHex from "../../src/rules/store/aurorRules_onlyBatBogeyHex.json";
import { ruleContainerType } from "../types";
import { MendingCharmEvent } from "../../src/sim/events/wizard/room/spells/professor/MendingCharmEvent";
import { MendingCharmCooldownFinishedEvent } from "../../src/sim/events/wizard/room/spells/professor/MendingCharmCooldownFinishedEvent";


describe("CombatSimulation", function() {
    let params1: CombatSimulationParameters;
    let sim: CombatSimulation; 
    
    beforeEach(() => {
        Logger.verbosity = 0;
        params1 = TestData.buildDefaultSimParameters();
        sim = new CombatSimulation(params1, TestData.buildNewRNG_0());
    });

    it('addEvent', function() {
        let event1 = new InitialEnemySpawnEvent(0);
        let event2 = new InitialEnemySpawnEvent(1000);
        let event3 = new InitialEnemySpawnEvent(2000);
        let event4 = new InitialEnemySpawnEvent(3000);

        sim.addEvent(event1);
        expect(sim.eventQueue).to.deep.equal([event1]);
        
        sim.addEvent(event4);
        expect(sim.eventQueue).to.deep.equal([event4, event1]);
        
        sim.addEvent(event2);
        expect(sim.eventQueue).to.deep.equal([event4, event2, event1]);
        
        sim.addEvent(event3);
        expect(sim.eventQueue).to.deep.equal([event4, event3, event2, event1]);
    });

    it("init", function() {
        sim.init();

        expect(sim.eventQueue[0]).to.be.instanceOf(WizardsOutOfTimeEvent); 
        expect(sim.eventQueue[1].eventName).to.equal("thirdEnemySpawnTime");
        expect(sim.eventQueue[2].eventName).to.equal("secondEnemySpawnTime");
        expect(sim.eventQueue[3].eventName).to.equal("initialEnemySpawnAnimation");
        expect(sim.eventQueue[4].eventName).to.equal("enemySpawn");
        expect(sim.eventQueue.length).to.equal(3 + 1 + sim.wizards.length); // outoftime/second/thirdEnemy, initialSpawn, 1 for each wizard
    });

    it("targetPriority", function() {
        let enemy1 = Enemy.buildEnemy("acromantula", 0, false, 1, 1, 3);
        let enemy2 = Enemy.buildEnemy("pixie", 1, false, 1, 1, 3);
        let activeEnemies: Array<Enemy> = [
            enemy1, enemy2
        ];
        let orderedTargets = sim.sortEnemyTargetsByPriority(sim.wizards[0], activeEnemies);
        expect(orderedTargets[0].name).to.equal("pixie");
        expect(orderedTargets[1].name).to.equal("acromantula");
        
        expect(orderedTargets).to.deep.equal([enemy2, enemy1]);
    });

    it("targetPriorityWithCombat", function() {
        let enemy1 = Enemy.buildEnemy("acromantula", 0, false, 1, 1, 3);
        let enemy2 = Enemy.buildEnemy("pixie", 1, false, 1, 1, 3);
        enemy2.inCombat = true;
        let activeEnemies: Array<Enemy> = [
            enemy1, enemy2
        ];
        let orderedTargets = sim.sortEnemyTargetsByPriority(sim.wizards[0], activeEnemies);
        expect(orderedTargets[0].name).to.equal("acromantula");
        expect(orderedTargets[1].name).to.equal("pixie"); // index 1 should be pixie since it is lowest priority since it is already in combat
        
        expect(orderedTargets).to.deep.equal([enemy1, enemy2]);
    });
    it("highestPriorityTarget_case1", function() {
        let enemy1 = Enemy.buildEnemy("acromantula", 0, false, 1, 1, 3);
        let enemy2 = Enemy.buildEnemy("darkWizard", 1, false, 1, 1, 3);
        let enemy3 = Enemy.buildEnemy("pixie", 2, false, 1, 1, 3);
        sim.addEnemyToActive(enemy3); 
        sim.addEnemyToActive(enemy2); 
        sim.addEnemyToActive(enemy1); 
        
        let highestPriorityTarget = sim.getHighestPriorityAvailableEnemy(sim.wizards[0]);
        expect(highestPriorityTarget).to.equal(enemy3); 
    });


    it("combatSimulation_dead_normalOrder", function() {
        let enemy = TestData.buildDefaultEnemy();
        sim.addEnemyToActive(enemy);

        expect(sim.eventQueue).to.be.empty;
        let deadWizard = sim.wizards[0];
        deadWizard.removeStamina(999);
        expect(deadWizard.getIsDefeated()).to.be.true;

        let wizardDefeatEvent = new WizardDefeatEvent(0, enemy, deadWizard, TestData.buildNewRNG_0());
        expect(wizardDefeatEvent.hasFollowupEvent()).to.be.false;

        sim.addEvent(wizardDefeatEvent);
        expect(sim.peekNextEvent().timestampEnd).to.equal(sim.fortressRoom.computeKnockoutTime());

        sim.processNextEvent(); // Process WizardDefeatEvent
        expect(deadWizard.getCurrentStamina()).to.equal(deadWizard.getMaxStamina());
        expect(deadWizard.getIsDefeated()).to.be.false;
        expect(wizardDefeatEvent.allowWizardFollowupAction()).to.be.true; // After revived there should be an allowed followup action

        

    });


    it("combatSimulation_fullManualSimulation", async function() {
        Logger.verbosity = 0; 
        let defaultEnemies = TestData.buildDefaultEnemies();
        let shouldBeTime = 0;

        params1.roomLevel = 1;
        let sim1 = new CombatSimulation(params1, TestData.buildNewRNG_0());
        sim1.wizards[0].setPotions(TestData.buildDefaultPotionParameters_noPotions()); 
        sim1.fortressRoom.enemiesAll[0] = defaultEnemies[0];
        sim1.fortressRoom.enemiesAll[1] = defaultEnemies[1];

        sim1.init();
        expect(sim1.isWizardIdle(sim1.wizards[0])).to.be.true;
        // remove outoftime/second/third enemy spawn
        sim1.eventQueue.splice(0, 1);
        sim1.eventQueue.splice(0, 1);
        sim1.eventQueue.splice(0, 1);

        expect(sim1.peekNextEvent() instanceof EnemySpawnEvent).to.be.true;

        sim1.wizards[0].addFocus(3), // Enough for defence charm
        sim1.wizards[0].setTrigger("defenceCharm", 0.16);
        await sim1.processNextEvent(); // Processing enemy spawn
        expect(sim1.fortressRoom.enemiesActive.length).to.be.equals(1);
        expect(sim1.fortressRoom.enemiesActive[0]).to.deep.equal(defaultEnemies[0]);
        expect(sim1.isWizardIdle(sim1.wizards[0])).to.be.true;
        expect(sim1.peekNextEvent()).to.be.instanceOf(InitialEnemySpawnEvent);

        expect((sim1.wizards[0] as Professor).hasStudiedDefenceCharm()).to.be.true; 
        expect(sim1.wizards[0].hasEnoughFocusForStrategicSpell("defenceCharm")).to.be.true; 
        expect(sim1.wizards[0].inCombat).to.be.false; 
        expect(sim1.wizards[0].hasDefenceCharm).to.be.false; 
        await sim1.processNextEvent(); // Processing initial spawn
        shouldBeTime += eventData.initialEnemySpawnAnimation;    
        expect(sim1.currentTime).to.equals(shouldBeTime);
        expect(sim1.isWizardIdle(sim1.wizards[0])).to.be.false;
        expect(sim1.peekNextEvent()).to.be.instanceOf(DefenceCharmEvent);

        await sim1.processNextEvent(); // Processing defence charm
        shouldBeTime += eventData.strategicSpellDragAndCastAnimation;
        expect(sim1.currentTime).to.equals(shouldBeTime);
        expect(sim1.wizards[0].hasDefenceCharm).to.be.true;
        expect(sim1.peekNextEvent() instanceof EnterCombatEvent).to.be.true;
        expect(sim1.wizards[0].inCombat).to.be.true; // Should be in combat at START of event
        expect(sim1.fortressRoom.enemiesActive[0].inCombat).to.be.true;

        await sim1.processNextEvent(); // Processing enter combat
        shouldBeTime += eventData.enterCombat;
        expect(sim1.currentTime).to.equals(shouldBeTime);
        expect(sim1.peekNextEvent() instanceof CombatBeginEvent);
     
        await sim1.processNextEvent(); // Processing combat begin animation
        shouldBeTime += eventData.combatBeginAnimation_acromantula;
        expect(sim1.currentTime).to.equals(shouldBeTime);
        expect(sim1.peekNextEvent() instanceof CombatSpellCircleEvent).to.be.true;

        await sim1.processNextEvent(); // Processing spell circle animation (filling the target circle)
        shouldBeTime += eventData.spellCircle_acromantula;
        expect(sim1.currentTime).to.equals(shouldBeTime);
        expect(sim1.peekNextEvent() instanceof CombatSpellTraceEvent).to.be.true;

        await sim1.processNextEvent(); // Processing spell trace animation (tracing the form of the spell)
        shouldBeTime += eventData.spellTrace;
        expect(sim1.currentTime).to.equals(shouldBeTime);
        expect(sim1.peekNextEvent() instanceof CombatSpellCastWizardEvent).to.be.true;
        sim1.wizards[0].stats.accuracy = 2; 

        await sim1.processNextEvent(); // Processing spell cast animation (wizard casts, enemy flinches)
        shouldBeTime += eventData.spellCast_wizard;
        expect(sim1.currentTime).to.equals(shouldBeTime);
        expect(sim1.peekNextEvent() instanceof CombatSpellCastEnemyEvent).to.be.true;
        expect(defaultEnemies[0].getCurrentStamina() < defaultEnemies[0].getMaxStamina()).to.be.true;

        await sim1.processNextEvent(); // Processing spell cast (enemy casts, wizard has opportunity for protego)
        shouldBeTime += eventData.spellCast_enemy;
        expect(sim1.currentTime).to.equals(shouldBeTime);
        expect(sim1.peekNextEvent() instanceof CombatSpellCircleEvent).to.be.true;
        expect(sim1.wizards[0].getCurrentStamina() < sim1.wizards[0].getMaxStamina());

        await sim1.processNextEvent(); // Processing spell circle event
        shouldBeTime += eventData.spellCircle_acromantula;
        sim1.processNextEvent(); // Processing spell trace
        shouldBeTime += eventData.spellTrace;
        defaultEnemies[0].removeStamina( defaultEnemies[0].getCurrentStamina() - 1 );

        await sim1.processNextEvent(); // Processing spell cast (wizard casts, enemy should be dead after this)
        shouldBeTime += eventData.spellCast_wizard;
        expect(defaultEnemies[0].getIsDefeated()).to.be.true;
        expect(sim1.peekNextEvent() instanceof EnemyDefeatEvent).to.be.true;


        await sim1.processNextEvent(); // Processing EnemyDefeatEvent
        shouldBeTime += eventData.enemyDeathAnimation;
        expect(sim1.currentTime).to.equals(shouldBeTime);
        expect(sim1.wizards[0].inCombat).to.be.false;
        //console.log(sim1.eventQueue); 
        expect(sim1.isWizardIdle(sim1.wizards[0])).to.be.true;
        expect(sim1.peekNextEvent() instanceof EnemySpawnEvent).to.be.true;

        await sim1.processNextEvent(); // Processing enemy spawn event
        shouldBeTime += 0; // Should be instantly there
        expect(sim1.currentTime).to.equals(shouldBeTime);
        expect(sim1.peekNextEvent() instanceof DeteriorationHexEvent).to.be.true; // Idle wizard should be triggered to cast hex
         
        await sim1.processNextEvent(); // Processing hex 
        shouldBeTime += eventData.strategicSpellDragAndCastAnimation;
        expect(sim1.currentTime).to.equals(shouldBeTime);
        expect(defaultEnemies[1].hasDeteriorationHex).to.be.true;
        expect(defaultEnemies[1].deteriorationHexDamage).to.be.greaterThan(0);
        expect(sim1.peekNextEvent() instanceof MendingCharmEvent).to.be.true; // wizard with non-full hp should cast mending charm
        
        await sim1.processNextEvent(); // Processing mending charm event 
        shouldBeTime += eventData.strategicSpellDragAndCastAnimation;
        expect(sim1.currentTime).to.equals(shouldBeTime);
        expect(sim1.wizards[0].mendingCharmOnCooldown).to.be.true; 
        expect(sim1.peekNextEvent() instanceof EnterCombatEvent).to.be.true; // wizard should enter combat
        
        await sim1.processNextEvent(); // Processing enter combat
        shouldBeTime += eventData.enterCombat;
        expect(sim1.currentTime).to.equals(shouldBeTime);
        expect(defaultEnemies[1].inCombat).to.be.true;
        expect(sim1.wizards[0].inCombat).to.be.true;
        expect(sim1.peekNextEvent() instanceof MendingCharmCooldownFinishedEvent).to.be.true; // This was running in the back
        
        await sim1.processNextEvent(); // Processing mending charm cooldown finished
        expect(sim1.wizards[0].mendingCharmOnCooldown).to.be.false; 
        expect(sim1.peekNextEvent() instanceof CombatBeginEvent).to.be.true; // This was running in the back

        await sim1.processNextEvent(); // Processing combat begin animation
        shouldBeTime += eventData.combatBeginAnimation_pixie;
        expect(sim1.currentTime).to.equals(shouldBeTime);
        expect(sim1.peekNextEvent() instanceof CombatSpellCircleEvent).to.be.true;
    
        await sim1.processNextEvent(); // Processing spell circle animation (filling the target circle)
        shouldBeTime += eventData.spellCircle_pixie;
        expect(sim1.currentTime).to.equals(shouldBeTime);
        expect(sim1.peekNextEvent() instanceof CombatSpellTraceEvent).to.be.true;

        await sim1.processNextEvent(); // Processing spell trace animation (tracing the form of the spell)
        shouldBeTime += eventData.spellTrace;
        expect(sim1.currentTime).to.equals(shouldBeTime);
        expect(sim1.peekNextEvent() instanceof CombatSpellCastWizardEvent).to.be.true;
        defaultEnemies[1].removeStamina( defaultEnemies[1].getCurrentStamina() - 1 );

        await sim1.processNextEvent(); // Processing spell cast animation (wizard casts, enemy flinches)
        shouldBeTime += eventData.spellCast_wizard;
        expect(sim1.currentTime).to.equals(shouldBeTime);
        expect(defaultEnemies[1].getIsDefeated()).to.be.true;
        expect(sim1.peekNextEvent() instanceof EnemyDefeatEvent).to.be.true;

        await sim1.processNextEvent(); // Processing enemydefeatevent
        


        if (sim1.isFinished() === false) {
            console.log("Remaining events in queue: ");
            console.log(sim1.eventQueue);
        }


        expect(sim1.isFinished()).to.be.true;
        
    });

    it("fullSimulation", async function() {
        Logger.verbosity = 0; 
        let sim = new CombatSimulation(TestData.buildDefaultSimParameters(), new Prando(0));
        sim.init(); 

        await sim.simulate(); 

        let simResults = sim.toSimulationResults();
        expect(simResults.nEvents > 0);
        expect(simResults.wizardResults[0].numberOfCasts > 0);
        expect(simResults.wizardResults[0].totalDamage >= sim.fortressRoom.enemiesAll.map(enemy => enemy.getMaxStamina()).reduce((a, b) => a + b, 0));
    });

    it("simulation_runOutOfTime", async function() {
        Logger.verbosity = 0;
        params1.roomLevel = 20; 
        // Wizard should fail at this
        let sim = new CombatSimulation(params1, new Prando(0));
        sim.init(); 

        await sim.simulate(); 

        //console.log(sim.toSimulationResults()); 
        expect(sim.toSimulationResults().isWin).to.equal(false); 
        expect(sim.toSimulationResults().durationGameTimeMS).to.equal(FortressRoom.computeMaxtimeStatic(params1.roomLevel)*1000); 
        
    });

    it("simulation_lostBecauseOfIdleness", async function() {
        Logger.verbosity = 0;
        params1.roomLevel = 1; 
        params1.runestoneLevels = [3]; 
        params1.skillTrees = [(new SkillTree("professor")).persist()]; 
        params1.seed = 3; 
        // Wizard fails at this with a certain bug
        let sim = new CombatSimulation(params1, new Prando(params1.seed));
        sim.init(); 

        await sim.simulate(); 

        expect(sim.toSimulationResults().isWin).to.equal(true); 
        
    });

    it("simulation_playerNoAction_enemyShouldAttack", async function() {
        Logger.verbosity = 0; 
        params1.roomLevel = 1; 
        params1.ruleContainers = [professorRules_onlyDeteriorationHex as ruleContainerType]; 
        let skillTree = new SkillTree("professor"); 
        skillTree.learnAllLessons(); 
        params1.skillTrees = [skillTree.persist()]; 
        
        let sim = new CombatSimulation(params1, new Prando(params1.seed));
        sim.init(); 

        await sim.simulate(); 
        expect(sim.toSimulationResults().isWin).to.equal(true); 
    });

    it("simulation_playerSpamMendingCharm", async function() {
        // Professor should cast mending charm every 6s
        Logger.verbosity = 0;  
        params1.roomLevel = 1; 
        params1.ruleContainers = [professorRules_onlyMendingCharm as ruleContainerType]; 
        let skillTree = new SkillTree("professor"); 
        skillTree.learnAllLessons(); 
        params1.skillTrees = [skillTree.persist()]; 
        
        let sim = new CombatSimulation(params1, new Prando(params1.seed));
        sim.init(); 

        sim.wizards[0].removeStamina(sim.wizards[0].getMaxStamina() - 1);
        await sim.simulate(); 

        // 300s, exactly 50 casts (1 every 6s)
        expect(sim.wizards[0].getCurrentStamina()).to.be.equal(1 + 50*sim.wizards[0].stats.mendingCharmStaminaRestore);  
    });


    it("simulation_playerSpamBatBogeyHex", async function() {
        // Auror should cast bat bogey hex every 6s
        Logger.verbosity = 0;  
        params1.roomLevel = 20; 
        params1.ruleContainers = [aurorRules_onlyBatBogeyHex as ruleContainerType]; 
        let skillTree = new SkillTree("auror"); 
        skillTree.learnAllLessons(); 
        params1.skillTrees = [skillTree.persist()]; 
        
        let sim = new CombatSimulation(params1, new Prando(params1.seed));
        sim.init(); 

        await sim.simulate(); 

        let enemy = sim.fortressRoom.enemiesAll[0]; 
        //console.log(enemy.getCurrentStamina() + "/" + enemy.getMaxStamina()); 
        
        // 600s, exactly 100 casts (1 every 6s)
        expect(enemy.getCurrentStamina()).to.be.equal(enemy.getMaxStamina() - 100*sim.wizards[0].stats.batBogeyHexDamage);  
    });

    it("getWizardDefeatedTimer", async function() {
        Logger.verbosity = 0;  
        params1.roomLevel = 20; 
       
        let sim = new CombatSimulation(params1, new Prando(params1.seed));
        sim.init(); 
        let wizard = sim.wizards[0]; 

        while (wizard.getIsDefeated() === false) {
            await sim.processNextEvent(); 
        }

        let containsDefeatEvent = false; 
        let defeatEvent: WizardDefeatEvent | null = null; 
        sim.eventQueue.forEach((event) => {
            if (event instanceof WizardDefeatEvent) {
                containsDefeatEvent = true; 
                defeatEvent = event; 
            }
        });
        expect(containsDefeatEvent).to.be.true;
        expect(wizard.getIsDefeated()).to.be.true; 
        expect(sim.getWizardDefeatedTimerMS(wizard)).to.equal(defeatEvent!.timestampEnd - sim.currentTime); 
    });

    it("getCurrentFacts_chamber_isAnyWizardDefeated", function() {
        sim.init(); 
        let facts = sim.getCurrentFacts(sim.wizards[0], sim.fortressRoom.enemiesActive[0]); 
        expect(facts.chamber.isAnyWizardDefeated).to.be.false; 

        sim.wizards[0].removeStamina(999); 
        facts = sim.getCurrentFacts(sim.wizards[0], sim.fortressRoom.enemiesActive[0]); 
        expect(facts.chamber.isAnyWizardDefeated).to.be.true; 
    }); 

    it("getCurrentFacts_chamber_isAnyActiveEnemyElite", function() {
        sim.init(); 
        sim.fortressRoom.enemiesActive.splice(0, sim.fortressRoom.enemiesActive.length); 
        sim.fortressRoom.enemiesActive.push(TestData.buildDefaultPixie()); 
        let facts = sim.getCurrentFacts(sim.wizards[0], sim.fortressRoom.enemiesActive[0]); 
        expect(facts.chamber.isAnyActiveEnemyElite).to.be.false; 

        sim.fortressRoom.enemiesActive.push(TestData.buildDefaultEnemyElite()); 
        facts = sim.getCurrentFacts(sim.wizards[0], sim.fortressRoom.enemiesActive[0]); 
        expect(facts.chamber.isAnyActiveEnemyElite).to.be.true; 

    });

    it("getCurrentFacts_chamber_isDefenceCharmOnAllWizards", function() {
        sim.init(); 

        let facts = sim.getCurrentFacts(sim.wizards[0], sim.fortressRoom.enemiesActive[0]); 
        expect(facts.chamber.isDefenceCharmOnAllWizards).to.be.false;
        
        sim.wizards[0].hasDefenceCharm = true; 
        facts = sim.getCurrentFacts(sim.wizards[0], sim.fortressRoom.enemiesActive[0]); 
        expect(facts.chamber.isDefenceCharmOnAllWizards).to.be.true;
    });

});