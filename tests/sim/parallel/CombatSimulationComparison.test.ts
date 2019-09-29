import { TestData } from "../../TestData";
import { Logger } from "../../../src/util/Logger";
import { CombatSimulationParameters } from "../../../src/sim/CombatSimulationParameters";
import { CombatSimulationComparison } from "../../../src/sim/parallel/CombatSimulationComparison";
import { expect } from "chai";


describe("CombatSimulationComparison", function() {
    
    let baseParams: CombatSimulationParameters; 
    let numberSimulationsPerSeed: number; 
    beforeEach(() => {
        baseParams = TestData.buildDefaultSimParameters();
        numberSimulationsPerSeed = 2;
        Logger.verbosity = 2; 
    });
    
    

    it('runSync', function() {
        Logger.verbosity = 0; 
        let comparison = new CombatSimulationComparison(baseParams, "multiple_compare_roomLevels", 1);
        let result = comparison.runAllSync(); 
        return result.then((results) => {
            expect(results.length).to.equal(20); 
        }); 
    });

    it("runParallel", function() {
        Logger.verbosity = 0;
        let comparison = new CombatSimulationComparison(baseParams, "multiple_compare_roomLevels", 1);
        let result = comparison.runParallel(); 
        return result.then((results) => {
            expect(results.length).to.equal(20); 
        }); 
    });

    it("runSync_shouldEqual_runParallel", async function() {
        Logger.verbosity = 0; 
        let comparisonSync = new CombatSimulationComparison(baseParams, "multiple_compare_roomLevels", 1);
        let results1 = await comparisonSync.runAllSync(); 

        let comparisonParallel = new CombatSimulationComparison(baseParams, "multiple_compare_roomLevels", 1);
        let results2 = await comparisonParallel.runParallel(); 
        
        expect(results1.length).to.equal(results2.length); 
        for (let i=0; i<results1.length; i++) {
            delete results1[i].durationWallTimeMS;
            delete results1[i].wallTimeStart;
            delete results1[i].wallTimeEnd;
            delete results2[i].durationWallTimeMS;
            delete results2[i].wallTimeStart;
            delete results2[i].wallTimeEnd;
            //console.log(results1[i]);
            //console.log(results2[i]);
            expect(results1[i]).to.deep.equal(results2[i]); 
        }
    });

});