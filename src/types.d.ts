import enemyData from "./data/enemies.json";
declare type enemyNameType = keyof typeof enemyData;

declare type nameClassType = "auror" | "magizoologist" | "professor";
declare type nameClassUserFriendlyType = "Auror" | "Magizoologist" | "Professor";

import focusCostData from "./data/focusCosts.json";
declare type strategicSpellNameType = keyof typeof focusCostData;

declare type exstimuloPotionType = "normal" | "strong" | "potent";
declare type invigorationPotionType = "weak" | "strong";


import skillTreePofessorData from "./data/skillTreeProfessor.json";
import { WizardStats } from "./model/player/WizardStats";
import { Professor } from "./model/player/Professor";
import { Wizard } from "./model/player/Wizard";
import { Enemy } from "./model/env/enemies/Enemy";
import { CombatSimulationParameters } from "./sim/CombatSimulationParameters.js";
import { PotionAvailabilityParameters } from "./sim/PotionAvailabilityParameters.js";
import { PersistedSkillTree } from "./model/player/SkillTree/PersistedSkillTree.js";
import { CombatSimulationResults } from "./sim/CombatSimulationResults.js";
declare type triggerNameType =
    // Auror triggers
    "aurorAdvantage" | "playingDirty" | "dancingWithDummies" | "trickWithDeathEaters" |
    "firstStrike" | "mundungusAmongUs" |
    // Auror spells
    "weakeningHex" | "batBogeyHex" | "focusCharm" | "confusionHex" |

    // Magizoologist triggers
    "ministryMagizoologyOrientation" | "forumQuorum" | "becomeTheBeast" |
    // Magizoologist spells (mending charm is in professor)
    "staminaCharm" | "reviveCharm" | "braveryCharm" | "spiders" | "birdInHand" | "vileCreatures" |


    // Professor triggers
    "idealExchange" | "restrictedSection" | "strengthInNumbers" | "sparringSpecifics" | "teamworkMakesTheDreamWork" | "confidence" |
    "teamTeaching" | "onSabbatical" | "peskyPixies" | "fullMoonHunter" |
    // Professor spells
    "deteriorationHex" | "mendingCharm" | "proficiencyPowerCharm" | "defenceCharm";

declare type triggerMapType = { [key in triggerNameType]: number | null };


// Skill tree
declare type skillTreeCostsType = {
    costScrolls: number,
    costRedBooks: number,
    costRSB: number
};
declare type skillTreeFilterLessonsType = "all" | "onlyScrolls" | "onlyScrollsAndRed" | "onlyScrollsAndRSB";
declare type skillTreeFilterLessonsMapType = { [key in skillTreeFilterLessonsType]: string };

declare type statNameType = keyof WizardStats;

// Fortress reward data
declare type fortressRewardDataType = {
    dataSource?: string,
    data: {
        friendsBonus: Array<number>,
        groupBonus: Array<number>
        baseXP: Array<number>
    },
    sponsoredFortressRewardsChallengeXPIncrease: number
}


// Player actions
declare type playerActionSelectionModeType = "manual" | "rules";
declare type playerActionSelectionModeMapType = { [key in playerActionSelectionModeType]: string };

declare type actionNameType = strategicSpellNameType |
    "strongInvigorationPotion" | "weakInvigorationPotion" |
    "potentExstimuloPotion" | "strongExstimuloPotion" | "exstimuloPotion" |
    "witSharpeningPotion" | "healthPotion" |
    "enterCombat" |
    "enterCombatWithHighestPriorityAvailableEnemy" |
    "exitCombat" |
    "combatSpellCastWizard" | "noAction";
declare type actionNameMapType = { [key in actionNameType]: string };
declare type rulesActionContainerType = {
    actionName: actionNameType,
    targetWizard: Wizard | null,
    targetEnemy: Enemy | null
};
declare type manualActionContainerType = {
    actionName: actionNameType,
    targetWizardIndex?: number,
    targetEnemyIndex?: number
};


