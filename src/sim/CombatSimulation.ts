import {firstBy} from "thenby"
import Prando from "prando";

import eventData from "../data/events.json";
import potionData from "../data/potions.json";
import { CombatSimulationParameters } from "./CombatSimulationParameters";
import { SimEvent } from "./events/SimEvent.js";
import { Wizard } from "../model/player/Wizard";
import { WizardFactory } from "../model/player/WizardFactory";
import { Logger } from "../util/Logger";
import { Enemy } from "../model/env/enemies/Enemy";
import { WizardEvent } from "./events/wizard/WizardEvent";
import { InitialEnemySpawnEvent } from "./events/env/InitialEnemySpawnEvent";
import { EnemySpawnEvent } from "./events/env/EnemySpawnEvent";
import { EnvEvent } from "./events/env/EnvEvent";
import { EnemyDefeatEvent } from "./events/env/EnemyDefeatEvent";
import { SecondEnemySpawnEvent } from "./events/env/SecondEnemySpawnEvent";
import { SkillTree } from "../model/player/SkillTree/SkillTree";
import { RulesEngine } from "../rules/RulesEngine";
import { nameClassType, ruleFactType } from "../types.js";
import { CombatSimulationResults } from "./CombatSimulationResults";
import { WizardsOutOfTimeEvent } from "./events/env/WizardsOutOfTimeEvent";
import { FortressRoom } from "../model/env/FortressRoom";


export class CombatSimulation {

    readonly params: CombatSimulationParameters;
    readonly wizards: Array<Wizard> = [];
    readonly fortressRoom: FortressRoom;
    readonly rng: Prando
    
    readonly rulesEngineAuror: RulesEngine;
    readonly rulesEngineMagizoologist: RulesEngine;
    readonly rulesEngineProfessor: RulesEngine;

    currentTime: number;
    readonly maxTime: number; 

    // For simulation results
    timeStart: number = -1; 
    timeEnd: number = -1; 
    nEventsProcessed: number = 0;
    isWin: boolean | null = null; 



    // Events are index by their END timestamp
    // Example: Event starts at 531ms, ends at 1652ms. events.get(1652) returns array with that event
    // Each event has a "follow up" action which tells simulation which action to perform afterwards
    //readonly events: Map<number, Array<SimEvent>>;

    // Event array is a stack, we proceed from one event to the next
    // Top of stack is popped each loop of simulate()
    // Inserting new item to stack: sort by event.eventTimestampEnd
    readonly eventQueue: Array<SimEvent>;

    constructor(params: CombatSimulationParameters, rng: Prando) {
        this.timeStart = (new Date()).getTime(); 
        this.params = params;
        this.rng = rng;  
        this.currentTime = 0;
        //this.events = new Map<number, Array<SimEvent>>();
        this.eventQueue = [];

        this.fortressRoom = new FortressRoom(params, rng);
        let knockoutTime = this.fortressRoom.computeKnockoutTime(); 
        this.maxTime = this.fortressRoom.computeMaxtime() * 1000;

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

        // Add out of time event
        this.addEvent(new WizardsOutOfTimeEvent(this.maxTime)); 
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
            let eventProcessed: boolean = await this.processNextEvent();
            if (eventProcessed === false) {
                this.log(2, "Simulation reached max time (" + this.maxTime/1000 + "s). Wizard(s) were defeated!");
                this.isWin = false; 
                this.emptyEventQueue(); 
                break; 
            }
        }
        if (this.isWin === null) {
            this.log(2, "All enemies have been defeated!");
            this.isWin = true; 
        } 

        this.timeEnd = (new Date()).getTime();
        this.log(2, "Simulation finished after " + (this.timeEnd-this.timeStart) + "ms."); 
    }
    
    peekNextEvent(): SimEvent {
        return this.eventQueue[ this.eventQueue.length-1 ];
    }
    emptyEventQueue(): void {
        this.eventQueue.splice(0, this.eventQueue.length);
    }

    // Returns whether event was processed or not
    async processNextEvent(): Promise<boolean> {
        let currentEvent = this.eventQueue.pop()!; // Get last element of array and remove it from array
        if (this.currentTime > currentEvent.timestampEnd) {
            throw new Error("Tried to go back in time! currentTime=" + this.currentTime + ", event.timestampEnd=" + currentEvent.timestampEnd);
        }
        this.currentTime = currentEvent.timestampEnd
        this.log(2, "Processing event: " + currentEvent.constructor.name);

        if (this.currentTime >= this.maxTime) {
            return false; 
        }

        await this.processEvent(currentEvent);

        this.nEventsProcessed++; 
        return true;
    }

    // Event is always called at END of event (e.g. at END of animation)
    // timestampBegin of next event is equal to timestampEnd of this event
    async processEvent(event: SimEvent) {
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
                //await this.triggerIdleWizards();
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
                     // In this case, the wizard should NOT be allowed a followup action, since he should wait for the spawn event
                    this.addEvent(new EnemySpawnEvent(this.currentTime, this.fortressRoom.getNextActiveEnemy()));
                }
                else {
                    // In this case, the wizard should be allowed a followup action, since there will be no new enemies after next event
                    await this.triggerIdleWizards(); 
                }
                this.rewardWizardFocus(event.enemy.focusReward);
                if (this.checkForVictory() === true) {
                    this.emptyEventQueue(); 
                    return; 
                }
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

    checkForVictory(): boolean {
        return this.fortressRoom.areAllEnemiesDefeated(); 
    }


    rewardWizardFocus(focus: number): void {
        this.log(2, "Adding " + focus + " focus to all wizards."); 
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
        let nextEvent = await this.getRulesEngine(wizard.nameClass).getNextAction(timestampBegin, facts);
        if (nextEvent !== null) {
            // event can be null, for example, if professor has not studied mending charm and no enemies available
            this.addEvent(nextEvent);
        }
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

    toSimulationResults(): CombatSimulationResults {
        if (this.isFinished() === false) {
            throw new Error("Simulation not finished yet!"); 
        }

        let challengeXPRewards = this.fortressRoom.computeChallengeXPRewards(this.isWin!); 
        let wizardResults = this.wizards.map(wizard => {
            return {
                playerIndex: wizard.playerIndex,
                numberOfCasts: wizard.numberAttackCasts,
                numberOfDodgedCasts: wizard.numberDodgedCasts,
                numberOfCriticalCasts: wizard.numberCriticalCasts,
                totalDamage: wizard.totalDamage,
                averageDamage: wizard.totalDamage / wizard.numberAttackCasts,
                challengeXPReward: challengeXPRewards[wizard.playerIndex]
            }
        });
        return {
            wallTimeStart: this.timeStart,
            wallTimeEnd: this.timeEnd,
            durationWallTimeMS: this.timeEnd - this.timeStart,
            durationGameTimeMS: this.currentTime, 
            nEvents: this.nEventsProcessed,
            isWin: this.isWin as boolean, 
            simParameters: this.params,
            wizardResults: wizardResults
        };
    }
    
    // In combat: Drink potion, attack, exit combat

}