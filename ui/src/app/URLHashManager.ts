import { localStorageDataType } from '../types';


export class URLHashManager {

    static hasValidDataInHashFragment(): boolean {
        try {
            let data = URLHashManager.getDataFromHashFragment();
            if (data.simAdvancedSettings == undefined || data.simParameters === undefined) {
                return false; 
            }
        }
        catch (error) {
            return false; 
        }
        return true; 
    }

    static getDataFromHashFragment(): localStorageDataType {
        let hashFragment = window.location.hash; 
        hashFragment = hashFragment.substr(1, hashFragment.length); 
        hashFragment = decodeURIComponent(hashFragment); 
        return JSON.parse(hashFragment); 
    }

    private static setHashFragment(input: string) {
        history.replaceState(undefined, undefined, input); 
    }

    static convertDataToHashFragment(data: localStorageDataType): string {
        return encodeURIComponent(JSON.stringify(data)); 
    }

    // https://stackoverflow.com/questions/11588482/how-can-i-replace-a-windows-url-hash-with-another-response
    static setDataAsHashFragment(data: localStorageDataType) {
        //, JSON.stringify(data)); 
        URLHashManager.setHashFragment(URLHashManager.convertDataToHashFragment(data)); 
    }

    // https://stackoverflow.com/questions/1397329/how-to-remove-the-hash-from-window-location-url-with-javascript-without-page-r
    static resetHashFragment(): void {
        //history.pushState("", document.title, window.location.pathname + window.location.search);
        URLHashManager.setHashFragment(""); 
    }

}