
export class Logger {

    static verbosity: number = 2;

    static log(verbosityParam: number, message: string) {
        if (this.verbosity >= verbosityParam) {
            Logger.callbackFunction(message);
        }
    }

    static logT(verbosityParam: number, timestamp: number, message: string) {
        if (this.verbosity >= verbosityParam) {
            Logger.callbackFunction((timestamp / 1000.0).toFixed(3) + ": " + message);
        }
    }

    static callbackFunction = console.log; 
}
