import { simAdvancedSettingsType, webWorkerMessageContainerType, webWorkerMessageResponseContainerType } from '../types';
import { CombatSimulationManager } from '../../../src/sim/parallel/CombatSimulationManager';
import { CombatSimulationResults } from '../sim/CombatSimulationResults';

export interface WorkerContainer {
    worker: Worker, 
    busy: boolean
}


export class WebWorkerPool extends CombatSimulationManager{

    workerContainers: Array<WorkerContainer> = []; 
    simAdvancedSettings: simAdvancedSettingsType; 
    
    // During simulations
    nextJobID: number; 
    currentJobs: Array<webWorkerMessageContainerType>; 
   
    simulationResults: CombatSimulationResults[]; 
    onFinishSimulationsCallback; 


    constructor(simAdvancedSettings: simAdvancedSettingsType) {
        super(); 
        this.simAdvancedSettings = simAdvancedSettings; 

        let self = this; 
        for (let workerIndex=0; workerIndex<this.simAdvancedSettings.numberParallelWorkers; workerIndex++) {
            let worker = new Worker("./app.worker", { type: "module"}); 
            worker.onmessage = function(data) {
                self.onWorkerResponse.call(self, data, workerIndex); 
            }

            this.workerContainers.push({
                worker: worker, 
                busy: false
            }); 
        }
        console.log("Initialized " + this.simAdvancedSettings.numberParallelWorkers + " web workers..."); 
    }

    getNumberSimulationsTotal(): number {
        return this.currentJobs.length; 
    }

    executeJobs(messageContainers: Array<webWorkerMessageContainerType>, callbackFunction): void {
        this.currentRunID = 0; 
        this.nextJobID = 0; 
        this.currentJobs = []; 
        this.simulationResults = []; 
        this.onFinishSimulationsCallback = callbackFunction; 

        for (let runID=0;runID<messageContainers.length;runID++) { //simParams.length
            let messageContainer = messageContainers[runID]; 
            messageContainer.params.runID = runID; 
            this.addJob(messageContainer); 
        }
        console.log("Executing " + this.currentJobs.length + " jobs in parallel with " + this.workerContainers.length + " worker threads."); 
        this.triggerIdleWorkers(); 
    }

    addJob(webWorkerMessageContainer: webWorkerMessageContainerType): void {
        //console.log("Adding job: " + webWorkerMessageContainer); 
        this.currentJobs.push(webWorkerMessageContainer); 
    }

    getNextJob(): webWorkerMessageContainerType | undefined {
        let result = this.currentJobs[this.nextJobID]; 
        //console.log("Returning next job (nextJobID=" + this.nextJobID + "): " + result);
        if (this.nextJobID < this.currentJobs.length) {
            this.nextJobID++;  // Only increment if there are any jobs remaining. after this this function returns undefined
        }
        return result;
    }

    triggerIdleWorkers(): void {
        this.workerContainers.forEach((workerContainer, workerIndex) => {
            if (workerContainer.busy === false) {
                workerContainer.busy = true; 
                //console.log("Worker id=" + workerIndex + " was not busy. Requesting next job..."); 
                let nextJob = this.getNextJob(); 
                if (nextJob !== undefined) {
                    //console.log("Worker id=" + workerIndex + " starting job..."); 
                    workerContainer.worker.postMessage(nextJob); 
                }
                else {
                    //console.log("Worker id=" + workerIndex + " was not busy but no jobs remaining!"); 
                }
            }
        });
    }

    /*executeJob(webWorkerMessageContainer: webWorkerMessageContainerType) {
        // Get next available worker that is not busy
        let workerContainer = this.getAvailableWorker(); 
        workerContainer.busy = true; 
        workerContainer.worker.postMessage(webWorkerMessageContainer); 
    }
    getAvailableWorker(): WorkerContainer | null {
        for (let workerContainer of this.workerContainers) {
            if (workerContainer.busy === false) {
                return workerContainer; 
            }
        }
        return null; 
    }*/

    onWorkerResponse(data, workerIndex: number) {
        let workerResponse = data.data as webWorkerMessageResponseContainerType; 
        switch (workerResponse.messageType) {
            case "simulationFinished": 
                console.log("Finished simulation, currentRunID=" + this.currentRunID); 
                this.simulationResults.push(workerResponse.params.combatSimulationResults); 
                this.currentRunID++;
                break; 
        }
        this.workerContainers[workerIndex].busy = false; 
        this.updateSimProgress(); 
        this.triggerIdleWorkers(); 
        this.checkForJobsCompletion(); 
    }

    checkForJobsCompletion() {
        if (this.currentRunID === this.getNumberSimulationsTotal()) {
            // Finished

            this.simulationResults.sort((a, b) => { return a.runID! - b.runID!; }); 
            this.onFinishSimulationsCallback(this.simulationResults);
        }
    }
    



}