import { PotionAvailabilityParameters } from "./PotionAvailabilityParameters";


export interface CombatSimulationResultsWizard {
    playerIndex: number, 
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

    potionsUsed: PotionAvailabilityParameters; 
    potionsUsedBrewTimeHours: number; 
    potionsUsedBrewTimeHoursWithMasterNotes: number; 

    timeSpentDefeated: number; 
}