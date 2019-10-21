
import { TestData } from "../../../TestData";
import { expect } from "chai";
import { SkillTree } from "../../../../src/model/player/SkillTree/SkillTree";
import { fail } from "assert";
import { WizardStats } from "../../../../src/model/player/WizardStats";
import { WizardFactory } from "../../../../src/model/player/WizardFactory";
import { Professor } from "../../../../src/model/player/Professor";



describe("SkillTree", function() {

    it("shouldInitialize_auror", function() {
        let skillTree = new SkillTree("auror");

        //expect(skillTree.nodesStudied.size).to.equal(55);
        //expect(skillTree.getNumberOfLessons()).to.equal(134);
    });
    it("shouldInitialize_professor", function() {
        let skillTree = new SkillTree("professor");

        expect(skillTree.nodesStudied.size).to.equal(55);
        expect(skillTree.getNumberOfLessons()).to.equal(134);
    });


    it("setStudiedLevels_invalidNodeID", function() {
        let skillTree = new SkillTree("professor");
        try {
            skillTree.setStudiedLevels([{
                rowIndex: 0, columnIndex: 0, levelStudied: 1
            }]);
            fail("Should have failed after setting invalid node ID");
        }
        catch (e) {}

    });
    it("setStudiedLevels_invalidLevel", function() {
        let skillTree = new SkillTree("professor");
        try {
            skillTree.setStudiedLevels([{
                rowIndex: 0, columnIndex: 2, levelStudied: 2
            }]);
            fail("Should have failed after setting invalid node studied level");
        }
        catch (e) {}

    });
    it("toWizardStats_noStudiedLessons", function() {
        let skillTree = new SkillTree("professor");
        let stats = skillTree.toWizardStats();

        expect(stats).to.deep.equal(WizardStats.buildBaseStats());
    });
    it("toWizardStats_withStudiedLesson", function() {
        let skillTree = new SkillTree("professor");
        skillTree.setStudiedLevels([{
            rowIndex: 1, columnIndex: 1, levelStudied: 2
        }]);
        let stats = skillTree.toWizardStats();

        expect(stats.stamina).to.equal(WizardStats.buildBaseStats().stamina + 15);
    });
    it("toWizardStats_withStudiedTrigger", function() {
        let skillTree = new SkillTree("professor");
        skillTree.setNodeLevelByTriggerName("teamworkMakesTheDreamWork", 1);
        let stats = skillTree.toWizardStats();

        expect(stats.stamina).to.equal(WizardStats.buildBaseStats().stamina);
    });

    it("applyTriggers", function() {
        let wizard = TestData.buildDefaultProfessor();
        wizard.setTrigger("defenceCharm", null); 
        
        let skillTree = new SkillTree("professor");
        skillTree.setNodeLevelByTriggerName("defenceCharm", 1); // studied level: 1
        skillTree.applyTriggers(wizard);

        expect(wizard.getTriggers().defenceCharm).to.equal(0.16); // value of node (statChanged): 0.16
        expect(wizard.hasStudiedDefenceCharm()).to.be.true; 
    }); 
    it("applyTriggers_strategicSpell", function() {
        let skillTree = new SkillTree("professor");
        skillTree.setNodeLevelByTriggerName("defenceCharm", 1); // studied level: 1
        let prof = WizardFactory.buildWizardWithSkillTree(skillTree, 0, 0, TestData.buildDefaultPotionParameters()) as Professor;

        expect(prof.getTriggers().defenceCharm).to.equal(0.16); // value of node (statChanged): 0.16
        expect(prof.hasStudiedDefenceCharm()).to.be.true; 
        expect(prof.stats.defenceCharmIncrease).to.equal(0.16);
    });

    it("learnAllLessons_professor", function() {
        let skillTree = new SkillTree("professor");
        skillTree.learnAllLessons(); 
        let costs = skillTree.getCosts(); 
        expect(costs.costScrolls).to.equal(2325); 
        expect(costs.costRedBooks).to.equal(320); 
        expect(costs.costRSB).to.equal(223); 

        let deltaComparison = 1e-6; 
        let stats = skillTree.toWizardStats(); 
        expect(stats.protegoPower).to.be.closeTo(0.45, deltaComparison); 
        expect(stats.critChance).to.be.closeTo(0.23, deltaComparison);
        expect(stats.maxFocus).to.equal(15); 
        expect(stats.proficiencyPower).to.equal(1.50); 
        expect(stats.accuracy).to.be.closeTo(0.32, deltaComparison); 
        expect(stats.deficiencyDefence).to.equal(0.5); 
        expect(stats.power).to.equal(79); 
        expect(stats.stamina).to.equal(397); 
        expect(stats.criticalPower).to.be.closeTo(1.11, deltaComparison); 
        expect(stats.initialFocus).to.equal(4); 
        expect(stats.defence).to.be.closeTo(0.44, deltaComparison); 
        expect(stats.defenceBreach).to.be.closeTo(0.15, deltaComparison);  

        expect(stats.defenceCharmIncrease).to.be.closeTo(0.3, deltaComparison); 
        expect(stats.mendingCharmStaminaRestore).to.equal(4);
        expect(stats.deteriorationHexDamage).to.equal(40); 
        expect(stats.proficiencyPowerCharmIncrease).to.be.closeTo(0.44, deltaComparison); 
    });
    it("learnAllLessonsWithScrolls_professor", function() {
        let skillTree = new SkillTree("professor");
        skillTree.learnAllLessonsWithScrolls(); 
        let costs = skillTree.getCosts(); 
        expect(costs.costScrolls).to.equal(1073); 
        expect(costs.costRedBooks).to.be.equal(0);  
        expect(costs.costRSB).to.be.equal(0); 
    });
    it("resetSkillTree", function() {
        let skillTree = new SkillTree("professor");
        skillTree.learnAllLessons(); 
        skillTree.resetSkillTree(); 

        let costs = skillTree.getCosts(); 
        expect(costs.costScrolls).to.equal(0); 
        expect(costs.costRedBooks).to.be.equal(0);  
        expect(costs.costRSB).to.be.equal(0); 
        
        expect(skillTree.toWizardStats()).to.deep.equal(WizardStats.buildBaseStats()); 
    }); 

    it("learnAllLessons_auror", function() { // https://wizardsunite.gamepress.gg/reference/auror-skill-tree
        let skillTree = new SkillTree("auror");
        skillTree.learnAllLessons(); 
        let costs = skillTree.getCosts(); 
        expect(costs.costScrolls).to.equal(2352); 
        expect(costs.costRedBooks).to.equal(430); 
        expect(costs.costRSB).to.equal(115); 

        let deltaComparison = 1e-6; 
        let stats = skillTree.toWizardStats(); 
        expect(stats.protegoPower).to.be.closeTo(0.35, deltaComparison); 
        expect(stats.critChance).to.be.closeTo(0.35, deltaComparison);
        expect(stats.maxFocus).to.equal(10); 
        expect(stats.proficiencyPower).to.equal(1.48); 
        expect(stats.accuracy).to.be.closeTo(0.15, deltaComparison); 
        expect(stats.deficiencyDefence).to.equal(0.5); 
        expect(stats.power).to.equal(100); 
        expect(stats.stamina).to.equal(296); 
        expect(stats.criticalPower).to.equal(1.2); 
        expect(stats.initialFocus).to.equal(4); 
        expect(stats.defence).to.equal(0.39); 
        expect(stats.defenceBreach).to.equal(0.32);  

        expect(stats.batBogeyHexDamage).to.equal(2);
        expect(stats.weakeningHexValue).to.equal(0.5); 
        expect(stats.confusionHexValue).to.be.closeTo(0.6, deltaComparison);
        expect(stats.focusCharmValue).to.equal(1); 
    });


    it("learnAllLessons_magizoologist", function() {
        let skillTree = new SkillTree("magizoologist");
        skillTree.learnAllLessons(); 
        let costs = skillTree.getCosts(); 
        expect(costs.costScrolls).to.equal(2495); 
        expect(costs.costRedBooks).to.equal(465); 
        expect(costs.costRSB).to.equal(115); 

        let deltaComparison = 1e-6; 
        let stats = skillTree.toWizardStats(); 
        expect(stats.protegoPower).to.be.closeTo(0.49, deltaComparison); 
        expect(stats.critChance).to.be.closeTo(0.20, deltaComparison);
        expect(stats.maxFocus).to.equal(12); 
        expect(stats.proficiencyPower).to.equal(1.48); 
        expect(stats.accuracy).to.be.closeTo(0.20, deltaComparison); 
        expect(stats.deficiencyDefence).to.be.closeTo(0.60, deltaComparison); 
        expect(stats.power).to.equal(59); 
        expect(stats.stamina).to.equal(525); 
        expect(stats.criticalPower).to.equal(0.98); 
        expect(stats.initialFocus).to.equal(5); 
        expect(stats.defence).to.equal(0.50); 
        expect(stats.defenceBreach).to.be.closeTo(0.22, deltaComparison);  

        expect(stats.mendingCharmStaminaRestore).to.equal(4); 
        expect(stats.reviveCharmValue).to.equal(1); 
        expect(stats.braveryCharmValue).to.equal(1.5); 
        expect(stats.staminaCharmValue).to.be.closeTo(0.3, deltaComparison); 
    }); 

    it("skillTree_nextPossibleLessons_shouldBeAll", function() {
        let skillTree = new SkillTree("professor");
        let nextPossibleLessons = skillTree.getNextPossibleLessons(); 
        expect(nextPossibleLessons.size).to.equal(55); 
        nextPossibleLessons.forEach((level, node) => {
            expect(level).to.equal(1); 
        });
    });

    it("skillTree_nextPossibleLessons_shouldBeSome", function() {
        let skillTree = new SkillTree("professor");
        skillTree.setNodeLevelByTriggerName("idealExchange", 1); 
        expect(skillTree.getNextPossibleLessons().size).to.equal(55 - 1); 

        let nodeName = "N.E.W.T.S Preparation"; 
        skillTree.setNodeLevelByName(nodeName, 1) // has 2 levels
        expect(skillTree.getNextPossibleLessons().size).to.equal(55 - 1); 
        expect(skillTree.getNextPossibleLessons().get(skillTree.getNodeByName(nodeName))).to.equal(2); // studied level is 1. next possible level would be 2

        skillTree.setNodeLevelByName(nodeName, 2) // has 2 levels
        expect(skillTree.getNextPossibleLessons().size).to.equal(55 - 2); 
    }); 

    it("skillTree_nextPossibleLessons_shouldBeEmpty", function() {
        let skillTree = new SkillTree("auror");
        skillTree.learnAllLessons(); 
        let nextPossibleLessons = skillTree.getNextPossibleLessons(); 
        expect(nextPossibleLessons.size).to.be.equal(0); 
    });

    it("skillTree_nextPossibleLessons_filterOnlyScrolls", function() {
        let skillTree = new SkillTree("professor");
        let nextLessons = skillTree.getNextPossibleLessons("onlyScrolls"); 

        nextLessons.forEach((level, node) => {
            // How much did studying the previous node cost?
            let costs = node.levels[level-1]; 
            expect(costs.costRedBooks === null || costs.costRedBooks === 0 || costs.costRedBooks === undefined).to.be.true; 
            expect(costs.costRSB === null || costs.costRSB === 0 || costs.costRSB === undefined).to.be.true; 
        })
    });

    it("skillTree_nextPossibleLessons_filterOnlyScrollsAndRed", function() {
        let skillTree = new SkillTree("professor");
        let nextLessons = skillTree.getNextPossibleLessons("onlyScrollsAndRed"); 

        nextLessons.forEach((level, node) => {
            // How much did studying the previous node cost?
            let costs = node.levels[level-1]; 
            console.log(node); 
            expect(costs.costRedBooks).to.be.greaterThan(0);  
            expect(costs.costRSB === null || costs.costRSB === 0 || costs.costRSB === undefined).to.be.true; 
        })
    });

    it("skillTree_nextPossibleLessons_filterOnlyScrollsAndRSB", function() {
        let skillTree = new SkillTree("professor");
        let nextLessons = skillTree.getNextPossibleLessons("onlyScrollsAndRSB"); 

        nextLessons.forEach((level, node) => {
            // How much did studying the previous node cost?
            let costs = node.levels[level-1]; 
            expect(costs.costRedBooks === null || costs.costRedBooks === 0 || costs.costRedBooks === undefined).to.be.true; 
            expect(costs.costRSB).to.be.greaterThan(0);  
        })
    });

});