

export class Utils {

    // https://stackoverflow.com/questions/8511281/check-if-a-value-is-an-object-in-javascript
    static isObject(val: any): boolean {
        if (val === null) { return false;}
        return ( (typeof val === 'function') || (typeof val === 'object') );
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
}