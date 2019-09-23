import { CombatSimulationParameters } from "../src/sim/CombatSimulationParameters";
import { Enemy } from "../src/model/env/enemies/Enemy";
import { Professor } from "../src/model/player/Professor";
import { WizardFactory } from "../src/model/player/WizardFactory";
import { WizardStats } from "../src/model/player/WizardStats";
import { FortressRoom } from "../src/model/env/FortressRoom";
import Prando from "prando";
import { Auror } from "../src/model/player/Auror";
import { Magizoologist } from "../src/model/player/Magizoloogist";
import { PotionAvailabilityParameters } from "../src/sim/PotionAvailabilityParameters";
import { enemyNameType, nameClassType } from "../src/types";
import { CombatSimulation } from "../src/sim/CombatSimulation";
import { SkillTree } from "../src/model/player/SkillTree/SkillTree";
import { PersistedSkillTree } from "../src/model/player/SkillTree/PersistedSkillTree";

export class TestRNG_0 extends Prando {
    next(): number {
        return 0;
    }
}
export class TestRNG_1 extends Prando {
    next(): number {
        return 1;
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
        return this.buildDefaultSkillTree("auror");
    }
    static buildDefaultSkillTreeMagizoologist(): SkillTree {
        let skillTree = this.buildDefaultSkillTree("magizoologist");
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

    static buildDefaultSimParameters(): CombatSimulationParameters {
        return {
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

            nWitSharpeningAvailable: 1
        };
    }

    static buildDefaultSimParametersTwoWizards(): CombatSimulationParameters {
        return {
            roomLevel: this.getDefaultRoomLevel(),
            runestoneLevels: [1], 

            nameClasses: ["professor", "magizoologist"],
            //wizardStats: [ this.buildDefaultWizardStats(), this.buildDefaultWizardStats() ],
            
            potions: [ this.buildDefaultPotionParameters(), this.buildDefaultPotionParameters()],

            skillTrees: [ this.buildDefaultSkillTreeProfessor().persist(), this.buildDefaultSkillTreeMagizoologist().persist()], 

            seed: 0
        };
    }

    static buildDefaultAuror(): Auror {
        let skillTree = this.buildDefaultSkillTreeAuror();
        let wizard = WizardFactory.buildWizardWithSkillTree(skillTree, 0, FortressRoom.computeKnockoutTimeStatic(this.getDefaultRoomLevel())) as Auror;
        wizard.stats.maxFocus = 7;
        return wizard;
    }
    static buildDefaultMagizoologist(): Magizoologist {
        let skillTree = this.buildDefaultSkillTreeMagizoologist();
        let wizard = WizardFactory.buildWizardWithSkillTree(skillTree, 0, FortressRoom.computeKnockoutTimeStatic(this.getDefaultRoomLevel())) as Magizoologist;
        wizard.stats.maxFocus = 7;
        return wizard;
    }
    static buildDefaultProfessor(): Professor {
        let skillTree = this.buildDefaultSkillTreeProfessor();
        let wizard =  WizardFactory.buildWizardWithSkillTree(skillTree, 0, FortressRoom.computeKnockoutTimeStatic(this.getDefaultRoomLevel())) as Professor;
        wizard.stats.maxFocus = 7;
        return wizard;
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


}


