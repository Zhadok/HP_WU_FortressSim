import { CombatSimulationParameters } from "./CombatSimulationParameters";
import { CombatSimulationResultsWizard } from "./CombatSimulationResultsWizard";
import { Enemy } from "../model/env/enemies/Enemy";
import { Wizard } from "../model/player/Wizard";


export interface CombatSimulationResults {

    readonly simParameters: CombatSimulationParameters;
    readonly wizardResults: Array<CombatSimulationResultsWizard>; 
    readonly wizards: Array<Wizard>; 
    readonly enemies: Array<Enemy>; 
    readonly nEvents: number;
    readonly isWin: boolean; 
    readonly energyReward: number; 

    wallTimeStart: number; 
    wallTimeEnd: number; 
    durationWallTimeMS: number; 
    readonly durationGameTimeMS: number; 

    runID?: number; 
}