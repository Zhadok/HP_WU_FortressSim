

export abstract class CombatSimulationManager {

    currentRunID: number = 0; 
    listenerSimProgress: Function | null = null; 

    setListenerSimProgress(listener: Function) {
        this.listenerSimProgress = listener; 
    }

    updateSimProgress(): void {
        if (this.listenerSimProgress !== null) {
            this.listenerSimProgress({
                nTotal: this.getNumberSimulationsTotal(),
                nFinished: this.currentRunID,
                nRemaining: this.getNumberSimulationsTotal()-(this.currentRunID)
            }); 
        }
    }

    abstract getNumberSimulationsTotal(): number; 
}