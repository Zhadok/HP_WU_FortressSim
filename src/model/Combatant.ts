export abstract class Combatant {

    inCombat: boolean = false; // Is in combat? Enemies in combat cannot be entered into combat with by other players
    protected isDefeated: boolean = false; // Is dead? Enemies are permanently dead, players are revived after a while
    
    private currentStamina: number; // How much hp? Start at full
    private readonly maxStamina: number; 

    constructor(maxStamina: number) {
        this.currentStamina = maxStamina;
        this.maxStamina = maxStamina;
    }

    addStamina(stamina: number) {
        this.currentStamina = Math.min(this.maxStamina, this.currentStamina + stamina);
    }
    addStaminaPercent(maxStaminaPercent: number) {
        // TODO: is ceiling here correct?
        let amount = Math.ceil(this.getMaxStamina() * maxStaminaPercent);
        this.addStamina(amount);
    }

    removeStamina(stamina: number) {
        this.currentStamina -= stamina;
        if (this.currentStamina <= 0) {
            this.currentStamina = 0;
            this.isDefeated = true;
        }
    }

    getIsDefeated(): boolean {
        return this.isDefeated;
    }

    revive(): void {
        this.isDefeated = false;
        this.addStamina(this.getMaxStamina());
    }

    getCurrentStamina(): number {
        return this.currentStamina;
    }
    getMaxStamina(): number {
        return this.maxStamina;
    }
    getCurrentStaminaPercent(): number {
        return this.getCurrentStamina() / this.getMaxStamina();
    }

    //abstract getDefenceAfterModifications(): number;
    //abstract getPowerAfterModifications(): number;
    abstract getProficiencyPowerAfterModifications(): number; 
    abstract getDeficiencyDefenceAfterModifications(): number;

}


