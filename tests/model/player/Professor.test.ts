
import { TestData } from "../../TestData";
import { expect } from "chai";
import { Professor } from "./Professor";
import { Enemy } from  "../../../src/model/env/enemies/Enemy";



describe("Professor", function() {

    let wizard: Professor; 
    let enemy: Enemy; 
    let enemy2: Enemy; 

    beforeEach(() => {
        wizard = TestData.buildDefaultProfessor();
        enemy = TestData.buildDefaultEnemy();
        enemy2 = TestData.buildDefaultEnemy(); 
    });

    it("standardPower", function() {
        expect(wizard.getPowerAfterModifications(enemy)).to.equal(wizard.stats.power);
    });
    it("idealExchange_triggered", function() {
        enemy.hasDeteriorationHex = true;

        wizard.setTrigger("idealExchange", 5);

        expect(wizard.getPowerAfterModifications(enemy)).to.equal(wizard.stats.power + 5);
        expect(wizard.getPowerAfterModifications(enemy2)).to.equal(wizard.stats.power); // Has no debuffs
    });

    it("restrictionSection_triggered", function() {
        enemy.hasDeteriorationHex = true; 

        wizard.setTrigger("restrictedSection", 0.06);

        expect(wizard.getDefenceAfterModifications(enemy)).to.equal(wizard.stats.defence + 0.06); 
        expect(wizard.getDefenceAfterModifications(enemy2)).to.equal(wizard.stats.defence); 
    });


    it("strengthInNumbers_triggered", function() {
        wizard.hasDefenceCharm = true;
        wizard.setTrigger("strengthInNumbers", 5);

        expect(wizard.getPowerAfterModifications(enemy)).to.equal(wizard.stats.power + 5);
        
        wizard.setTrigger("strengthInNumbers", null);
        expect(wizard.getPowerAfterModifications(enemy)).to.equal(wizard.stats.power);
    });
    
    it("sparringSpecifics_triggered", function() {

        enemy.hasDeteriorationHex = true;
        enemy.hasConfusionHex = true; 
        wizard.setTrigger("sparringSpecifics", 0.12);

        expect(wizard.getDefenceAfterModifications(enemy)).to.equal(wizard.stats.defence + 0.12);
        expect(wizard.getDefenceAfterModifications(enemy2)).to.equal(wizard.stats.defence);
        
    });
    it("teamworkMakesTheDreamWork_triggered", function() {

        wizard.hasBraveryCharm = true;
        enemy.applyExstimuloPotion(wizard, 1, 2.25); 
        wizard.setTrigger("teamworkMakesTheDreamWork", 12);

        expect(wizard.getPowerAfterModifications(enemy)).to.equal(wizard.stats.power + 12);
        
        wizard.setTrigger("teamworkMakesTheDreamWork", null);
        expect(wizard.getPowerAfterModifications(enemy)).to.equal(wizard.stats.power); 
    });
    it("confidence_triggered", function() {
        wizard.hasBraveryCharm = true;
        wizard.setTrigger("confidence", 0.06);

        expect(wizard.getDefenceAfterModifications(enemy)).to.equal(wizard.stats.defence + 0.06);

        wizard.setTrigger("confidence", null);
        expect(wizard.getDefenceAfterModifications(enemy)).to.equal(wizard.stats.defence);

    });
    it("teamTeaching_triggered", function() {
        wizard.hasBraveryCharm = true;
        wizard.hasDefenceCharm = true; 
        wizard.setTrigger("teamTeaching", 0.12);

        expect(wizard.getDefenceAfterModifications(enemy)).to.equal(wizard.stats.defence + 0.12);

        wizard.setTrigger("teamTeaching", null);
        expect(wizard.getDefenceAfterModifications(enemy)).to.equal(wizard.stats.defence);

    });
    it("onSabbatical_triggered", function() {
        enemy.hasConfusionHex = true;
        enemy.hasDeteriorationHex = true;
        enemy.hasWeakeningHex = true; 
        wizard.setTrigger("onSabbatical", 12);

        expect(wizard.getPowerAfterModifications(enemy)).to.equal(wizard.stats.power + 12);

        wizard.setTrigger("onSabbatical", null);

        expect(wizard.getPowerAfterModifications(enemy)).to.equal(wizard.stats.power);
    });
    it("peskyPixies_triggered", function() {
        let enemyPixie = TestData.buildDefaultPixie();
        let enemyWerewolf = TestData.buildDefaultWerewolf();

        wizard.setTrigger("peskyPixies", 0.3);

        expect(wizard.getAccuracyAfterModifications(enemyPixie)).to.equal(wizard.stats.accuracy + 0.3);
        expect(wizard.getAccuracyAfterModifications(enemyWerewolf)).to.equal(wizard.stats.accuracy);
    });
    it("fullMoonHunter_triggered", function() {
        let enemy = TestData.buildDefaultWerewolf();
        let enemy2 = TestData.buildDefaultPixie();

        wizard.setTrigger("fullMoonHunter", 0.3);

        expect(wizard.getDefenceBreachAfterModifications(enemy)).to.equal(wizard.stats.defenceBreach + 0.3);
        expect(wizard.getDefenceBreachAfterModifications(enemy2)).to.equal(wizard.stats.defenceBreach);
    });


    it("proficiency", function() {
        let erkling = Enemy.buildEnemy("erkling", 0, false, 1, 1, 1); 
        let acromantula = Enemy.buildEnemy("acromantula", 0, false, 1, 1, 1); 
        let darkWizard = Enemy.buildEnemy("darkWizard", 0, false, 1, 1, 1); 
        let deathEater = Enemy.buildEnemy("deathEater", 0, false, 1, 1, 1); 
        let pixie = Enemy.buildEnemy("pixie", 0, false, 1, 1, 1); 
        let werewolf = Enemy.buildEnemy("werewolf", 0, false, 1, 1, 1); 
        
        expect(wizard.isProficientAgainst(erkling)).to.be.false; 
        expect(wizard.isProficientAgainst(acromantula)).to.be.false; 
        expect(wizard.isProficientAgainst(darkWizard)).to.be.false; 
        expect(wizard.isProficientAgainst(deathEater)).to.be.false; 
        expect(wizard.isProficientAgainst(pixie)).to.be.true; 
        expect(wizard.isProficientAgainst(werewolf)).to.be.true; 
    });

});