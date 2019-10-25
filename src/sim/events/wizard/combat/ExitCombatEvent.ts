import { Enemy } from "../../../../model/env/enemies/Enemy";
import { Wizard } from "../../../../model/player/Wizard";
import { CombatEvent } from "./CombatEvent";
import { CombatBeginEvent } from "./CombatBeginEvent";
import { SimEvent } from "../../SimEvent";
import { Logger } from "../../../../util/Logger";
import Prando from "prando";

export class ExitCombatEvent extends CombatEvent {

    constructor(timestampBegin: number, enemy: Enemy, wizard: Wizard, rng: Prando) {
        super("exitCombat", timestampBegin, enemy, wizard, rng);

        if (this.enemy.inCombat === false) {
            throw new Error(wizard.toUserFriendlyDescription() + " tried exiting combat with " + enemy.toUserFriendlyDescription() + " but enemy was not in combat!"); 
        }
        if (this.wizard.inCombat === false) {
            throw new Error(wizard.toUserFriendlyDescription() + " tried exiting combat with " + enemy.toUserFriendlyDescription() + " but wizard was not in combat!"); 
        }
    }

    allowWizardFollowupAction(): boolean {
        return true; 
    }

    onFinish() {
        this.wizard.removePotionBuffs(); 

        this.enemy.inCombat = false;
        this.enemy.inCombatWith = null;
        this.wizard.inCombat = false;
        this.wizard.inCombatWith = null;

        Logger.logTUserFriendly(1, this.timestampEnd, this.wizard.toUserFriendlyDescription() + " has exited combat with " + 
                                this.enemy.toUserFriendlyDescription() + "."); 
    }


}
