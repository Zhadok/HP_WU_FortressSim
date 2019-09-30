import { WizardStats } from "./WizardStats";
import { Auror } from "./Auror";
import { Magizoologist } from "./Magizoloogist";
import { Professor } from "./Professor";
import { nameClassType, triggerNameType } from "../../types";
import { Wizard } from "./Wizard";
import { SkillTree } from "./SkillTree/SkillTree";
import { PotionAvailabilityParameters } from "../../sim/PotionAvailabilityParameters";


export class WizardFactory {

    /*static buildProfessor(stats: WizardStats, playerIndex: number, knockoutTime: number): Professor {
        return this.buildWizard(stats, "professor", playerIndex, knockoutTime) as Professor;
    }*/

    static buildWizard(stats: WizardStats, nameClass: nameClassType, playerIndex: number, knockoutTime: number): Wizard {
        switch (nameClass) {
            case "auror": return new Auror(stats, playerIndex, knockoutTime);
            case "magizoologist": return new Magizoologist(stats, playerIndex, knockoutTime);
            case "professor": return new Professor(stats, playerIndex, knockoutTime);
        }
    }

    /*static buildWizardWithTriggers(stats: WizardStats, nameClass: nameClassType, playerIndex: number, knockoutTime: number, triggers: Map<triggerNameType,number>): Wizard {
        let result = this.buildWizard(stats, nameClass, playerIndex, knockoutTime);
        result.triggers = triggers;
        return result;
    }*/

    static buildWizardWithSkillTree(skillTree: SkillTree, playerIndex: number, knockoutTime: number, potions: PotionAvailabilityParameters): Wizard {
        let wizard = this.buildWizard(skillTree.toWizardStats(), skillTree.nameClass, playerIndex, knockoutTime);
        wizard.setPotions(potions); 
        skillTree.applyTriggers(wizard);
        return wizard;
    }

}