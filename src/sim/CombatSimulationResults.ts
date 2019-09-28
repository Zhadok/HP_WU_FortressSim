import { CombatSimulationParameters } from "./CombatSimulationParameters";
import { CombatSimulationResultsWizard } from "./CombatSimulationResultsWizard";


export interface CombatSimulationResults {

    readonly simParameters: CombatSimulationParameters;
    readonly wizardResults: Array<CombatSimulationResultsWizard>; 
    readonly nEvents: number;
    readonly isWin: boolean; 

    wallTimeStart: number; 
    wallTimeEnd: number; 
    durationWallTimeMS: number; 
    readonly durationGameTimeMS: number; 

    runID?: number; 
}