
import { TestData } from "../../TestData";
import { expect } from "chai";
import { Auror } from "../../../src/model/player/Auror";
import { Enemy } from "../../../src/model/env/enemies/Enemy";



describe("Auror", function() {

    let wizard: Auror;
    let enemy: Enemy;
    beforeEach(() => {
        wizard = TestData.buildDefaultAuror();
        enemy = TestData.buildDefaultEnemy();
    });

    it("standardPower", function() {
        expect(wizard.getPowerAfterModifications(enemy)).to.equal(wizard.stats.power);
    });

    it("aurorAdvantage_notTriggered", function() {
        wizard.setTrigger("aurorAdvantage", 10);
        expect(wizard.getPowerAfterModifications(enemy)).to.equal(wizard.stats.power);
    });
    it("aurorAdvantage_triggered", function() {
        enemy.removeStamina(enemy.getMaxStamina()-1);

        wizard.setTrigger("aurorAdvantage", 10);
        expect(wizard.getPowerAfterModifications(enemy)).to.equal(wizard.stats.power + 10);
    });

    it("dancingWithDummies_notTriggered", function() { // Precision vs foes with 100% stamina
        enemy.removeStamina(1);
        wizard.setTrigger("dancingWithDummies", 0.35);
        expect(wizard.getCritChanceAfterModifications(enemy)).to.equal(wizard.stats.critChance);
    });
    it("dancingWithDummies_triggered", function() {
        wizard.setTrigger("dancingWithDummies", 0.35);
        expect(wizard.getCritChanceAfterModifications(enemy)).to.equal(wizard.stats.critChance + 0.35);
    });

    it("playingDirty_triggered", function() {
        wizard.setTrigger("playingDirty", 0.1); 
        enemy.removeStamina(enemy.getMaxStamina() * 0.55); 
        expect(wizard.getDefenceAfterModifications(enemy)).to.equal(wizard.stats.defence + 0.1);
    }); 
    it("playingDirty_notTriggered", function() {
        wizard.setTrigger("playingDirty", 0.1); 
        expect(wizard.getDefenceAfterModifications(enemy)).to.equal(wizard.stats.defence);
    }); 

    it("trickWithDeathEaters_triggered", function() { // Precision vs Death Eaters
        wizard.setTrigger("trickWithDeathEaters", 0.25); 
        let enemy = Enemy.buildEnemy("deathEater", 0, false, 1, 1, 1); 
        expect(wizard.getCritChanceAfterModifications(enemy)).to.equal(wizard.stats.critChance + 0.25); 
    });
    it("trickWithDeathEaters_notTriggered", function() {
        wizard.setTrigger("trickWithDeathEaters", 0.25); 
        let enemy = Enemy.buildEnemy("darkWizard", 0, false, 1, 1, 1); 
        expect(wizard.getCritChanceAfterModifications(enemy)).to.equal(wizard.stats.critChance); 
    });

    it("firstStrike_triggered", function() { // Critical Power vs Foes with 100% Stamina
        wizard.setTrigger("firstStrike", 0.5); 
        expect(wizard.getCriticalPowerAfterModifications(enemy)).to.equal(wizard.stats.criticalPower + 0.5); 
    }); 
    it("firstStrike_notTriggered", function() { // Critical Power vs Foes with 100% Stamina
        wizard.setTrigger("firstStrike", 0.5); 
        enemy.removeStamina(1); 
        expect(wizard.getCriticalPowerAfterModifications(enemy)).to.equal(wizard.stats.criticalPower); 
    }); 

    it("mundungusAmongUs_triggered", function() { // Protego Power vs Dark Wizards  
        wizard.setTrigger("mundungusAmongUs", 0.2); 
        let enemy = Enemy.buildEnemy("darkWizard", 0, false, 1, 1, 1); 
        expect(wizard.getProtegoPowerAfterModifications(enemy)).to.equal(wizard.stats.protegoPower + 0.2); 
    }); 
    it("mundungusAmongUs_notTriggered", function() { // Protego Power vs Dark Wizards  
        wizard.setTrigger("mundungusAmongUs", 0.2); 
        let enemy = Enemy.buildEnemy("deathEater", 0, false, 1, 1, 1); 
        expect(wizard.getProtegoPowerAfterModifications(enemy)).to.equal(wizard.stats.protegoPower); 
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
        expect(wizard.isProficientAgainst(darkWizard)).to.be.true; 
        expect(wizard.isProficientAgainst(deathEater)).to.be.true; 
        expect(wizard.isProficientAgainst(pixie)).to.be.false; 
        expect(wizard.isProficientAgainst(werewolf)).to.be.false; 
    });

});