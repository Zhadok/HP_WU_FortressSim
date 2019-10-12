import { Wizard } from "../../src/model/player/Wizard";
import { expect } from "chai";
import { Utils } from "../../src/util/Utils";
import { WizardFactory } from "../../src/model/player/WizardFactory";



describe("Utils", function() {


    it("getPrimitiveAttributeNames_simple", function() {
        let obj = {
            "a": 1, 
            "b": true, 
            "c": "asd"
        };
        let result = Utils.getAllFieldNames(obj, "", []); 
        expect(result).to.deep.equal([".a", ".b", ".c"]); 
    }); 

    it("getPrimitiveAttributeNames_nested", function() {
        let obj = {
            "a": 1, 
            "b": true, 
            "c": {
                "d": "asd"
            }
        };
        let result = Utils.getAllFieldNames(obj, "", []); 
        expect(result).to.deep.equal([".a", ".b", ".c", ".c.d"]); 
    }); 

    it("getPrimitiveAttributeNames_nested_circular_references", function() {
        let obj1: {a: number, b: boolean, otherReference: any, shared: any} = { 
            "a": 1,
            "b": true,
            "shared": {
                "abc": 0
            },
            "otherReference": null
        }; 
        let obj2: {aa: number, bb: boolean, otherReference: any, shared: any} = {
            "aa": 5,
            "bb": false,
            "shared": {
                "abc": 1
            },
            "otherReference": null
        };
        obj1.otherReference = obj2;
        obj2.otherReference = obj1; 

        //console.log(JSON.stringify(obj1)); // prints "circular" 
        let result = Utils.getAllFieldNames(obj1, "", []); 
        //console.log(result); 
        expect(result).to.deep.equal([".a", ".b", ".shared", ".shared.abc", 
                                      ".otherReference", ".otherReference.aa", ".otherReference.bb", ".otherReference.shared", ".otherReference.shared.abc"]); 
    });

    it("getPrimitiveAttributeNames_demo_wizard", function() {
        let wizard = WizardFactory.buildDemoWizard("professor");
        let result = Utils.getAllFieldNames(wizard, "", []); 
        //console.log(result.length); 
    });

}); 


