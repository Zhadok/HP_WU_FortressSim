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
declare type triggerNameType = 
            // Auror triggers
            "aurorAdvantage" | "playingDirty" | "dancingWithDummies" | "trickWithDeathEaters" |
            "firstStrike" | "mundungusAmongUs" | 
            // Auror spells
            "weakeningHex" | "batBogeyHex" | "focusCharm" | "confusionHex" |

            // Professor triggers
            "idealExchange" | "strengthInNumbers" | "sparringSpecifics" | "teamworkMakesTheDreamWork" | "confidence" |
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

declare type statNameType = keyof WizardStats;

// Rule engine
declare type ruleFactType = {
    wizard: Wizard,
    allWizards: Array<Wizard>,
    highestPriorityAvailableEnemy: Enemy | null
}
declare type actionNameType = strategicSpellNameType | 
                              "enterCombatWithHighestPriorityAvailableEnemy" | "exitCombat" | 
                              "combatSpellCastWizard";



// Sim modes for frontend
declare type simGoalType = "single" | "multiple_compare_roomLevels" | "multiple_compare_skillTreeNodes";
declare type simAdvancedSettingsType = {
    simGoal: simGoalType,
    numberSimulations: number,
    runParallel: boolean
}; 
declare type simProgressType = {
    nTotal: number, 
    nFinished: number, 
    nRemaining: number
};

declare type simulationResultsGroupedType = {
    roomLevel: number, 
    winPercentage: number,
    
    averageNumberOfCasts: number,
    averageNumberOfCriticalCasts: number,
    averageNumberOfDodgedCasts: number,
    averageTotalDamage: number, 
    averageDamage: number

    averageGameTimeMS: number; 

    numberOfRuns: number
}
