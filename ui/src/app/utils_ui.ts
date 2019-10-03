

export class Utils_UI {

    // https://stackoverflow.com/questions/8511281/check-if-a-value-is-an-object-in-javascript
    static isObject(val): boolean {
        if (val === null) { return false;}
        return ( (typeof val === 'function') || (typeof val === 'object') );
    }
}