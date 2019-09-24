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
    }

    allowWizardFollowupAction(): boolean {
        return true; 
    }

    onFinish() {
        this.enemy.inCombat = false;
        this.enemy.inCombatWith = null;
        this.wizard.inCombat = false;
        this.wizard.inCombatWith = null;
        // Reset exstimulos and wit sharpening potion
        this.wizard.resetPotionUsesRemaining();
    }


}
