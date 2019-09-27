import { CombatSimulationParameters } from "./CombatSimulationParameters";


export interface CombatSimulationResults {

    readonly simParameters: CombatSimulationParameters;
    readonly wizardResults: Array<{
        playerIndex: number, 
        numberOfCasts: number,
        numberOfCriticalCasts: number,
        numberOfDodgedCasts: number,
        totalDamage: number, 
        averageDamage: number
    }>; 
    readonly nEvents: number; 

    readonly wallTimeStart: number; 
    readonly wallTimeEnd: number; 
    readonly durationWallTimeMS: number; 
    readonly durationGameTimeMS: number; 
}