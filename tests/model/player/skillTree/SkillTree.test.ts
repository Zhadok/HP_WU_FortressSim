
import { TestData } from "../../../TestData";
import { expect } from "chai";
import { SkillTree } from "../../../../src/model/player/SkillTree/SkillTree";
import { fail } from "assert";
import { WizardStats } from "../../../../src/model/player/WizardStats";
import { WizardFactory } from "../../../../src/model/player/WizardFactory";
import { Professor } from "../../../../src/model/player/Professor";



describe("SkillTree", function() {

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
    it("toWizardStats_fullyStudied", function() {

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
        let prof = WizardFactory.buildWizardWithSkillTree(skillTree, 0, 0) as Professor;

        expect(prof.getTriggers().defenceCharm).to.equal(0.16); // value of node (statChanged): 0.16
        expect(prof.hasStudiedDefenceCharm()).to.be.true; 
        expect(prof.stats.defenceCharmIncrease).to.equal(0.16);
    })

});