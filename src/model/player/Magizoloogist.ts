import { Wizard } from "./Wizard";
import focusCostData from "../../data/focusCosts.json";
import { Enemy } from "../env/enemies/Enemy";
import { WizardStats } from "./WizardStats";


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

}