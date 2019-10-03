import { CombatSimulationParameters } from "./CombatSimulationParameters";
import { CombatSimulationResultsWizard } from "./CombatSimulationResultsWizard";
import { Enemy } from "../model/env/enemies/Enemy";


export interface CombatSimulationResults {

    readonly simParameters: CombatSimulationParameters;
    readonly wizardResults: Array<CombatSimulationResultsWizard>; 
    readonly enemies: Array<Enemy>; 
    readonly nEvents: number;
    readonly isWin: boolean; 

    wallTimeStart: number; 
    wallTimeEnd: number; 
    durationWallTimeMS: number; 
    readonly durationGameTimeMS: number; 

    runID?: number; 
}