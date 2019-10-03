
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
        expect(stats.defence).to.equal(0.50); // "confidence" is not taken into account in gamepress page 
        expect(stats.defenceBreach).to.be.closeTo(0.15, deltaComparison);  

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

    });


});