// Target sorting
// What do we want to sort enemy/wizards for?
declare type sortCriteriaReasonType = "highestPriorityAvailableEnemy" | "focusCharm" | "confusionHex" | "weakeningHex" | "defenceCharm";
declare type sortCriteriaResonMapType = { [key in sortCriteriaReasonType]: string}; 

declare type sortCriteriaDirectionType = "asc" | "desc"; 
declare type sortCriteriaDirectionMapType = { [key in sortCriteriaDirectionType]: string}; 
// Example: Default sorting for choosing next enemy to enter combat with would be proficiency > focusReward > stamina
declare type sortCriteriaTargetEnemyType = "proficiency" | "focusReward" | "stamina" | "staminaPercent" | 
    "hasConfusionHex" | "hasWeakeningHex" | "hasDeteriorationHex" | "isElite"; 
declare type sortCriteriaTargetEnemyMapType = { [key in sortCriteriaTargetEnemyType]: string}; 
declare type sortCriteriaTargetWizardType = nameClassType; 

declare type sortCriteriaType = {
    sortCriteriaDirection: sortCriteriaDirectionType,
    sortCriteriaTarget: sortCriteriaTargetEnemyType | sortCriteriaTargetWizardType
}; 

declare type sortCriteriaContainerType = {
    sortCriteriaReason: sortCriteriaReasonType,
    sortCriteria: Array<sortCriteriaType>,
    rule: ruleType
}






// Rule engine
declare type ruleStoreType = { [key in nameClassType]: Array<ruleContainerType>}; 

declare type ruleFactType = {
    wizard: Wizard,
    lowestHPWizard: Wizard,
    highestPriorityAvailableEnemy: Enemy | null,
    allWizards: Array<Wizard>,
    allActiveEnemies: Array<Enemy>,
    chamber: ruleFactChamberType;
}

declare type ruleFactNameType = "wizard" | "lowestHPWizard" | "highestPriorityAvailableEnemy" | "chamber"; // Available in frontend
declare type ruleFactNameMapType = { [key in ruleFactNameType]: {
    label: string,
    allowedPaths: Array<string | null>
} };
declare type ruleFactChamberType = {
    currentTimeSeconds: number,
    remainingTimeSeconds: number,
    remainingEnemies: number,
    isAnyWizardDefeated: boolean,
    isAnyActiveEnemyElite: boolean, 

    numberOfWizards: number,
    numberOfAurors: number, 
    numberOfMagizoologists: number, 
    numberOfProfessors: number,

    isDefenceCharmOnAllWizards: boolean
};
declare type ruleEventTargetType = "targetWizard" | "targetEnemy";
declare type ruleEventTargetMapType = { [key in ruleEventTargetType]: {
    label: string,
    allowedTargets: Array<{
        key: ruleEventAllowedWizardTargets | ruleEventAllowedEnemyTargets,
        label: string
    }>
} };
declare type ruleEventAllowedWizardTargets = "self" | "lowestHP" | "lowestHP_notSelf" | "defeatedWizard";
declare type ruleEventAllowedEnemyTargets = "lowestHP" | "highestPriorityAvailableEnemy";


declare type ruleOperatorType = "equal" | "notEqual" |
    "lessThan" | "lessThanInclusive" | "greaterThan" | "greaterThanInclusive";
declare type ruleOperatorShortType = "==" | "!=" | "<" | "<=" | ">" | ">=";
declare type ruleOperatorMapType = { [key in ruleOperatorType]: ruleOperatorShortType };


declare type ruleConditionGroupNameType = "all" | "any";
declare type ruleConditionType = {
    fact: ruleFactNameType;
    path: string;
    operator: ruleOperatorType;
    value: ruleValueType;
};
/*declare type ruleValueType = {
    fact: string,
    path: string
} | boolean;  */

declare type ruleValueType = any;
declare type ruleType = {
    event: {
        type: actionNameType;
        params?: any;
    },
    priority?: number,
    conditions: {
        all: Array<ruleConditionType>
    }
};

