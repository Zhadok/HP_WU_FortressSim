

export interface PotionAvailabilityParameters {
    nHealingPotionsAvailable: number,

    nWeakInvigorationAvailable: number,
    nStrongInvigorationAvailable: number,

    nExstimuloAvailable: number,
    nStrongExstimuloAvailable: number,
    nPotentExstimuloAvailable: number,

    nWitSharpeningAvailable: number,

    // Buffs (outside combat)
    hasBaruffiosBrainElixir: boolean,
    hasTonicForTraceDetection: boolean
}