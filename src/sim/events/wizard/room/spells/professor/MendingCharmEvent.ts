import { StrategicSpellEvent } from "../StrategicSpellEvent";
import { Wizard } from "../../../../../../model/player/Wizard";
import { Professor } from "../../../../../../model/player/Professor";
import { SimEvent } from "../../../../SimEvent";
import { MendingCharmCooldownFinishedEvent } from "./MendingCharmCooldownFinishedEvent";
import spellCooldownData from "../../../../../../data/spellCooldowns.json"; 
import { Magizoologist } from "../../../../../../model/player/Magizoologist";

export class MendingCharmEvent extends StrategicSpellEvent {

    readonly staminaRestore: number;
    readonly targetWizard: Wizard;

    constructor(timestampBegin: number, staminaRestore: number, targetWizard: Wizard, caster: Wizard) {
        super(timestampBegin, caster);
        this.staminaRestore = staminaRestore;
        this.targetWizard = targetWizard;

        if (caster instanceof Professor) {
            if (caster.hasStudiedMendingCharm() === false) {
                throw new Error(caster.toUserFriendlyDescription() + " has not studied mending charm but tried casting it!");
            }
        }
        else if (caster instanceof Magizoologist) {
            if (caster.hasStudiedMendingCharm() === false) {
                throw new Error(caster.toUserFriendlyDescription() + " has not studied mending charm but tried casting it!");
            }
        }
        if (caster.mendingCharmOnCooldown === true) {
            throw new Error(caster.toUserFriendlyDescription() + " tried casting mending charm while it was still on cooldown!"); 
        }
    }

    onStart() {
        this.getCaster().mendingCharmOnCooldown = true;
    }

    onFinish() {
        super.onFinish(); 
        this.targetWizard.addStamina(this.staminaRestore);
        this.getCaster().processFocusCostStrategicSpell("mendingCharm");
    }
    getStrategicSpellName(): string {
        return "Mending Charm (+" + this.staminaRestore + "hp)"; 
    }

    hasFollowupEvent(): boolean {
        return true; 
    }
    
    getFollowupEvent(): SimEvent {
        return new MendingCharmCooldownFinishedEvent(this.timestampEnd, spellCooldownData.mendingCharm - (this.duration), this.getCaster()); 
    }   



}