// A ruleContainer is one complete description of one player AI
declare type ruleContainerType = {
    author: string,
    nameClass: nameClassType,
    strategyName: string,
    description: string, 
    rules: Array<ruleType>,
    sortCriteriaContainers: Array<sortCriteriaContainerType>
}



//////////////
// FRONTEND //
//////////////
declare type wizardSettingsType = {
    nameClass: nameClassType,
    potions: PotionAvailabilityParameters,
    runestoneLevel: number,
    skillTree: PersistedSkillTree,
    ruleContainer: ruleContainerType
}


// Visualizing rules in frontend
declare type ruleVisDataContainerType = {
    nameClassUserFriendly: nameClassUserFriendlyType,
    rules: ruleVisDataRowType[]
};
// One row
declare type ruleVisDataRowType = {
    priority: number,
    action: string,
    conditionsString: string
}

// Sim modes for frontend
declare type simGoalType = "single" | "multiple_compare_roomLevels" | "multiple_compare_skillTreeNodes";
declare type simGoalMapType = { [key in simGoalType]: string };
declare type simAdvancedSettingsType = {
    simulationVersion: string,

    simGoal: simGoalType,
    simGoalMultipleParams: {
        simGoalMultiple_minRoomLevel: number,
        simGoalMultiple_maxRoomLevel: number,
        simGoalMultiple_filterSkillTreeNodes: skillTreeFilterLessonsType
    }

    numberSimulationsPerSetting: number,
    runParallel: boolean,
    numberParallelWorkers: number,
    secondsBetweenSimulations: number,

    // Frontend settings
    simulationLogChannel: simulationLogChannelType, // user friendly or debug, which log should be shown?
    showPlayerRules: boolean,
    isAdvancedSettingsTabExpanded: boolean,

    closeSimParametersTabOnStartSimulation: boolean,
    closeAdvancedSettingsTabOnStartSimulation: boolean
    closeStartSimulationTabOnStartSimulation: boolean
};
declare type localStorageDataType = {
    simParameters: CombatSimulationParameters,
    simAdvancedSettings: simAdvancedSettingsType
}

// Single simulation
declare type simulationLogChannelType = "Debug" | "User friendly";
declare type simulationLogChannelStoreType = { [key in simulationLogChannelType]: string };

// Multiple simulations
declare type simProgressType = {
    nTotal: number,
    nFinished: number,
    nRemaining: number
};
// Results of multiple simulations (table). One of these types is one row
declare type simulationResultsGroupedType = {
    groupByValue: string | number | undefined, // could be room level (1, 2, 3, ..) or next skill tree node 

    //roomLevel: number, 
    winPercentage: number,

    // room statistics
    averageNumberOfCasts: number,
    averageCritPercent: number,
    averageDodgePercent: number,
    averageTotalDamage: number,
    averageDamage: number
    averageChallengeXPReward: number,
    averageChallengeXPPerEnergy: number,
    averageNumberEnemiesDefeated: number,
    averageNumberEnemies: number,


    // time statistics
    averageTimeSpentDeadMS: number,
    averageGameTimeMS: number;
    averageBrewTimeHours: number,

    // Per hour statistics
    averageRunsPerHour: number,
    averageChallengeXPRewardPerHour: number;
    averageEnergyPerHour: number,

    numberOfRuns: number
}



// Web workers (parallel execution) 
declare type webWorkerMessageContainerType = {
    messageType: webWorkerMessageType,
    params: {
        combatSimulationParameters?: CombatSimulationParameters,
        runID?: number
    }
}
declare type webWorkerMessageType = "executeSimulation";


declare type webWorkerMessageResponseContainerType = {
    messageType: webWorkerMessageResponseType,
    params: {
        combatSimulationParameters?: CombatSimulationParameters,
        combatSimulationResults?: CombatSimulationResults,
        error?: any
    }
};
declare type webWorkerMessageResponseType = "simulationFinished" | "simulationError";




