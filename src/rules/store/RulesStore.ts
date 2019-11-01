import { ruleStoreType, ruleContainerType } from "../../types";


import aurorRules from "./aurorRules.json";
import aurorRules_onlyBatBogeyHex from "./aurorRules_onlyBatBogeyHex.json"; 

import magizoologistRules from "./magizoologistRules.json";

import professorRules from "./professorRules.json";
import professorRules_onlyDeteriorationHex from "./professorRules_onlyDeteriorationHex.json";
import professorRules_onlyMendingCharm from "./professorRules_onlyMendingCharm.json"; 




export class RulesStore {
   
    static store: ruleStoreType = {
        "auror": [
            aurorRules as ruleContainerType,
            aurorRules_onlyBatBogeyHex as ruleContainerType
        ],
        "magizoologist": [
            magizoologistRules as ruleContainerType
        ],
        "professor": [
            professorRules as ruleContainerType,
            professorRules_onlyDeteriorationHex as ruleContainerType,
            professorRules_onlyMendingCharm as ruleContainerType
        ]
    }; 



    static getDefaultRuleContainer(nameClass: string): ruleContainerType {
        let ruleContainer: ruleContainerType; 
        switch (nameClass) {
            case "auror": ruleContainer = RulesStore.store.auror[0]; break;
            case "magizoologist": ruleContainer = RulesStore.store.magizoologist[0]; break;
            case "professor": ruleContainer = RulesStore.store.professor[0]; break;
            default: throw new Error(nameClass + " has no default rules assigned!"); 
        }
        return ruleContainer; 
    }



}