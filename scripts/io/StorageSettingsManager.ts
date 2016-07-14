import ISettingsManager from "./ISettingsManager";

class StorageSettingsManager implements ISettingsManager {

    getValue<T>(key:string, fallback?:T):T {
        return JSON.parse(window.localStorage.getItem(key)) || fallback;
    }

    setValue<T>(key:string, value:T):void {
        window.localStorage.setItem(key, JSON.stringify(value));
    }

}

export default StorageSettingsManager