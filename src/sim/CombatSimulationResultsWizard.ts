import { PotionAvailabilityParameters } from "./PotionAvailabilityParameters";
import { nameClassType, nameClassUserFriendlyType } from '../types';


export interface CombatSimulationResultsWizard {
    playerIndex: number, 
    nameClass: nameClassType,
    nameClassUserFriendly: nameClassUserFriendlyType,

    numberOfCasts: number,
    numberOfCriticalCasts: number,
    numberOfDodgedCasts: number,
    totalDamage: number, 
    averageDamage: number,
    numberEnhancementsDuringAttacks: Array<number>, 
    numberImpairmentsDuringAttacks: Array<number>,

    totalDamageReceived: number, 
    numberAttacksReceived: number, 
    numberEnhancementsDuringAttacksReceived: Array<number>; 
    numberImpairmentsDuringAttacksReceived: Array<number>,

    runestoneLevel: number,
    challengeXPReward: number; 

    potionsAtBeginning: PotionAvailabilityParameters,
    potionsUsed: PotionAvailabilityParameters; 
    potionsUsedBrewTimeHours: number; 
    potionsUsedBrewTimeHoursWithMasterNotes: number; 

    timeSpentDefeated: number; 
    hasDefenceCharm: boolean;
    defenceCharmValue: number; 
    hasProficiencyPowerCharm: boolean;
    proficiencyPowerCharmValue: number;  
    hasBraveryCharm: boolean; 
    braveryCharmValue: number; 
}