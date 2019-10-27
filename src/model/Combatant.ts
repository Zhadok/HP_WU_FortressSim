export abstract class Combatant {

    inCombat: boolean = false; // Is in combat? Enemies in combat cannot be entered into combat with by other players
    protected isDefeated: boolean = false; // Is dead? Enemies are permanently dead, players are revived after a while

    private currentStamina: number; // How much hp? Start at full
    private currentStaminaPercent: number; // How much hp in % (between 0 and 1)? 
    private missingStaminaPercent: number; // How much hp in % is missing (between 0 and 1)? 1-currentStaminaPercent
    private readonly maxStamina: number; 


    constructor(maxStamina: number) {
        this.currentStamina = maxStamina;
        this.currentStaminaPercent = 1; 
        this.missingStaminaPercent = 0; 
        this.maxStamina = maxStamina;
    }

    setStamina(stamina: number) {
        this.currentStamina = stamina; 
        this.currentStaminaPercent = this.getCurrentStaminaPercent(); // Used for rules, which cannot call functions but need a value
        this.missingStaminaPercent = 1 - this.currentStaminaPercent; 
    }

    addStamina(stamina: number) {
        this.setStamina(Math.min(this.maxStamina, this.currentStamina + stamina));
    }
    addStaminaPercent(maxStaminaPercent: number) {
        // TODO: is ceiling here correct?
        let amount = Math.ceil(this.getMaxStamina() * maxStaminaPercent);
        this.addStamina(amount);
    }

    removeStamina(stamina: number) {
        this.setStamina(this.currentStamina - stamina); 
        if (this.currentStamina <= 0) {
            this.setDefeated(); 
        }
    }

    getIsDefeated(): boolean {
        return this.isDefeated;
    }

    setDefeated(): void {
        this.isDefeated = true; 
        this.setStamina(0); 
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
    getMissingStaminaPercent(): number { 
        return this.missingStaminaPercent; 
    }

    //abstract getDefenceAfterModifications(): number;
    //abstract getPowerAfterModifications(): number;
    abstract getProficiencyPowerAfterModifications(): number; 
    abstract getDeficiencyDefenceAfterModifications(): number;

}


