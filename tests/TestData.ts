import { CombatSimulationParameters } from "../src/sim/CombatSimulationParameters";
import { Enemy } from "../src/model/env/enemies/Enemy";
import { Professor } from "../src/model/player/Professor";
import { WizardFactory } from "../src/model/player/WizardFactory";
import { WizardStats } from "../src/model/player/WizardStats";
import { FortressRoom } from "../src/model/env/FortressRoom";
import Prando from "prando";
import { Auror } from "../src/model/player/Auror";
import { Magizoologist } from "./model/player/Magizoologist";
import { PotionAvailabilityParameters } from "../src/sim/PotionAvailabilityParameters";
import { enemyNameType, nameClassType, simAdvancedSettingsType, nameClassUserFriendlyType, ruleFactType } from "../src/types";
import { CombatSimulation } from "../src/sim/CombatSimulation";
import { SkillTree } from "../src/model/player/SkillTree/SkillTree";
import { PersistedSkillTree } from "../src/model/player/SkillTree/PersistedSkillTree";
import { Wizard } from "../src/model/player/Wizard";
import { CombatSimulationResults } from "./sim/CombatSimulationResults";

export class TestRNG_0 extends Prando {
    next(): number {
        return 0;
    }
}
export class TestRNG_1 extends Prando {
    next(): number {
        // rng.next() doesnt actually ever return 1 (0 inclusive, 1 exclusive)
        return 0.99999;
    }
}
export class TestRNG_Sequence extends Prando {
    
    currentIndex: number = 0;
    sequence: Array<number>;

    constructor(sequence: Array<number>) {
        super(0);
        this.sequence = sequence;
    }

    next() {
        if (this.currentIndex >= this.sequence.length) {
            throw new Error("too many rng calls!");
        }
        
        let result = this.sequence[this.currentIndex];
        this.currentIndex++;
        return result;
    }
}

export class TestData {

    static getDefaultRoomLevel() {
        return 8;
    }

    static buildDefaultSim(): CombatSimulation {
        return new CombatSimulation(this.buildDefaultSimParameters(), this.buildNewRNG_0());
    }

    /*static buildDefaultWizardStats(): WizardStats {
        let result = WizardStats.buildBaseStats();
        result.maxFocus = 7;
        result.initialFocus = 4;
        return result;
    }*/
    static buildDefaultSkillTree(nameClass: nameClassType): SkillTree {
        let result = new SkillTree(nameClass);
        return result; 
    }
    static buildDefaultSkillTreeAuror(): SkillTree {
        let skillTree = this.buildDefaultSkillTree("auror");
        skillTree.setNodeLevelByTriggerName("batBogeyHex", 1);
        skillTree.setNodeLevelByTriggerName("weakeningHex", 1);
        skillTree.setNodeLevelByTriggerName("focusCharm", 1);
        skillTree.setNodeLevelByTriggerName("confusionHex", 1);
        return skillTree;
        
    }
    static buildDefaultSkillTreeMagizoologist(): SkillTree {
        let skillTree = this.buildDefaultSkillTree("magizoologist");
        skillTree.setNodeLevelByTriggerName("mendingCharm", 1); 
        skillTree.setNodeLevelByTriggerName("staminaCharm", 1); 
        skillTree.setNodeLevelByTriggerName("reviveCharm", 1); 
        skillTree.setNodeLevelByTriggerName("braveryCharm", 1); 
        return skillTree;
    }
    static buildDefaultSkillTreeProfessor(): SkillTree {
        let skillTree = this.buildDefaultSkillTree("professor");
        skillTree.setNodeLevelByTriggerName("defenceCharm", 1);
        skillTree.setNodeLevelByTriggerName("deteriorationHex", 1);
        skillTree.setNodeLevelByTriggerName("proficiencyPowerCharm", 1);
        skillTree.setNodeLevelByTriggerName("mendingCharm", 1);
        
        return skillTree;
    }
    
    static buildNewRNG_0(): Prando {
        return new TestRNG_0();
    }
    static buildNewRNG_1(): Prando {
        return new TestRNG_1();
    }
    static buildNewRNG_Sequence(sequence: Array<number>): Prando {
        return new TestRNG_Sequence(sequence);
    }

