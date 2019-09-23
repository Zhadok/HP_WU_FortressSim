
import { TestData } from "../../TestData";
import { expect } from "chai";



describe("Professor", function() {

    it("standardPower", function() {
        let professor = TestData.buildDefaultProfessor();
        let enemy = TestData.buildDefaultEnemy();

        expect(professor.getPowerAfterModifications(enemy)).to.equal(professor.stats.power);
    });
    it("idealExchange_triggered", function() {
        let professor = TestData.buildDefaultProfessor();
        let enemy = TestData.buildDefaultEnemy();

        professor.setTrigger("idealExchange", 5);
        enemy.hasDeteriorationHex = true;

        expect(professor.getPowerAfterModifications(enemy)).to.equal(professor.stats.power + 5);
    });
    it("idealExchange_triggered_noDebuffs", function() {
        let professor = TestData.buildDefaultProfessor();
        let enemy = TestData.buildDefaultEnemy();

        professor.setTrigger("idealExchange", 5);

        expect(professor.getPowerAfterModifications(enemy)).to.equal(professor.stats.power); // Has no debuffs
    });
    it("restrictionSection_triggered", function() {

    });
    it("strengthInNumbers_triggered", function() {
        let professor = TestData.buildDefaultProfessor();
        let enemy = TestData.buildDefaultEnemy();

        professor.hasDefenceCharm = true;
        professor.setTrigger("strengthInNumbers", 5);

        expect(professor.getPowerAfterModifications(enemy)).to.equal(professor.stats.power + 5);
    });
    it("sparringSpecifics_triggered", function() {
        let professor = TestData.buildDefaultProfessor();
        let enemy = TestData.buildDefaultEnemy();

        enemy.hasDeteriorationHex = true;
        enemy.hasConfusionHex = true; 
        professor.setTrigger("sparringSpecifics", 0.12);

        expect(professor.getDefenceAfterModifications(enemy)).to.equal(professor.stats.defence + 0.12);
    });
    it("teamworkMakesTheDreamWork_triggered", function() {
        let professor = TestData.buildDefaultProfessor();
        let enemy = TestData.buildDefaultEnemy();

        professor.hasBraveryCharm = true;
        professor.exstimuloPotionUsesRemaining = 2;
        professor.setTrigger("teamworkMakesTheDreamWork", 12);

        expect(professor.getPowerAfterModifications(enemy)).to.equal(professor.stats.power + 12);
    });
    it("confidence_triggered", function() {
        let professor = TestData.buildDefaultProfessor();
        let enemy = TestData.buildDefaultEnemy();

        professor.hasBraveryCharm = true;
        professor.setTrigger("confidence", 0.06);

        expect(professor.getDefenceAfterModifications(enemy)).to.equal(professor.stats.defence + 0.06);
    });
    it("teamTeaching_triggered", function() {
        let professor = TestData.buildDefaultProfessor();
        let enemy = TestData.buildDefaultEnemy();

        professor.hasBraveryCharm = true;
        professor.hasDefenceCharm = true; 
        professor.setTrigger("teamTeaching", 0.12);

        expect(professor.getDefenceAfterModifications(enemy)).to.equal(professor.stats.defence + 0.12);
    });
    it("onSabbatical_triggered", function() {
        let professor = TestData.buildDefaultProfessor();
        let enemy = TestData.buildDefaultEnemy();

        enemy.hasConfusionHex = true;
        enemy.hasDeteriorationHex = true;
        enemy.hasWeakeningHex = true; 
        professor.setTrigger("onSabbatical", 12);

        expect(professor.getPowerAfterModifications(enemy)).to.equal(professor.stats.power + 12);
    });
    it("peskyPixies_triggered", function() {
        let professor = TestData.buildDefaultProfessor();
        let enemyPixie = TestData.buildDefaultPixie();
        let enemyWerewolf = TestData.buildDefaultWerewolf();

        professor.setTrigger("peskyPixies", 0.3);

        expect(professor.getAccuracyAfterModifications(enemyPixie)).to.equal(professor.stats.accuracy + 0.3);
        expect(professor.getAccuracyAfterModifications(enemyWerewolf)).to.equal(professor.stats.accuracy);
    });
    it("fullMoonHunter_triggered", function() {
        let professor = TestData.buildDefaultProfessor();
        let enemy = TestData.buildDefaultWerewolf();
        let enemy2 = TestData.buildDefaultPixie();

        professor.setTrigger("fullMoonHunter", 0.3);

        expect(professor.getDefenceBreachAfterModifications(enemy)).to.equal(professor.stats.defenceBreach + 0.3);
        expect(professor.getDefenceBreachAfterModifications(enemy2)).to.equal(professor.stats.defenceBreach);
    });




});