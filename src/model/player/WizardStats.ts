import { CombatantStats } from "../CombatantStats";
import wizardBaseStats from "../../data/wizardBaseStats.json";

export class WizardStats extends CombatantStats {

    // Generic
    protegoPower: number;
    initialFocus: number;
    maxFocus: number;
    critChance: number; 
    criticalPower: number;
    accuracy: number; 

    // Auror
    weakeningHexValue: number = 0; // (positive value here, will be subtracted later)
    confusionHexValue: number = 0;
    batBogeyHexDamage: number = 0;

    // Professor
    deteriorationHexDamage: number = 0; 
    mendingCharmStaminaRestore: number = 0; 
    defenceCharmIncrease: number = 0; 
    proficiencyPowerCharmIncrease: number = 0; 

    constructor(stamina: number, 
        defence: number, 
        deficiencyDefence: number, 
        power: number, 
        proficiencyPower: number,
        defenceBreach: number,
        protegoPower: number,
        initialFocus: number,
        maxFocus: number,
        critChance: number, 
        criticalPower: number,
        accuracy: number
        ) {
        super(stamina, defence, deficiencyDefence, power, proficiencyPower, defenceBreach);
        this.protegoPower = protegoPower;
        this.initialFocus = initialFocus;
        this.maxFocus = maxFocus;
        this.critChance = critChance;
        this.criticalPower = criticalPower;
        this.accuracy = accuracy; 
    }

    // https://wizardsunite.gamepress.gg/reference/professor-skill-tree
    static buildBaseStats(): WizardStats {
        return Object.assign({}, wizardBaseStats.data);
    }

}