    static buildDefaultSimAdvancedSettings(): simAdvancedSettingsType {
        return {
            simulationVersion: "test",
            numberSimulationsPerSetting: 1, 
            runParallel: false, 
            secondsBetweenSimulations: 40,
            showPlayerRules: false,
            numberParallelWorkers: 1, 
            simGoal: "single",
            simGoalMultipleParams: {
                simGoalMultiple_filterSkillTreeNodes: "all",
                simGoalMultiple_minRoomLevel: 1,
                simGoalMultiple_maxRoomLevel: 20
            }, 
            simulationLogChannel: "Debug",
            isAdvancedSettingsTabExpanded: false,
            closeAdvancedSettingsTabOnStartSimulation: false,
            closeSimParametersTabOnStartSimulation: false,
            closeStartSimulationTabOnStartSimulation: false
        }; 
    }

    static buildDefaultSimParameters(): CombatSimulationParameters {
        return {
            useSponsoredFortressRewards: false, 

            roomLevel: this.getDefaultRoomLevel(),
            runestoneLevels: [1], 

            nameClasses: ["professor"],
            // wizardStats: [ this.buildDefaultWizardStats() ],
            
            potions: [this.buildDefaultPotionParameters()],
            skillTrees: [this.buildDefaultSkillTreeProfessor().persist()],

            seed: 0
        };
    }

    static buildDefaultPotionParameters(): PotionAvailabilityParameters {
        return {
            nHealingPotionsAvailable: 1,

            nWeakInvigorationAvailable: 1,
            nStrongInvigorationAvailable: 1,

            nExstimuloAvailable: 0,
            nStrongExstimuloAvailable: 1,
            nPotentExstimuloAvailable: 2,

            nWitSharpeningAvailable: 1,
            
            hasBaruffiosBrainElixir: false, 
            hasTonicForTraceDetection: false
        };
    }
    static buildDefaultPotionParameters_noPotions(): PotionAvailabilityParameters {
        return {
            nHealingPotionsAvailable: 0,

            nWeakInvigorationAvailable: 0,
            nStrongInvigorationAvailable: 0,

            nExstimuloAvailable: 0,
            nStrongExstimuloAvailable: 0,
            nPotentExstimuloAvailable: 0,

            nWitSharpeningAvailable: 0,
            
            hasBaruffiosBrainElixir: false, 
            hasTonicForTraceDetection: false
        };
    }

    static buildDefaultSimParametersTwoWizards(): CombatSimulationParameters {
        return {
            useSponsoredFortressRewards: false, 

            roomLevel: this.getDefaultRoomLevel(),
            runestoneLevels: [1, 1], 

            nameClasses: ["professor", "magizoologist"],
            //wizardStats: [ this.buildDefaultWizardStats(), this.buildDefaultWizardStats() ],
            
            potions: [ this.buildDefaultPotionParameters(), this.buildDefaultPotionParameters()],

            skillTrees: [ this.buildDefaultSkillTreeProfessor().persist(), this.buildDefaultSkillTreeMagizoologist().persist()], 

            seed: 0
        };
    }

    static buildDefaultAuror(): Auror {
        let skillTree = this.buildDefaultSkillTreeAuror();
        let wizard = WizardFactory.buildWizardWithSkillTree(skillTree, 0, 
            FortressRoom.computeKnockoutTimeStatic(this.getDefaultRoomLevel()), this.buildDefaultPotionParameters()) as Auror;
        wizard.stats.maxFocus = 7;
        return wizard;
    }
    static buildDefaultMagizoologist(): Magizoologist {
        let skillTree = this.buildDefaultSkillTreeMagizoologist();
        let wizard = WizardFactory.buildWizardWithSkillTree(skillTree, 0, 
            FortressRoom.computeKnockoutTimeStatic(this.getDefaultRoomLevel()), this.buildDefaultPotionParameters()) as Magizoologist;
        wizard.stats.maxFocus = 7;
        return wizard;
    }
    static buildDefaultProfessor(): Professor {
        let skillTree = this.buildDefaultSkillTreeProfessor();
        let wizard =  WizardFactory.buildWizardWithSkillTree(skillTree, 0, 
            FortressRoom.computeKnockoutTimeStatic(this.getDefaultRoomLevel()), this.buildDefaultPotionParameters()) as Professor;
        wizard.stats.maxFocus = 7;
        return wizard;
    }
    static buildDefaultClass(nameClass: nameClassType): Wizard {
        switch (nameClass) {
            case "auror": return TestData.buildDefaultAuror(); 
            case "magizoologist": return TestData.buildDefaultMagizoologist(); 
            case "professor": return TestData.buildDefaultProfessor(); 
        }
    }



