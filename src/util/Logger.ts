import { simulationLogChannelType } from "../types";

export class Logger {

    static verbosity: number = 2;

    static callbackFunction = console.log; 

    // noop: should be set from other channel where we want this, for example in frontend 
    static callbackFunctionUserFriendly = function (message: string) {};

    static log(verbosityParam: number, message: string, simLogChannel?: simulationLogChannelType) {
        if (simLogChannel === undefined) {
            simLogChannel = "Debug"; 
        }
        if (this.verbosity >= verbosityParam) {
            switch (simLogChannel) {
                case "Debug": Logger.callbackFunction(message); break; 
                case "User friendly": Logger.callbackFunctionUserFriendly(message); break; 
            }
        }
    }

    static logT(verbosityParam: number, timestamp: number, message: string) {
        Logger.log(verbosityParam, (timestamp / 1000.0).toFixed(3) + ": " + message, "Debug"); 
    }

    static logTUserFriendly(verbosityParam: number, timestamp: number, message: string) {
        Logger.log(verbosityParam, (timestamp / 1000.0).toFixed(3) + ": " + message, "User friendly"); 
    }


}
