import { Component, OnInit, Input } from '@angular/core';
import { ruleConditionGroupNameType, actionNameMapType, ruleFactNameType, ruleConditionType, ruleOperatorMapType, ruleType } from '../../types';
import { RulesEngine } from '../../../../src/rules/RulesEngine';
import { Utils_UI } from 'app/utils_ui';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';

@Component({
    selector: 'app-rule-detail-component',
    templateUrl: './rule-detail-component.component.html',
    styleUrls: ['./rule-detail-component.component.css']
})
export class RuleDetailComponentComponent implements OnInit {

    @Input() conditionGroup: Array<any>; // This class creates one row per condition
    @Input() parentConditionGroup: Array<any>; // This is the parent array that contains this condition group
    @Input() parentConditionGroupIndex: number;  // This is the index of conditionGroup within the parent array
    @Input() ruleConditionGroupName: ruleConditionGroupNameType;
    @Input() depth: number;
        

    constructor() { }

    ngOnInit() {
    }


    // Which fact objects are allowed (wizard, highest priority available enemy)
    getAllowedRuleFactObjectsMap() {
        return RulesEngine.allowedFactObjects;
    }

    // Which path is allowed for object (e.g., .stats.power)
    getAllowedRuleFactPaths(playerIndex: number, ruleFactName: ruleFactNameType) {
        if (RulesEngine.allowedFactObjects[ruleFactName] === undefined) {
            throw new Error("Invalid ruleFactName=" + ruleFactName);
        }
        let result = RulesEngine.allowedFactObjects[ruleFactName].allowedPaths;
        return result;
    }

    // Which operators are allowed? (>, <, >= and so on)
    getRuleOperatorMap(): ruleOperatorMapType {
        return RulesEngine.ruleOperatorMap; 
    }

    // rule conditions are allowed to use primitive values for comparison but also object values with paths
    isConditionValuePrimitive(condition: ruleConditionType): boolean {
        //console.log(condition.value+ ", result=" + Utils_UI.isObject(condition.value)); 
        return Utils_UI.isObject(condition.value) === false; 
    }

    toggleConditionPrimitiveValue(condition: ruleConditionType, isChecked: boolean) {
        console.log("checked: " + isChecked); 
        if (isChecked) {
            // Then use primitive value
            condition.value = null;
        }
        else {
            condition.value = {
                fact: null,
                path: null
            };
        }
    }
    stringifyPrimitiveValue(value: any) {
        return JSON.stringify(value); 
    }
    onChangeConditionPrimitiveValue(condition: ruleConditionType, event) {
        try {
            condition.value = JSON.parse(event.target.value); 
        }
        catch (e) {
            // TODO: Mark input for error here
        }
    }

    onClickAddCondition() {
        this.conditionGroup.push({
            fact: "wizard",
            path: null,
            operator: "equal",
            value: null 
        }); 
    }
    onClickRemoveCondition(conditionIndex: number) {
        //console.log(conditionIndex); 
        this.conditionGroup.splice(conditionIndex, 1); 
    }

    onClickAddConditionGroup(ruleConditionGroupName: ruleConditionGroupNameType) {
        let newConditionGroup = {}; 
        newConditionGroup[ruleConditionGroupName] = []; 
        this.conditionGroup.push(newConditionGroup);
    }
    onClickRemoveConditionGroup() {
        console.log(this.parentConditionGroup); 
        console.log(this.parentConditionGroupIndex); 
        this.parentConditionGroup.splice(this.parentConditionGroupIndex, 1); 
    }

    toUpperCase(input: string) {
        return input.toLocaleUpperCase(); 
    }

}
