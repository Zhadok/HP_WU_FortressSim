import { Enemy } from "../../../../model/env/enemies/Enemy";
import { Wizard } from "../../../../model/player/Wizard";
import { CombatEvent } from "./CombatEvent";

import Prando from "prando";
import { CombatSpellCastEnemyEvent } from "./CombatSpellCastEnemyEvent";
import { SimEvent } from "../../SimEvent";
import { EnemyDefeatEvent } from "../../env/EnemyDefeatEvent";
import { Logger } from "../../../../util/Logger";

export class CombatSpellCastWizardEvent extends CombatEvent {

    readonly probabilityChainAttackWizard: number = -1; 
    isChainAttack: boolean;

    constructor(eventTimestampBegin: number, targetEnemy: Enemy, wizard: Wizard, rng: Prando) {
        super("spellCast_wizard", eventTimestampBegin, targetEnemy, wizard, rng);

        this.isChainAttack = this.probabilityChainAttackWizard >= this.rng.next();
    }

    allowWizardFollowupAction() {
        return this.isChainAttack && this.enemy.getIsDefeated() === false;
    }

    hasFollowupEvent(): boolean {
        return ! this.allowWizardFollowupAction();
    }
    // Is called after onFinish
    getFollowupEvent(): SimEvent {
        if (this.enemy.getIsDefeated() === false) {
            return new CombatSpellCastEnemyEvent(this.timestampEnd, this.enemy, this.wizard, this.rng);
        }
        else {
            return new EnemyDefeatEvent(this.timestampEnd, this.enemy, this.wizard);
        }
        
    }

    onFinish() {
        let isCritical: number = 0; 
        let rngResult = this.rng.next();
        let isDodge: boolean = this.enemy.getDodgeAfterModifications(this.wizard) - 
                               this.wizard.getAccuracyAfterModifications(this.enemy) >= 
                                rngResult;
        //console.log("isDodge=" + isDodge + ", dodgeChance=" + this.enemy.getDodgeAfterModifications(this.wizard) + ", rngResult=" + rngResult);
        
        let damage = 0;
        if (isDodge === false) {
            let rngResult = this.rng.next();
            isCritical = (this.wizard.getCritChanceAfterModifications(this.enemy) >= rngResult) ? 1 : 0;
            //console.log("isCritical=" + isCritical + ", critChance=" + this.wizard.getCritChanceAfterModifications(this.enemy) + ", rngResult=" + rngResult);
            damage = CombatSpellCastWizardEvent.computeWizardDamage(this.wizard, this.enemy, isCritical);
        }
        else {
            Logger.logT(2, this.timestampEnd, "Enemy id=" + this.enemy.enemyIndex + " dodged attack by wizard id=" + this.wizard.playerIndex + "!");
        }
        if (this.enemy.hasDeteriorationHex) {
            damage += this.enemy.deteriorationHexDamage;
        }

        let staminaBeforeDamage = this.enemy.getCurrentStamina();
        this.enemy.removeStamina(damage);
        this.wizard.performAttackCast(damage, isCritical===1, isDodge); // Reduce exstimulo, wit sharpening and for stats

        let critString = isCritical === 1 ? " (crit) " : " ";
        Logger.logT(2, this.timestampEnd, "Enemy id=" + this.enemy.enemyIndex + " was dealt " + damage + 
                                            " damage" + critString + "by wizard id=" + this.wizard.playerIndex + "! " +
                                            "(" + staminaBeforeDamage + "/" + this.enemy.getMaxStamina() + " -> " +
                                            this.enemy.getCurrentStamina() + "/" + this.enemy.getMaxStamina() + ")");
    }

    // Sources: 
    // https://www.reddit.com/r/harrypotterwu/comments/csgsdd/all_about_combat_damage_what_i_know_or_i_think_i/?st=k0b2etkb&sh=2c084fce
    // https://docs.google.com/spreadsheets/d/1Y-D5C3zqCr9NGDjXCTJ83K8nU7Gje98D59-06zF-riw/edit#gid=1951249859
    // https://wizardsunite.gamepress.gg/guide/combat-damage-formula
    //Dmg=Ceiling{(Power)∗
    //    (1+(IsProficient∗Max[0,(ProficiencyPower−Enemy_DeficiencyDefence)]))∗
    //    (1−Range[0−100%,(Enemy_Defence−DefenceBreach)])∗
    //    (1+(IsCritical∗CriticalPower))}
    static computeWizardDamage(wizard: Wizard, enemy: Enemy, isCritical: number) {


        let isProficient: number = (wizard.isProficientAgainst(enemy)) ? 1 : 0;
        let damageBuffs: number = wizard.getDamageBuffMultiplier(enemy);
        let defenceMultiplier : number = this.computeDefenceMultiplier(wizard, enemy);
        let result = 
            wizard.getPowerAfterModifications(enemy) *                                                                                                   // Power
            (1 + (isProficient * Math.max(0, wizard.getProficiencyPowerAfterModifications()-enemy.getDeficiencyDefenceAfterModifications()))); // Proficiency / deficiency
        
        //console.log("Wizard damage before defence: " + result);
            
        result *=     
            defenceMultiplier * 
            (1 + (isCritical * wizard.getCriticalPowerAfterModifications(enemy))) *
            damageBuffs
            ;
        //console.log("Wizard damage after defence: " + result + ", enemy has defenceMultiplier=" + defenceMultiplier);
        return Math.ceil(result);
    }

    static computeDefenceMultiplier(wizard: Wizard, enemy: Enemy): number {
        return (1 - Math.min(1, 
                             Math.max(0, 
                                      enemy.getDefenceAfterModifications()-wizard.getDefenceBreachAfterModifications(enemy)))); 
    }

}

