import { SkillTreeNode } from "./SkillTreeNode";
import { WizardStats } from "../WizardStats";
import { Logger } from "../../../util/Logger";

import skillTreeProfessorData from "../../../data/skillTreeProfessor.json";
import skillTreeAurorData from "../../../data/skillTreeAuror.json";
import skillTreeMagizoologistData from "../../../data/skillTreeMagizoologist.json";
import { nameClassType, triggerNameType, triggerMapType } from "../../../types";
import { PersistedSkillTreeNode } from "./PersistedSkillTreeNode";
import { PersistedSkillTree } from "./PersistedSkillTree";
import { Wizard } from "../Wizard";

// One skill tree is a concrete instance of a skill tree for one wizard (which lessons has the wizard learned and at which level?)
export class SkillTree {
    
    readonly nameClass: nameClassType;; 
    readonly nodesStudied: Map<SkillTreeNode, number>;

    constructor(nameClass: nameClassType) {
        this.nameClass = nameClass; 
        this.nodesStudied = new Map<SkillTreeNode, number>();

        // Initialize with no lessons learned
        let data: Array<SkillTreeNode>; 
        switch (nameClass) {
            case "auror": data = skillTreeAurorData.data as Array<SkillTreeNode>; break; 
            case "professor": data = skillTreeProfessorData.data as Array<SkillTreeNode>; break;
            case "magizoologist": data = skillTreeMagizoologistData.data as Array<SkillTreeNode>; break; 
        }
        for (let jsonNode of data!) {
            let node: SkillTreeNode = jsonNode as SkillTreeNode;
            this.nodesStudied.set(node, 0);
        }  
        
    }   

    static fromPersisted(persistedSkillTree: PersistedSkillTree): SkillTree {
        let result = new SkillTree(persistedSkillTree.nameClass);
        result.setStudiedLevels(persistedSkillTree.nodesStudied);
        return result;
    }

    // Returns a string that is easy to put in URLs
    // nameClass
    // nodesStudied: [{
    //    rowIndex: 0,
    //    columnIndex: 0,
    //    levelStudied: 1 (will be greater 0)
    // }]
    //
    persist(): PersistedSkillTree {
        let nodesStudiedResult: Array<PersistedSkillTreeNode> = [];
        this.nodesStudied.forEach((level, node) => {
            if (level > 0) {
                nodesStudiedResult.push({
                    rowIndex: node.rowIndex,
                    columnIndex: node.columnIndex,
                    levelStudied: level
                });
            }
        });
        return {
            nameClass: this.nameClass,
            nodesStudied: nodesStudiedResult
        };
    }

    validateNodeLevel(node: SkillTreeNode, levelToCheck: number): void {
        if (levelToCheck > node.levels.length) {
            throw new Error("Tried to set invalid level=" + levelToCheck + " for node ID=" + node.rowIndex + "/" + node.columnIndex + ", max level=" + node.levels.length);
        }
    }

    setStudiedLevels(nodesPersisted: Array<PersistedSkillTreeNode>) {
        nodesPersisted.forEach((nodePersisted) => {

            let found = false; 
            // Find correct node and set the level
            this.nodesStudied.forEach((level, node) => {
                if (node.rowIndex === nodePersisted.rowIndex && node.columnIndex === nodePersisted.columnIndex) {
                    this.validateNodeLevel(node, nodePersisted.levelStudied);
                    this.nodesStudied.set(node, nodePersisted.levelStudied);
                    found = true; 
                }
            });

            if (found === false) {
                throw new Error("Tried to set invalid node with ID=" + nodePersisted.rowIndex + "/" + nodePersisted.columnIndex);
            }
        });
    }
    setNodeLevelByName(nodeName: string, newLevel: number) {
        let found = false; 
        this.nodesStudied.forEach((level, node) => {
            if (node.name === nodeName) {
                this.validateNodeLevel(node, newLevel);  
                this.nodesStudied.set(node, newLevel);
                found = true; 
            }
        });
        if (found === false) {
            throw new Error("Tried to set invalid node with name=" + nodeName);
        }
    }
    setNodeLevelByTriggerName(triggerName: triggerNameType, newLevel: number) {
        let found = false; 
        this.nodesStudied.forEach((level, node) => {
            // console.log(node.triggerName);
            if (node.triggerName === triggerName) {
                this.validateNodeLevel(node, newLevel);  
                this.nodesStudied.set(node, newLevel);
                found = true; 
            }
        });
        if (found === false) {
            throw new Error("Tried to set invalid node with triggerName=" + triggerName);
        }
    }

    applyTriggers(wizard: Wizard) {
        this.nodesStudied.forEach((level, node) => {
            if (level === 0 || node.triggerName === null) {
                return; 
            }
            Logger.log(3, "SkillTree.applyTriggers(): Setting triggerName=" + node.triggerName + ", value=" + node.levels[0].statChange);
            wizard.setTrigger(node.triggerName, node.levels[0].statChange);
        });
    }

    // Returns only stats and strategic spell stats, no triggers or skills learnt
    toWizardStats(): WizardStats {
        let stats: WizardStats = WizardStats.buildBaseStats();

        // Ignore any without "statChanged" attributes
        this.nodesStudied.forEach((level, node) => {
            if (node.statChanged === null) {
                Logger.log(2, "SkillTree.toWizardStats(): Skipping node with name=" + node.name);
                return; 
            }
            if (level === 0) {
                Logger.log(3, "SkillTree.toWizardStats(): Node was not studied with name=" + node.name);
                return; 
            }

            // How much was the stat changed by?
            let statChange: number = 0;
            for (var i=0;i<level;i++) {
                // Example: level=2, so level data with indices 0 and 1 are needed
                statChange += node.levels[i].statChange;
            }
            
            // Is the stat that was changed one of the normal wizard stats?
            if (node.statChanged in stats) { 
                stats[node.statChanged as keyof WizardStats] += statChange; 
            }
            else {
                throw new Error("Error: bad value with node.statChanged='" + node.statChanged + "'");
            }
        });
        return stats;
    }

    getNumberOfLessons(): number {
        let result = 0;
        this.nodesStudied.forEach((level, node) => {
            result += node.levels.length;
        });
        return result;
    }

}
