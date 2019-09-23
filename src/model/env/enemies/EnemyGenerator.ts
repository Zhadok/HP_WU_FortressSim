import { Enemy } from "./Enemy";

import { enemyNameType } from "../../../types";
import { firstBy } from "thenby";
import Prando from "prando";

export class EnemyGenerator {

    readonly rng: Prando; 

    private constructor(rng: Prando) {
        this.rng = rng;
    }

    static buildEnemyGeneratorWithRng(rng: Prando): EnemyGenerator {
        return new EnemyGenerator(rng);
    }
    static buildEnemyGenerator(): EnemyGenerator {
        return new EnemyGenerator(new Prando(0));
    }

    generateEnemies(overallDifficulty: number, focusBudet: number, playerCount: number, roomLevel: number): Array<Enemy> {
        let result: Array<Enemy> = [];
        let nEnemies = 0; 


        result.push(Enemy.buildEnemy("acromantula", 0, false, 1, 1, 3));
        result.push(Enemy.buildEnemy("pixie", 1, false, 1, 1, 3));


        result.sort(firstBy("focusReward"));
        return result;
    }

    // Overall difficulty could be divided like this:
    // 2 * sum(EnemyStars * EnemyLevel * (1 + IsElite))
    // Factor 2 is inaccurate for rooms below level 11
    // Source: https://www.reddit.com/r/harrypotterwu/comments/csgsdd/all_about_combat_damage_what_i_know_or_i_think_i/?st=k0gijz3i&sh=acd204fd
    

}
