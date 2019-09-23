import { Wizard } from "./Wizard";
import focusCostData from "../../data/focusCosts.json";
import { Enemy } from "../env/enemies/Enemy";
import { WizardStats } from "./WizardStats";


export class Auror extends Wizard {


    constructor(stats: WizardStats, playerIndex: number, knockoutTime: number) {
        super(stats, "auror", playerIndex, knockoutTime);
    }


    isProficientAgainst(enemy: Enemy): boolean {
        switch (enemy.name) {
            case "darkWizard": return true;
            case "deathEater": return true;
            default: return false;
        }
    }

    hasStudiedWeakeningHex(): boolean {
        return this.getTriggers().weakeningHex !== null;
    }
    hasStudiedBatBogeyHex(): boolean {
        return this.getTriggers().batBogeyHex !== null;
    }
    hasStudiedConfusionHex(): boolean {
        return this.getTriggers().confusionHex !== null;
    }
    hasStudiedFocusCharm(): boolean {
        return this.getTriggers().focusCharm !== null;
    }

    getPowerAfterModifications(enemy: Enemy): number {
        let powerBuffs = 0;
        if (this.getTriggers().aurorAdvantage !== null && enemy.getCurrentStaminaPercent() < 0.5) {
            powerBuffs += this.getTriggers().aurorAdvantage!;
        }
        return super.getPowerAfterModifications(enemy) + powerBuffs;
    }


}