
import { TestData } from "../../TestData";
import { expect } from "chai";
import { Enemy } from  "../../../src/model/env/enemies/Enemy";
import { Magizoologist } from "./Magizoologist";


describe("Magizoologist", function() {

    let wizard: Magizoologist; 
    let enemy: Enemy; 
    let enemy2: Enemy; 

    beforeEach(() => {
        wizard = TestData.buildDefaultMagizoologist();
        enemy = TestData.buildDefaultEnemy();
        enemy2 = TestData.buildDefaultEnemy(); 
    });

    it("ministryMagizoologyOrientation", function() {
        wizard.setTrigger("ministryMagizoologyOrientation", 10); 

        expect(wizard.getPowerAfterModifications(enemy)).to.be.equal(wizard.stats.power + 10); 
        
        wizard.removeStamina(wizard.getCurrentStamina()-1); 
        expect(wizard.getPowerAfterModifications(enemy)).to.be.equal(wizard.stats.power); 
    }); 
    it("forumQuorum", function() {
        wizard.setTrigger("forumQuorum", 0.06); 

        expect(wizard.getDefenceAfterModifications(enemy)).to.be.equal(wizard.stats.defence + 0.06); 
        
        wizard.removeStamina(wizard.getCurrentStamina()-1); 
        expect(wizard.getDefenceAfterModifications(enemy)).to.be.equal(wizard.stats.defence); 
    });
    it("becomeTheBeast", function() {
        wizard.setTrigger("becomeTheBeast", 40); 
        wizard.setFocus(5); 

        expect(wizard.getPowerAfterModifications(enemy)).to.be.equal(wizard.stats.power + 40); 
        
        wizard.removeFocus(1); 
        expect(wizard.getPowerAfterModifications(enemy)).to.be.equal(wizard.stats.power); 
    }); 
    it("spiders", function() {
        let enemySpider = Enemy.buildEnemy("acromantula", 0, false, 1, 1, 1); 
        let enemyPixie = TestData.buildDefaultPixie();
        wizard.setTrigger("spiders", 0.2); 

        expect(wizard.getDefenceAfterModifications(enemySpider)).to.be.equal(wizard.stats.defence + 0.2); 
        expect(wizard.getDefenceAfterModifications(enemyPixie)).to.be.equal(wizard.stats.defence); 
    }); 
    it("birdInHand", function() {
        wizard.setTrigger("birdInHand", 0.15); 
        wizard.setFocus(5); 

        expect(wizard.getDefenceAfterModifications(enemy)).to.be.equal(wizard.stats.defence + 0.15); 
        
        wizard.removeFocus(1); 
        expect(wizard.getDefenceAfterModifications(enemy)).to.be.equal(wizard.stats.defence); 
    });
    it("vileCreatures", function() {
        let enemyErkling = Enemy.buildEnemy("erkling", 0, false, 1, 1, 1); 
        let enemyPixie = TestData.buildDefaultPixie();
        wizard.setTrigger("vileCreatures", 25); 

        expect(wizard.getPowerAfterModifications(enemyErkling)).to.be.equal(wizard.stats.power + 25); 
        
        wizard.removeFocus(1); 
        expect(wizard.getPowerAfterModifications(enemyPixie)).to.be.equal(wizard.stats.power); 
    });

}); 