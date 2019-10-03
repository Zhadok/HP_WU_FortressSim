
import { TestData } from "../../TestData";
import { expect } from "chai";
import { Auror } from "../../../src/model/player/Auror";
import { Enemy } from "../../../src/model/env/enemies/Enemy";



describe("Auror", function() {

    let auror: Auror;
    let enemy: Enemy;
    beforeEach(() => {
        auror = TestData.buildDefaultAuror();
        enemy = TestData.buildDefaultEnemy();
    });

    it("standardPower", function() {
        expect(auror.getPowerAfterModifications(enemy)).to.equal(auror.stats.power);
    });

    it("aurorAdvantage_notTriggered", function() {
        auror.setTrigger("aurorAdvantage", 10);
        expect(auror.getPowerAfterModifications(enemy)).to.equal(auror.stats.power);
    });
    it("aurorAdvantage_triggered", function() {
        enemy.removeStamina(enemy.getMaxStamina()-1);

        auror.setTrigger("aurorAdvantage", 10);
        expect(auror.getPowerAfterModifications(enemy)).to.equal(auror.stats.power + 10);
    });

    it("dancingWithDummies_notTriggered", function() { // Precision vs foes with 100% stamina
        enemy.removeStamina(1);
        auror.setTrigger("dancingWithDummies", 0.35);
        expect(auror.getCritChanceAfterModifications(enemy)).to.equal(auror.stats.critChance);
    });
    it("dancingWithDummies_triggered", function() {
        auror.setTrigger("dancingWithDummies", 0.35);
        expect(auror.getCritChanceAfterModifications(enemy)).to.equal(auror.stats.critChance + 0.35);
    });

    it("playingDirty_triggered", function() {
        auror.setTrigger("playingDirty", 0.1); 
        enemy.removeStamina(enemy.getMaxStamina() * 0.55); 
        expect(auror.getDefenceAfterModifications(enemy)).to.equal(auror.stats.defence + 0.1);
    }); 
    it("playingDirty_notTriggered", function() {
        auror.setTrigger("playingDirty", 0.1); 
        expect(auror.getDefenceAfterModifications(enemy)).to.equal(auror.stats.defence);
    }); 

    it("trickWithDeathEaters_triggered", function() { // Precision vs Death Eaters
        auror.setTrigger("trickWithDeathEaters", 0.25); 
        let enemy = Enemy.buildEnemy("deathEater", 0, false, 1, 1, 1); 
        expect(auror.getCritChanceAfterModifications(enemy)).to.equal(auror.stats.critChance + 0.25); 
    });
    it("trickWithDeathEaters_notTriggered", function() {
        auror.setTrigger("trickWithDeathEaters", 0.25); 
        let enemy = Enemy.buildEnemy("darkWizard", 0, false, 1, 1, 1); 
        expect(auror.getCritChanceAfterModifications(enemy)).to.equal(auror.stats.critChance); 
    });

    it("firstStrike_triggered", function() { // Critical Power vs Foes with 100% Stamina
        auror.setTrigger("firstStrike", 0.5); 
        expect(auror.getCriticalPowerAfterModifications(enemy)).to.equal(auror.stats.criticalPower + 0.5); 
    }); 
    it("firstStrike_notTriggered", function() { // Critical Power vs Foes with 100% Stamina
        auror.setTrigger("firstStrike", 0.5); 
        enemy.removeStamina(1); 
        expect(auror.getCriticalPowerAfterModifications(enemy)).to.equal(auror.stats.criticalPower); 
    }); 

    it("mundungusAmongUs_triggered", function() { // Protego Power vs Dark Wizards  
        auror.setTrigger("mundungusAmongUs", 0.2); 
        let enemy = Enemy.buildEnemy("darkWizard", 0, false, 1, 1, 1); 
        expect(auror.getProtegoPowerAfterModifications(enemy)).to.equal(auror.stats.protegoPower + 0.2); 
    }); 
    it("mundungusAmongUs_notTriggered", function() { // Protego Power vs Dark Wizards  
        auror.setTrigger("mundungusAmongUs", 0.2); 
        let enemy = Enemy.buildEnemy("deathEater", 0, false, 1, 1, 1); 
        expect(auror.getProtegoPowerAfterModifications(enemy)).to.equal(auror.stats.protegoPower); 
    }); 

});