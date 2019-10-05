import { EnvEvent } from "./EnvEvent";
import { Enemy } from "../../../model/env/enemies/Enemy";
import { Logger } from "../../../util/Logger";


export class EnemySpawnEvent extends EnvEvent {

    enemy: Enemy;

    constructor(timestampBegin: number, enemy: Enemy) {
        super("enemySpawn", timestampBegin);
        this.enemy = enemy;
    }

    allowWizardFollowupAction() {
        return false; 
    }

    hasFollowupEvent() {
        return false;
    }

    onFinish() {
        Logger.logTUserFriendly(1, this.timestampEnd, this.enemy.toUserFriendlyDescription() + " has spawned."); 
    }

}
