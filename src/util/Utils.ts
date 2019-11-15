import { Combatant } from "../model/Combatant";


export class Utils {

    // https://stackoverflow.com/questions/8511281/check-if-a-value-is-an-object-in-javascript
    static isObject(val: any): boolean {
        if (val === null) { return false; }
        return ((typeof val === 'function') || (typeof val === 'object'));
    }

    // recursively do this but allow only primitives 
    // avoid circular references
    // prepend "." to all paths
    // example: 
    /**
     * 
     * @param object 
     * 
     * {
     *     "a": 123,
     *     "b": true,
     *     "c": {
     *          "d": 4
     *     }
     * }
     * 
     * should return [".a", ".b", ".c", ".c.d"]
     */
    static getAllFieldNames(object: any, currentPath: string, exploredPaths: Array<string>): Array<string> {
        if (Utils.isObject(object) === false) {
            return [currentPath];
        }
        let result: Array<string> = [];
        if (currentPath !== "") {
            // push path to this object itself as well
            result.push(currentPath);
        }
        for (let key of Object.getOwnPropertyNames(object)) {
            // check if key is already in path somewhere to avoid circular references
            let pathSections = currentPath.split(".");
            let childPath = currentPath + "." + key;
            if (pathSections.indexOf(key) === -1) {
                exploredPaths.push(childPath);
                let childKeys = Utils.getAllFieldNames(object[key], childPath, exploredPaths);
                result = result.concat(childKeys);
            }
            else {
                //console.log("Not exploring " + childPath); 
            }
            //console.log(exploredPaths); 
        }
        return result;
    }


    static deepCompareObjectSameKeys(o1: any, o2: any): boolean {
        // Get the keys of each object
        const o1keys = Object.keys(o1).sort();
        const o2keys = Object.keys(o2).sort();
        // Make sure they match
        // If you don't want a string check, you could do
        // if (o1keys.length !== o2keys.length || !o1keys.every((key, index) => o2keys[index] === key)) {
        if (o1keys.join() !== o2keys.join()) {
            // This level doesn't have the same keys
            return false;
        }
        // Check any objects
        return o1keys.every(key => {
            const v1 = o1[key];
            const v2 = o2[key];
            if (v1 === null) {
                return v2 === null;
            }
            const t1 = typeof v1;
            const t2 = typeof v2;
            if (t1 !== t2) {
                return false;
            }
            return t1 === "object" ? Utils.deepCompareObjectSameKeys(v1, v2) : true;
        });

    }

    static getLowestHPCombatant(combatants: Array<Combatant>): Combatant {
        let result = combatants.sort(function (v1, v2) {
            return v2.getCurrentStamina() - v1.getCurrentStamina();
        })[0];
        return result;
    }

}