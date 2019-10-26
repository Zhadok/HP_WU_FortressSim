import { localStorageDataType } from '../types';


export class URLHashManager {

    static hasValidDataInHashFragment(): boolean {
        try {
            let data: any = URLHashManager.getDataFromHashFragment();
            return true; 
        }
        catch (error) {
            return false; 
        }
    }

    static getDataFromHashFragment(): localStorageDataType {
        let hashFragment = window.location.hash; 
        return JSON.parse(hashFragment); 
    }

    private static setHashFragment(input: string) {
        history.replaceState(undefined, undefined, input); 
    }

    // https://stackoverflow.com/questions/11588482/how-can-i-replace-a-windows-url-hash-with-another-response
    static setDataAsHashFragment(data: localStorageDataType) {
        //, JSON.stringify(data)); 
    }

    // https://stackoverflow.com/questions/1397329/how-to-remove-the-hash-from-window-location-url-with-javascript-without-page-r
    static resetHashFragment(): void {
        history.pushState("", document.title, window.location.pathname + window.location.search);
    }

}