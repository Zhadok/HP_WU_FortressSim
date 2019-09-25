import {firstBy} from "thenby"
import Prando from "prando";

import eventData from "../data/events.json";
import potionData from "../data/potions.json";
import { CombatSimulationParameters } from "./CombatSimulationParameters";
import { SimEvent } from "./events/SimEvent.js";
import { FortressRoom } from "../model/env/FortressRoom";
import { Wizard } from "../model/player/Wizard";
import { WizardFactory } from "../model/player/WizardFactory";
import { Logger } from "../util/Logger";
import { PotionAvailabilityParameters } from "./PotionAvailabilityParameters";
import { Professor } from "../model/player/Professor";
import { Enemy } from "../model/env/enemies/Enemy";
import { WizardEvent } from "./events/wizard/WizardEvent";
import { EnterCombatEvent } from "./events/wizard/combat/EnterCombatEvent";
import { InitialEnemySpawnEvent } from "./events/env/InitialEnemySpawnEvent";
import { DefenceCharmEvent } from "./events/wizard/room/spells/professor/DefenceCharmEvent";
import { DeteriorationHexEvent } from "./events/wizard/room/spells/professor/DeteriorationHexEvent";
import { EnemySpawnEvent } from "./events/env/EnemySpawnEvent";
import { EnvEvent } from "./events/env/EnvEvent";
import { EnemyDefeatEvent } from "./events/env/EnemyDefeatEvent";
import { CombatSpellCircleEvent } from "./events/wizard/combat/CombatSpellCircleEvent";
import { SecondEnemySpawnEvent } from "./events/env/SecondEnemySpawnEvent";
import { ProficiencyPowerCharmEvemt } from "./events/wizard/room/spells/professor/ProficiencyPowerCharmEvent";
import { SkillTree } from "../model/player/SkillTree/SkillTree";
import { RulesEngine } from "../rules/RulesEngine";
import { nameClassType, ruleFactType } from "../types.js";


export class CombatSimulation {

    readonly params: CombatSimulationParameters;
    readonly wizards: Array<Wizard> = [];
    readonly fortressRoom: FortressRoom;
    readonly rng: Prando
    
    readonly rulesEngineAuror: RulesEngine;
    readonly rulesEngineMagizoologist: RulesEngine;
    readonly rulesEngineProfessor: RulesEngine;

    currentTime: number;

    // Events are index by their END timestamp
    // Example: Event starts at 531ms, ends at 1652ms. events.get(1652) returns array with that event
    // Each event has a "follow up" action which tells simulation which action to perform afterwards
    //readonly events: Map<number, Array<SimEvent>>;

    // Event array is a stack, we proceed from one event to the next
    // Top of stack is popped each loop of simulate()
    // Inserting new item to stack: sort by event.eventTimestampEnd
    readonly eventQueue: Array<SimEvent>;

    constructor(params: CombatSimulationParameters, rng: Prando) {
        this.params = params;
        this.rng = rng;  
        this.currentTime = 0;
        //this.events = new Map<number, Array<SimEvent>>();
        this.eventQueue = [];

        this.fortressRoom = new FortressRoom(params.runestoneLevels, params.roomLevel, params.runestoneLevels.length, rng);
        let knockoutTime = this.fortressRoom.computeKnockoutTime(); 

        for (let i=0;i<params.nameClasses.length;i++) {
            let skillTree = SkillTree.fromPersisted(params.skillTrees[i]);
            let wizard = WizardFactory.buildWizardWithSkillTree(skillTree, i, knockoutTime); 
            this.wizards.push(wizard);
        }

        this.rulesEngineAuror = new RulesEngine("auror", rng);
        this.rulesEngineMagizoologist = new RulesEngine("magizoologist", rng);
        this.rulesEngineProfessor = new RulesEngine("professor", rng);
    }

    init() {
        // Create initial events
        this.addEvent(new InitialEnemySpawnEvent(0));

        // Add one enemy per wizard initially
        for (var i=0;i<this.wizards.length;i++) {
            this.addEvent(new EnemySpawnEvent(0, this.fortressRoom.getNextActiveEnemy()));
        }

        // Add another enemy per wizard after 18s
        this.addEvent(new SecondEnemySpawnEvent("secondEnemySpawnTime", 0));
        // Add another enemy per wizard after 34s
        this.addEvent(new SecondEnemySpawnEvent("thirdEnemySpawnTime", 0));

    }



