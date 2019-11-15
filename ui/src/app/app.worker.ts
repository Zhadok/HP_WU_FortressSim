/// <reference lib="webworker" />
import Prando from 'prando';
import { CombatSimulation } from "../../../src/sim/CombatSimulation";
import { CombatSimulationParameters } from '../../../src/sim/CombatSimulationParameters';
import { CombatSimulationResults } from '../../../src/sim/CombatSimulationResults';
import { Logger } from '../../../src/util/Logger';
import {
    nameClassType, nameClassUserFriendlyType, simGoalType as simGoalType, simAdvancedSettingsType,
    simProgressType, simulationResultsGroupedType, localStorageDataType, ruleVisDataRowType, ruleVisDataContainerType, simulationLogChannelStoreType, simulationLogChannelType, ruleContainerType, wizardSettingsType, ruleType, actionNameMapType, ruleOperatorType, ruleOperatorMapType, ruleFactNameType, ruleConditionType, simGoalMapType, skillTreeFilterLessonsType, webWorkerMessageContainerType, webWorkerMessageResponseContainerType
} from '../../../src/types';

addEventListener('message', async ({ data }) => {
    let messageContainer = data as webWorkerMessageContainerType; 

    if (messageContainer === undefined) {
        throw new Error("Web worker received 'undefined' as message!"); 
    }
    //postMessage(messageContainer); 
    switch (messageContainer.messageType) {
        case "executeSimulation": 
            Logger.verbosity = 0; // todo: redirect this console.log to postMessage 
            //console.log("Simulating..."); 
            try {
                let combatSimulation = new CombatSimulation(messageContainer.params.combatSimulationParameters, new Prando(messageContainer.params.combatSimulationParameters.seed)); 
                combatSimulation.init();
                await combatSimulation.simulate(); 
                let results = combatSimulation.toSimulationResults(); 
                results.runID = messageContainer.params.runID; 
                postSimulationFinished(results); 
            }
            catch (error) {
                console.log("Error during simulation!"); 
                postSimulationError(error, messageContainer.params.combatSimulationParameters);
            }
            break;
        default: 
            postMessage("Worker received unknown message: "); 
            postMessage(messageContainer); 
    }
    
});


function postSimulationFinished(simulationResults: CombatSimulationResults) {
    let response: webWorkerMessageResponseContainerType = {
        messageType: "simulationFinished", 
        params: {
            combatSimulationResults: simulationResults
        }
    };
    postMessage(response);     
}

function postSimulationError(error, combatSimulationParameters: CombatSimulationParameters) {
    console.log("Error in WebWorker: "); 
    console.log(error); 
    let response: webWorkerMessageResponseContainerType = {
        messageType: "simulationError", 
        params: {
            error: error,
            combatSimulationParameters: combatSimulationParameters
        }
    };
    postMessage(response);     
}

