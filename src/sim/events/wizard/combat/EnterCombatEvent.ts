import { Enemy } from "../../../../model/env/enemies/Enemy";
import { Wizard } from "../../../../model/player/Wizard";
import { CombatEvent } from "./CombatEvent";
import { CombatBeginEvent } from "./CombatBeginEvent";
import { SimEvent } from "../../SimEvent";
import { Logger } from "../../../../util/Logger";
import Prando from "prando";

export class EnterCombatEvent extends CombatEvent {

    constructor(timestampBegin: number, enemy: Enemy, wizard: Wizard, rng: Prando) {
        super("enterCombat", timestampBegin, enemy, wizard, rng);
    }

    onStart() {
        Logger.logT(2, this.timestampBegin, "EnterCombatEvent.onStart: Wizard (id=" + this.wizard.playerIndex + ") and enemy (id=" + this.enemy.enemyIndex + ") are entering combat");

        if (this.enemy.inCombat === true) {
            throw new Error(this.wizard.toUserFriendlyDescription() + " tried entering combat with " + 
                            this.enemy.toUserFriendlyDescription() + ", but enemy was already in combat!");
        }
        if (this.wizard.inCombat === true) {
            throw new Error(this.wizard.toUserFriendlyDescription() + " tried entering combat with " + 
                            this.enemy.toUserFriendlyDescription() + ", but wizard was already in combat!")
        }

        this.wizard.inCombat = true;
        this.wizard.inCombatWith = this.enemy;
        this.enemy.inCombat = true;
        this.enemy.inCombatWith = this.wizard;

    }

    hasFollowupEvent(): boolean {
        return true;
    }
    getFollowupEvent(): SimEvent {
        return new CombatBeginEvent(this.timestampEnd, this.enemy, this.wizard, this.rng);
    }

    allowWizardFollowupAction() {
        return false; 
    }

}