    log(verbosity: number, message: string) {
        Logger.logT(verbosity, this.currentTime, message);
    }

    addEnemyToActive(enemy: Enemy) {
        if (enemy.isActive === false) { // Perhaps enemy was already spawned earlier
            enemy.isActive = true;
            this.fortressRoom.addEnemyToActive(enemy);
        }
    }
    removeEnemyFromActive(enemy: Enemy) {
        enemy.isActive = false;
        this.fortressRoom.removeEnemyFromActive(enemy);
    }
    //getRemainingInactiveEnemyCount(): number {
    //    return this.fortressRoom.getRemainingInactiveEnemyCount();
    //}
    //getAvailableEnemyCount(): number {
    //    return this.fortressRoom.enemiesActive.filter(e => e.isActive === true && e.inCombat === false).length;
    //}

    addEvent(newEvent: SimEvent) {
        
        if (this.currentTime > newEvent.timestampBegin) {
            throw new Error("Attempted to add event at eventTimestamp=" + newEvent.timestampBegin + " with currentTime=" + this.currentTime);
        }
        // Stack based implementation: top of stack (=last element) is next event 
        // (FIFO queue)
        // event must be inserted at correct index
        let eventIndex = 0; // If no update, has soonest timestampEnd
        for (let event of this.eventQueue) {
            if (newEvent.timestampEnd < event.timestampEnd) {
                eventIndex++;
            }
            else {
                break;
            }
        }
        this.log(2, "Adding event: " + newEvent.constructor.name + " with begin=" + newEvent.timestampBegin + ", end=" + newEvent.timestampEnd + 
                    " (" + newEvent.eventName + ")");
        this.eventQueue.splice(eventIndex, 0, newEvent);

        newEvent.onStart();
    }



    async simulate() {
        let done = false;
        while (this.eventQueue.length > 0) {
            await this.processNextEvent();
        }
    }
    
    peekNextEvent(): SimEvent {
        return this.eventQueue[ this.eventQueue.length-1 ];
    }

    async processNextEvent() {
        let currentEvent = this.eventQueue.pop()!; // Get last element of array and remove it from array
        if (this.currentTime > currentEvent.timestampEnd) {
            throw new Error("Tried to go back in time! currentTime=" + this.currentTime + ", event.timestampEnd=" + currentEvent.timestampEnd);
        }
        this.currentTime = currentEvent.timestampEnd
        await this.processEvent(currentEvent);
        return currentEvent;
    }

    // Event is always called at END of event (e.g. at END of animation)
    // timestampBegin of next event is equal to timestampEnd of this event
    async processEvent(event: SimEvent) {
        this.log(2, "Processing event: " + event.constructor.name);
        event.onFinish();

        if (event instanceof EnvEvent) {
            if (event instanceof InitialEnemySpawnEvent) {
                // Special case because all wizards are allowed to perform actions
                await this.triggerIdleWizards();
            }
            else if (event instanceof SecondEnemySpawnEvent) {
                // Enemies will continue spawning after 18s/34s
                for (let i=0;i<this.wizards.length;i++) {
                    if (this.fortressRoom.hasNextActiveEnemy()) {
                        this.addEvent(new EnemySpawnEvent(this.currentTime, this.fortressRoom.getNextActiveEnemy()));
                    }
                }
                await this.triggerIdleWizards();
            }
            else if (event instanceof EnemySpawnEvent) {
                this.log(2, "Spawning enemy id=" + event.enemy.enemyIndex + " (" + event.enemy.nameUserFriendly + ")");
                this.addEnemyToActive(event.enemy);
                if (this.eventQueue.filter(e => e instanceof InitialEnemySpawnEvent).length === 0) {
                    // Only trigger idle wizards if no more initial enemy spawns in queue
                    await this.triggerIdleWizards();
                }   
            }
            else if (event instanceof EnemyDefeatEvent) {
                this.removeEnemyFromActive(event.enemy);
                if (this.fortressRoom.hasNextActiveEnemy()) {
                    this.addEvent(new EnemySpawnEvent(this.currentTime, this.fortressRoom.getNextActiveEnemy()));
                }
                this.rewardWizardFocus(event.enemy.focusReward);
                this.checkForVictory();
            }
            return; 
        }

        if (event.hasFollowupEvent()) {
            this.addEvent(event.getFollowupEvent());
        }
        if (event.allowWizardFollowupAction()) {
            // Wizard is allowed to perform action
            await this.addNextWizardEvent((event as WizardEvent).wizard);
        }
    }

