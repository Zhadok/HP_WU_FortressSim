import { CombatSimulation } from "./sim/CombatSimulation";
import Prando from "prando";
import { CombatSimulationParameters } from "./sim/CombatSimulationParameters";
import { TestData } from "../tests/TestData";
import { Logger } from "./util/Logger";

/*
let params: CombatSimulationParameters = {
    roomLevel: 1, 
    runestoneLevels: [1], 

    nameClasses: ["professor"],
    // wizardStats: [ this.buildDefaultWizardStats() ],
    
    potions: {
        nHealingPotionsAvailable: 1,

        nWeakInvigorationAvailable: 1,
        nStrongInvigorationAvailable: 1,

        nExstimuloAvailable: 0,
        nStrongExstimuloAvailable: 1,
        nPotentExstimuloAvailable: 2,

        nWitSharpeningAvailable: 1
    },
    skillTrees: [this.buildDefaultSkillTreeProfessor().persist()],

    seed: 0
}*/

(async function() {

    Logger.verbosity = 0;
    let nRuns = 10;
    let startTime = (new Date()).getTime();
    let params = TestData.buildDefaultSimParameters();
    for (let i=0;i<nRuns;i++) {
        let sim = new CombatSimulation(params, new Prando(0));
        sim.init(); 
        await sim.simulate();
    }
    let endTime = (new Date()).getTime();


    console.log("Simulations took " + (endTime - startTime)/nRuns + "ms each.");

})();


