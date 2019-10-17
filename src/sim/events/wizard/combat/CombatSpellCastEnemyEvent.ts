import { Enemy } from "../../../../model/env/enemies/Enemy";
import { Wizard } from "../../../../model/player/Wizard";
import { CombatEvent } from "./CombatEvent";

import { SimEvent } from "../../SimEvent";
import { WizardDefeatEvent } from "./WizardDefeatEvent";
import { EnemyDefeatEvent } from "../../env/EnemyDefeatEvent";
import { CombatSpellCastWizardEvent } from "./CombatSpellCastWizardEvent";
import Prando from "prando";
import { Logger } from "../../../../util/Logger";

export class CombatSpellCastEnemyEvent extends CombatEvent {

    readonly probabilityChainAttackEnemy: number = -1; 
    readonly isChainAttack: boolean;

    // wizardActionTimeout: Did the wizard perform an action or is this attack because of a timeout?
    constructor(eventTimestampBegin: number, targetEnemy: Enemy, wizard: Wizard, rng: Prando, wizardActionTimeout?: boolean) {
        super(wizardActionTimeout ? "spellCast_enemy_after_no_wizard_action" : "spellCast_enemy", eventTimestampBegin, targetEnemy, wizard, rng);

        this.isChainAttack = this.probabilityChainAttackEnemy >= this.rng.next();
    }
    
    // If the enemy is doing a chain attack:
    // Wizard is not allowed an action
    // If enemy is not doing a chain attack: 
    // Wizard is allowed an action
    allowWizardFollowupAction() {
        return this.isChainAttack === false && this.wizard.getIsDefeated() === false && this.enemy.getIsDefeated() === false;
    }

    // Opposite of whether wizard is allowed an action
    hasFollowupEvent(): boolean {
        return ! this.allowWizardFollowupAction();
    }
    getFollowupEvent(): SimEvent {
        if (this.wizard.getIsDefeated()) {
            return new WizardDefeatEvent(this.timestampEnd, this.enemy, this.wizard, this.rng);
        }
        else if (this.enemy.getIsDefeated() === true) {
            return new EnemyDefeatEvent(this.timestampEnd, this.enemy, this.wizard);
        }
        else {
            // Else this is a chain attack
            return new CombatSpellCastEnemyEvent(this.timestampEnd, this.enemy, this.wizard, this.rng);
        }
    }

    onFinish() {
        let damage = CombatSpellCastEnemyEvent.computeEnemyDamage(this.wizard, this.enemy, 1);
        
        let enemyStaminaBeforeDamage = this.enemy.getCurrentStamina(); 
        if (this.enemy.hasDeteriorationHex) {
            this.enemy.removeStamina( this.enemy.deteriorationHexDamage );
        }
        
        let staminaBeforeDamage = this.wizard.getCurrentStamina();
        this.wizard.removeStamina(damage);        
        
        let message = this.enemy.toUserFriendlyDescription() + " dealt " + damage + 
                      " damage to " + this.wizard.toUserFriendlyDescription() + " ("  +
                        staminaBeforeDamage + "/" + this.wizard.getMaxStamina() + " -> " + 
                        this.wizard.getCurrentStamina() + "/" + this.wizard.getMaxStamina() + ")"

        if (this.enemy.hasDeteriorationHex) {
            message += " and takes " + (enemyStaminaBeforeDamage - this.enemy.getCurrentStamina()) + " damage from hex " +
                       " (" + enemyStaminaBeforeDamage + "/" + this.enemy.getMaxStamina() + " -> " + 
                       this.enemy.getCurrentStamina() + "/" + this.enemy.getMaxStamina() + ")";
        }

        Logger.logT(2, this.timestampEnd, message);
        Logger.logTUserFriendly(2, this.timestampEnd, message); 
    }

    // How much damage will enemy deal to wizard?
    // EnemyDmg=Ceiling{Enemy_Power∗
    //(1+(Enemy_IsProficient∗Max[0,(Enemy_ProficiencyPow−DeficiencyDef)]))∗
    //(1−Range[0−100%,(Defence−Enemy_DefenceBreach)])∗
    //(1−(IsProtego∗ProtegoPower))}
    static computeEnemyDamage(wizard: Wizard, enemy: Enemy, isProtego: number) {
        
        let isProficient: number = (enemy.isProficientAgainst(wizard)) ? 1 : 0;

        let result = 
            enemy.getPowerAfterModifications() * 
            (1 + isProficient * Math.max(0, enemy.getProficiencyPowerAfterModifications() - wizard.getDeficiencyDefenceAfterModifications())) *
            (1 - Math.min(1, Math.max(0, wizard.getDefenceAfterModifications(enemy) - enemy.getDefenceBreachAfterModifications())));

        //console.log("power after modifications=" + enemy.getPowerAfterModifications() + ", defence after modifications=" + wizard.getDefenceAfterModifications() + ", defence breach="  + enemy.getDefenceBreachAfterModifications());
        //console.log("result without protego="  + result);

        result *= (1 - (isProtego * wizard.getProtegoPowerAfterModifications(enemy)))
        //console.log("result with protego=" + result);
        
        return Math.ceil(result);
    }


}