    static buildDefaultEnemies(): Array<Enemy> {
        return [
            Enemy.buildEnemy("acromantula", 0, false, 1, 1, 3),
            Enemy.buildEnemy("pixie", 1, false, 1, 1, 2)
        ]
    }
    static buildDefaultEnemy(): Enemy {
        return this.buildDefaultEnemies()[0];
    }
    static buildDefaultEnemyType(enemyName: enemyNameType) {
        return Enemy.buildEnemy(enemyName, 1, false, 1, 1, 2);
    }
    static buildDefaultPixie(): Enemy {
        return this.buildDefaultEnemyType("pixie");
    }
    static buildDefaultWerewolf(): Enemy {
        return this.buildDefaultEnemyType("werewolf");
    }
    
    static buildDefaultEnemyWithDefence(): Enemy {
        return Enemy.buildEnemy("darkWizard", 0, false, 5, 1, 3);
    }
    static buildDefaultEnemyElite(): Enemy {
        return Enemy.buildEnemy("acromantula", 0, true, 1, 1, 3);
    }

    static buildDefaultRuleFacts(wizard: Wizard, enemy: Enemy): ruleFactType {
        return {
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
                isAnyActiveEnemyElite: false,

                numberOfWizards: 1,
                numberOfAurors: 0,
                numberOfMagizoologists: 0,
                numberOfProfessors: 1, 

                isDefenceCharmOnAllWizards: false
            }
        };
    }

    static buildSimResult(roomLevel: number, seed: number, useSponsoredFortressRewards: boolean): CombatSimulationResults {
        let simParameters = TestData.buildDefaultSimParameters(); 
        simParameters.seed = seed; 
        simParameters.roomLevel = roomLevel;
        simParameters.useSponsoredFortressRewards = useSponsoredFortressRewards;
        simParameters.groupByValue = roomLevel; 
        return {
            simParameters: simParameters,
            durationGameTimeMS: 30*1000,
            maxGameTimeMS: 60*1000,
            durationWallTimeMS: 50,
            energyReward: FortressRoom.getEnergyRewardStatic(roomLevel, useSponsoredFortressRewards),
            enemies: [],
            isWin: true,
            nEvents: 1,
            wallTimeStart: 1000,
            wallTimeEnd: 1050,
            wizardResults: [{
                averageDamage: 100,
                braveryCharmValue: 0.5,
                hasBraveryCharm: true,
                challengeXPReward: 150,
                defenceCharmValue: 0.25,
                hasDefenceCharm: true,
                proficiencyPowerCharmValue: 0.44,
                hasProficiencyPowerCharm: true,
                nameClass: "professor" as nameClassType,
                nameClassUserFriendly: "Professor" as nameClassUserFriendlyType,
                numberAttacksReceived: 10,
                numberEnhancementsDuringAttacks: [],
                numberEnhancementsDuringAttacksReceived: [],
                numberImpairmentsDuringAttacks: [],
                numberImpairmentsDuringAttacksReceived: [],
                numberOfCasts: 10,
                numberOfCriticalCasts: 5,
                numberOfDodgedCasts: 2,
                playerIndex: 0,
                potionsAtBeginning: TestData.buildDefaultPotionParameters(),
                potionsUsed: TestData.buildDefaultPotionParameters_noPotions(),
                potionsUsedBrewTimeHours: 10,
                potionsUsedBrewTimeHoursWithMasterNotes: 8.5,
                runestoneLevel: 1,
                timeSpentDefeated: 0,
                totalDamage: 10*100,
                totalDamageReceived: 100
            }]
        }
    }

}


