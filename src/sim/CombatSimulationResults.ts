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
    readonly timeStart: number; 
    readonly timeEnd: number; 
    readonly durationMS: number; 
}