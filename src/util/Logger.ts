
export class Logger {

    static verbosity: number = 2;

    static log(verbosityParam: number, message: string) {
        if (this.verbosity >= verbosityParam) {
            console.log(message);
        }
    }

    static logT(verbosityParam: number, timestamp: number, message: string) {
        if (this.verbosity >= verbosityParam) {
            console.log((timestamp / 1000.0).toFixed(3) + ": " + message);
        }
    }
}
