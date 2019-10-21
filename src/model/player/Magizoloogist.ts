import { Wizard } from "./Wizard";
import focusCostData from "../../data/focusCosts.json";
import { Enemy } from "../env/enemies/Enemy";
import { WizardStats } from "./WizardStats";
import { statNameType } from '../../types';


export class Magizoologist extends Wizard {

    constructor(stats: WizardStats, playerIndex: number, knockoutTime: number) {
        super(stats, "magizoologist", playerIndex, knockoutTime);
    }

    isProficientAgainst(enemy: Enemy): boolean {
        switch (enemy.name) {
            case "darkWizard": return true;
            case "deathEater": return true;
            default: return false;
        }
    }

    getPowerAfterModifications(enemy: Enemy) {
        let powerBuffs = 0; 
        if (this.getTriggers().ministryMagizoologyOrientation !== null && this.getCurrentStaminaPercent() >= 0.5) {
            powerBuffs += this.getTriggers().ministryMagizoologyOrientation!; 
        }
        if (this.getTriggers().becomeTheBeast !== null && this.getFocus() >= 5) {
            powerBuffs += this.getTriggers().becomeTheBeast!; 
        }
        if (this.getTriggers().vileCreatures != null && enemy.name === "erkling") {
            powerBuffs += this.getTriggers().vileCreatures!; 
        }
        return super.getPowerAfterModifications(enemy) + powerBuffs;
    }

    getDefenceAfterModifications(enemy: Enemy) {
        let defenceBuffs = 0;
        if (this.getTriggers().forumQuorum !== null && this.getCurrentStaminaPercent() >= 0.5) {
            defenceBuffs += this.getTriggers().forumQuorum!; 
        }
        if (this.getTriggers().spiders !== null && enemy.name === "acromantula") {
            defenceBuffs += this.getTriggers().spiders!; 
        }
        if (this.getTriggers().birdInHand !== null && this.getFocus() >= 5) {
            defenceBuffs += this.getTriggers().birdInHand!; 
        }
        return super.getDefenceAfterModifications(enemy) + defenceBuffs; 
    }

    static isValidStatForClass(statName: statNameType): boolean {
        switch(statName) {
            // Auror
            case "weakeningHexValue": 
            case "confusionHexValue": 
            case "batBogeyHexDamage": 
            case "focusCharmValue": 

            // Professor
            case "deteriorationHexDamage": 
            case "defenceCharmIncrease": 
            case "proficiencyPowerCharmIncrease": return false; 
        }
        return true; 
    }
    
}