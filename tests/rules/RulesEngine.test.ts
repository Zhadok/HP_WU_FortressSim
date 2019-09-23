import { RulesEngine } from "../../src/rules/RulesEngine";
import { TestData } from "../TestData";
import { expect } from "chai";
import * as chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { fail } from "assert";

// https://github.com/domenic/chai-as-promised/issues/192
before(() => {
    chai.should();
    chai.use(chaiAsPromised);
});

describe("RulesEngine", function() {

    it("professor_notEnoughFocusDefenceCharm", function()  {
        let wizard = TestData.buildDefaultProfessor();
        let enemy = TestData.buildDefaultEnemy();
        wizard.setTrigger("defenceCharm", 1);
        let rulesEngine = new RulesEngine(wizard.nameClass);

        wizard.inCombat = false; 
        wizard.removeFocus(wizard.getFocus());

        let facts = {
            wizard: wizard,
            highestPriorityEnemyTarget: enemy
        };

        return rulesEngine.engine.run(facts).then(results => {
            expect(results.length).to.equal(0);
        });
    });
    it("professor_castDefenceCharm", function()  {
        let wizard = TestData.buildDefaultProfessor();
        let enemy = TestData.buildDefaultEnemy();
        wizard.setTrigger("defenceCharm", 1);
        let rulesEngine = new RulesEngine(wizard.nameClass);

        wizard.inCombat = false; 
        wizard.addFocus(3);

        let facts = {
            wizard: wizard,
            highestPriorityEnemyTarget: enemy
        };

        return rulesEngine.engine.run(facts).then(results => {
            expect(results[0].type).to.equal("defenceCharm");
        });
        
        //expect(resultPromise).to.eventually.equal("asd").notify(done);

    });

});