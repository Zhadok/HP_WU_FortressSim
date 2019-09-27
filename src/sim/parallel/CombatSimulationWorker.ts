import * as workerpool from 'workerpool';
//var workerpool = require('workerpool');
import { CombatSimulationParameters } from '../CombatSimulationParameters';
import Prando from 'prando';
import { CombatSimulationResults } from '../CombatSimulationResults';
//import { CombatSimulation } from '../CombatSimulation';

export function combatSimulationWorker(params: CombatSimulationParameters, rng: Prando): Promise<CombatSimulationResults> {
    var CombatSimulation = require("../CombatSimulation"); 
    
    console.log("HERE"); 
    let sim = new CombatSimulation(params, rng);
    sim.init(); 
    return sim.simulate().then(() => {
        return sim.toSimulationResults(); 
    }); 
}

/*xport async function combatSimulationWorker(params: CombatSimulationParameters, rng: Prando): Promise<string> {

    return "done!"; 
}*/

/*workerpool.asd({
    combatSimulationWorker
});*/