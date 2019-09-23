import { EnvEvent } from "./EnvEvent";
import { Enemy } from "../../../model/env/enemies/Enemy";


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

}
