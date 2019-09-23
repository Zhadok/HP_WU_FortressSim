import { nameClassType } from "../../../types";
import { PersistedSkillTreeNode } from "./PersistedSkillTreeNode";


export interface PersistedSkillTree {

    readonly nameClass: nameClassType;
    readonly nodesStudied: Array<PersistedSkillTreeNode>;

}