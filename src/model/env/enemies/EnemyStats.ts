import { CombatantStats } from "../../CombatantStats";

export class EnemyStats extends CombatantStats {

    dodge: number;

    constructor(stamina: number, 
        defence: number, 
        deficiencyDefence: number, 
        power: number, 
        proficiencyPower: number,
        defenceBreach: number, 
        dodge: number) {
        super(stamina, defence, deficiencyDefence, power, proficiencyPower, defenceBreach);
        this.dodge = dodge;
    }

}