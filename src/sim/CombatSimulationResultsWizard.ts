

export interface CombatSimulationResultsWizard {
    playerIndex: number, 
    numberOfCasts: number,
    numberOfCriticalCasts: number,
    numberOfDodgedCasts: number,
    totalDamage: number, 
    averageDamage: number,

    runestoneLevel: number,
    challengeXPReward: number; 
}