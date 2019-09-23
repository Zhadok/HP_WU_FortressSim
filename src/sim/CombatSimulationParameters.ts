import { WizardStats } from "../model/player/WizardStats";
import { nameClassType } from "../types";
import { PotionAvailabilityParameters } from "./PotionAvailabilityParameters";
import { PersistedSkillTree } from "../model/player/SkillTree/PersistedSkillTree";

export interface CombatSimulationParameters {

    seed: number, 
    roomLevel: number,
    runestoneLevels: Array<number>,

    nameClasses: Array<nameClassType>,
    potions: Array<PotionAvailabilityParameters>
    //wizardStats: Array<WizardStats> | null
    skillTrees: Array<PersistedSkillTree>

}