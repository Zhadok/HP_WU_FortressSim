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


    static isValidStatForClass(statName: statNameType): boolean {
        switch(statName) {
            case "weakeningHexValue": 
            case "confusionHexValue": 
            case "batBogeyHexDamage": 
            case "focusCharmValue": 
            case "deteriorationHexDamage": 
            case "mendingCharmStaminaRestore": 
            case "defenceCharmIncrease": 
            case "proficiencyPowerCharmIncrease": return false; 
        }
        return true; 
    }
    
}