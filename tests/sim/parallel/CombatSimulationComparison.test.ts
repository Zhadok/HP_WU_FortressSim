import { TestData } from "../../TestData";
import { Logger } from "../../../src/util/Logger";
import { CombatSimulationParameters } from "../../../src/sim/CombatSimulationParameters";
import { CombatSimulationComparison } from "../../../src/sim/parallel/CombatSimulationComparison";
import { expect } from "chai";
import { SkillTree } from "../../../src/model/player/SkillTree/SkillTree";
import { simAdvancedSettingsType } from "../../types";


describe("CombatSimulationComparison", function() {
    
    let baseParams: CombatSimulationParameters; 
    let advancedSettings: simAdvancedSettingsType; 
    beforeEach(() => {
        baseParams = TestData.buildDefaultSimParameters();
        Logger.verbosity = 2; 
        advancedSettings = TestData.buildDefaultSimAdvancedSettings(); 
    });
    
    it("getSimParameters_defaultRomLevels", function() {
        advancedSettings.numberSimulationsPerSetting = 5; 
        advancedSettings.simGoal = "multiple_compare_roomLevels"; 
        let comparison = new CombatSimulationComparison(baseParams, advancedSettings);
        expect(comparison.allSimParams.length).to.equal(advancedSettings.numberSimulationsPerSetting * 20);

        
    });
    it("getSimParameters_customRoomLevels", function() {
        advancedSettings.numberSimulationsPerSetting = 5;
        advancedSettings.simGoalMultipleParams.simGoalMultiple_minRoomLevel = 10; 
        advancedSettings.simGoalMultipleParams.simGoalMultiple_maxRoomLevel = 15;  
        advancedSettings.simGoal = "multiple_compare_roomLevels"; 
        let comparison = new CombatSimulationComparison(baseParams, advancedSettings);
        expect(comparison.allSimParams.length).to.equal(advancedSettings.numberSimulationsPerSetting * 6);
    });

    it("getSimParameters_nextSkillTreeNodes", function() {
        advancedSettings.numberSimulationsPerSetting = 1; 
        advancedSettings.simGoal = "multiple_compare_skillTreeNodes"; 
        
        baseParams.skillTrees[0] = {nameClass: baseParams.nameClasses[0], nodesStudied: []};  // Create empty tree
        let comparison = new CombatSimulationComparison(baseParams, advancedSettings);
        let nextSkillTreeNodes = SkillTree.fromPersisted(baseParams.skillTrees[0]).getNextPossibleLessons(); 

        expect(comparison.allSimParams.length).to.equal(advancedSettings.numberSimulationsPerSetting * (nextSkillTreeNodes.size+1));

        let skillTreeWithFirstNode = comparison.allSimParams[1].skillTrees[0]; 
        expect(skillTreeWithFirstNode.nodesStudied.length).to.equal(1); 
        expect(skillTreeWithFirstNode.nodesStudied[0].levelStudied).to.equal(1); 

        let skillTreeWithDifferentNode = comparison.allSimParams[10].skillTrees[0]; 
        expect(skillTreeWithDifferentNode.nodesStudied.length).to.equal(1); 
        expect(skillTreeWithDifferentNode.nodesStudied[0].levelStudied).to.equal(1); 

    });

    it('runSync', function() {
        Logger.verbosity = 0; 

        advancedSettings.numberSimulationsPerSetting = 1; 
        advancedSettings.simGoal = "multiple_compare_roomLevels"; 
       
        let comparison = new CombatSimulationComparison(baseParams, advancedSettings);
        let result = comparison.runAllSync(); 
        return result.then((results) => {
            expect(results.length).to.equal(20); 
        }); 
    });

    /*it("runParallel", function() {
        Logger.verbosity = 0;

        advancedSettings.numberSimulationsPerSetting = 1; 
        advancedSettings.simGoal = "multiple_compare_roomLevels"; 

        let comparison = new CombatSimulationComparison(baseParams, advancedSettings);
        let result = comparison.runParallel(); 
        return result.then((results) => {
            expect(results.length).to.equal(20); 
        }); 
    });*/

    // Disable for now since not used anyway
    /*it("runSync_shouldEqual_runParallel", async function() {
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
    });*/

});