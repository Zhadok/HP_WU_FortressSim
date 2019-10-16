import { WizardStats } from "../model/player/WizardStats";
import { nameClassType, ruleContainerType } from "../types";
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

    ruleContainers?: Array<ruleContainerType> // Player rule containers are optional (defaults are used if none are given here)
    groupByValue?: string | number; // Used for comparing multiple simulations: Can be a roomLevel or a skillTreeNode. SimulationResults will be grouped by and compared based on this attribute
}