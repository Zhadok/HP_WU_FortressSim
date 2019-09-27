import { TestData } from "../../TestData";
import { Logger } from "../../../src/util/Logger";
import { CombatSimulationParameters } from "../../../src/sim/CombatSimulationParameters";
import { CombatSimulationComparison } from "../../../src/sim/parallel/CombatSimulationComparison";


describe("CombatSimulationComparison", function() {
    
    let baseParams: CombatSimulationParameters; 
    let numberSimulationsPerSeed: number; 
    beforeEach(() => {
        baseParams = TestData.buildDefaultSimParameters();
        numberSimulationsPerSeed = 10;
        Logger.verbosity = 2; 
    });
    
    

    it('run', async function() {
        let comparison = new CombatSimulationComparison(baseParams, "multiple_compare_roomLevels", numberSimulationsPerSeed);
        await comparison.run(); 
    });

});