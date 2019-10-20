import { CombatSimulationParameters } from '../CombatSimulationParameters';
var CombatSimulationParameters = require("../CombatSimulationParameters");
import Prando from 'prando';
import { CombatSimulationResults } from '../CombatSimulationResults';
import { CombatSimulation } from '../CombatSimulation';


export function combatSimulationWorker(params: CombatSimulationParameters, rng: Prando): Promise<CombatSimulationResults> {
    let sim = new CombatSimulation(params, rng);
    sim.init(); 
    return sim.simulate().then(() => {
        return sim.toSimulationResults(); 
    }); 
}
