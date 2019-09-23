import { triggerNameType, statNameType } from "../../../types";

export interface SkillTreeNode {

    readonly rowIndex: number;
    readonly columnIndex: number; 

    readonly name: string;
    readonly triggerName: triggerNameType | null; 

    readonly statChangeDescription: string;
    readonly statChanged: statNameType | null;
    readonly levels: Array<{
        statChange: number,
        costScrolls: number,
        costSpellBooks: number | null,
        costRSB: number | null
    }>;

    readonly dependencies: Array<string>;
    


}