    checkForVictory(): void {
        if (this.fortressRoom.areAllEnemiesDefeated()) {
            this.log(1, "All enemies have been defeated!");
        }
    }


    rewardWizardFocus(focus: number): void {
        for (let wizard of this.wizards) {
            wizard.addFocus(focus);
        }
    }

    // Sometimes, wizards need to be retriggered
    // Those that are not in combat AND not defeated AND
    // do not have a "blocking" event waiting in the queue
    // (all events are generally blocking, except for spamming mending charm etc)
    isWizardIdle(wizard: Wizard): boolean {
        let hasBlockingEvent = false;
        for (let event of this.eventQueue) {
            if (event instanceof WizardEvent) {
                if (event.wizard.playerIndex === wizard.playerIndex) {
                    //this.log(3, "Wizard id=" + wizard.playerIndex + " has blocking event: " + event.eventName);
                    hasBlockingEvent = true;
                }
            }
        }
        return wizard.inCombat === false && 
               wizard.getIsDefeated() === false &&
               hasBlockingEvent === false; 
    }

    async triggerIdleWizards() {
        for (let wizard of this.wizards) {
            if (this.isWizardIdle(wizard)) {
                await this.addNextWizardEvent(wizard);
            }
        }
    }    

    getRulesEngine(nameClass: nameClassType) {
        switch (nameClass){
            case "auror": return this.rulesEngineAuror;
            case "magizoologist": return this.rulesEngineMagizoologist;
            case "professor": return this.rulesEngineProfessor;
        }
    }

    // Priority based next action
    // Possible actions:
    // Outside combat: Drink potion, cast strategic spell, enter combat
    async addNextWizardEvent(wizard: Wizard) {
        let timestampBegin = this.currentTime;
        let potions = this.params.potions[wizard.playerIndex];

        let highestPriorityAvailableEnemy: Enemy | null = this.getHighestPriorityAvailableEnemy(wizard);
        if (highestPriorityAvailableEnemy === undefined) {
            highestPriorityAvailableEnemy = null; 
        }

        let facts: ruleFactType = {
            wizard: wizard,
            highestPriorityAvailableEnemy: highestPriorityAvailableEnemy,  
            allWizards: this.wizards
        }
        let nextEvent: SimEvent = await this.getRulesEngine(wizard.nameClass).getNextAction(timestampBegin, facts);
        this.addEvent(nextEvent);
    }   



    // Priority calculation:
    // is enemy in combat? 
    // am i proficient against enemy?
    // then by focus reward
    // for professor: pixie > werewolf
    //
    // Result: Highest priority will be at index=0
    sortEnemyTargetsByPriority(wizard: Wizard, activeEnemies: Array<Enemy>): Array<Enemy> {
        return activeEnemies.sort(
            firstBy(function(v1, v2) { return v1.inCombat === v2.inCombat ? 0 : v1.inCombat ? 1 : -1 })
            .thenBy(function(v1, v2) { return wizard.isProficientAgainst(v1) === wizard.isProficientAgainst(v2) ? 0 : wizard.isProficientAgainst(v1) ? -1 : 1})
            .thenBy(function(v1, v2) { return v2.focusReward - v1.focusReward })
        );
    }

    getHighestPriorityAvailableEnemy(wizard: Wizard): Enemy {
        let sortedActiveEnemies = this.sortEnemyTargetsByPriority(wizard, 
            this.fortressRoom.enemiesActive.filter(enemy => enemy.inCombat===false));
        return sortedActiveEnemies[0];
    }

    isFinished() {
        return this.eventQueue.length === 0;
    }

    // In combat: Drink potion, attack, exit combat

}