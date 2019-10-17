
import { TestData } from "../../TestData";
import { expect } from "chai";
import { Professor } from "./Professor";
import { Enemy } from "../env/enemies/Enemy";



describe("Professor", function() {

    let professor: Professor; 
    let enemy: Enemy; 
    let enemy2: Enemy; 

    beforeEach(() => {
        professor = TestData.buildDefaultProfessor();
        enemy = TestData.buildDefaultEnemy();
        enemy2 = TestData.buildDefaultEnemy(); 
    });

    it("standardPower", function() {
        expect(professor.getPowerAfterModifications(enemy)).to.equal(professor.stats.power);
    });
    it("idealExchange_triggered", function() {
        enemy.hasDeteriorationHex = true;

        professor.setTrigger("idealExchange", 5);

        expect(professor.getPowerAfterModifications(enemy)).to.equal(professor.stats.power + 5);
        expect(professor.getPowerAfterModifications(enemy2)).to.equal(professor.stats.power); // Has no debuffs
    });

    it("restrictionSection_triggered", function() {
        enemy.hasDeteriorationHex = true; 

        professor.setTrigger("restrictedSection", 0.06);

        expect(professor.getDefenceAfterModifications(enemy)).to.equal(professor.stats.defence + 0.06); 
        expect(professor.getDefenceAfterModifications(enemy2)).to.equal(professor.stats.defence); 
    });


    it("strengthInNumbers_triggered", function() {
        professor.hasDefenceCharm = true;
        professor.setTrigger("strengthInNumbers", 5);

        expect(professor.getPowerAfterModifications(enemy)).to.equal(professor.stats.power + 5);
        
        professor.setTrigger("strengthInNumbers", null);
        expect(professor.getPowerAfterModifications(enemy)).to.equal(professor.stats.power);
    });
    
    it("sparringSpecifics_triggered", function() {

        enemy.hasDeteriorationHex = true;
        enemy.hasConfusionHex = true; 
        professor.setTrigger("sparringSpecifics", 0.12);

        expect(professor.getDefenceAfterModifications(enemy)).to.equal(professor.stats.defence + 0.12);
        expect(professor.getDefenceAfterModifications(enemy2)).to.equal(professor.stats.defence);
        
    });
    it("teamworkMakesTheDreamWork_triggered", function() {

        professor.hasBraveryCharm = true;
        enemy.applyExstimuloPotion(professor, 1, 2.25); 
        professor.setTrigger("teamworkMakesTheDreamWork", 12);

        expect(professor.getPowerAfterModifications(enemy)).to.equal(professor.stats.power + 12);
        
        professor.setTrigger("teamworkMakesTheDreamWork", null);
        expect(professor.getPowerAfterModifications(enemy)).to.equal(professor.stats.power); 
    });
    it("confidence_triggered", function() {
        professor.hasBraveryCharm = true;
        professor.setTrigger("confidence", 0.06);

        expect(professor.getDefenceAfterModifications(enemy)).to.equal(professor.stats.defence + 0.06);

        professor.setTrigger("confidence", null);
        expect(professor.getDefenceAfterModifications(enemy)).to.equal(professor.stats.defence);

    });
    it("teamTeaching_triggered", function() {
        professor.hasBraveryCharm = true;
        professor.hasDefenceCharm = true; 
        professor.setTrigger("teamTeaching", 0.12);

        expect(professor.getDefenceAfterModifications(enemy)).to.equal(professor.stats.defence + 0.12);

        professor.setTrigger("teamTeaching", null);
        expect(professor.getDefenceAfterModifications(enemy)).to.equal(professor.stats.defence);

    });
    it("onSabbatical_triggered", function() {
        enemy.hasConfusionHex = true;
        enemy.hasDeteriorationHex = true;
        enemy.hasWeakeningHex = true; 
        professor.setTrigger("onSabbatical", 12);

        expect(professor.getPowerAfterModifications(enemy)).to.equal(professor.stats.power + 12);

        professor.setTrigger("onSabbatical", null);

        expect(professor.getPowerAfterModifications(enemy)).to.equal(professor.stats.power);
    });
    it("peskyPixies_triggered", function() {
        let enemyPixie = TestData.buildDefaultPixie();
        let enemyWerewolf = TestData.buildDefaultWerewolf();

        professor.setTrigger("peskyPixies", 0.3);

        expect(professor.getAccuracyAfterModifications(enemyPixie)).to.equal(professor.stats.accuracy + 0.3);
        expect(professor.getAccuracyAfterModifications(enemyWerewolf)).to.equal(professor.stats.accuracy);
    });
    it("fullMoonHunter_triggered", function() {
        let enemy = TestData.buildDefaultWerewolf();
        let enemy2 = TestData.buildDefaultPixie();

        professor.setTrigger("fullMoonHunter", 0.3);

        expect(professor.getDefenceBreachAfterModifications(enemy)).to.equal(professor.stats.defenceBreach + 0.3);
        expect(professor.getDefenceBreachAfterModifications(enemy2)).to.equal(professor.stats.defenceBreach);
    });




});