export abstract class CombatantStats {

    stamina: number;

    defence: number;
    deficiencyDefence: number;

    power: number;
    proficiencyPower: number;
    defenceBreach: number;

    constructor(stamina: number,
        defence: number,
        deficiencyDefence: number,
        power: number,
        proficiencyPower: number,
        defenceBreach: number) {

        this.stamina = stamina;
        this.defence = defence;
        this.deficiencyDefence = deficiencyDefence;
        this.power = power;
        this.proficiencyPower = proficiencyPower;
        this.defenceBreach = defenceBreach;

    }

}