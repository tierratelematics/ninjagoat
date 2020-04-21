import ISettingsManager from "./ISettingsManager";
import {injectable} from "inversify";
import ISettingsManagerAsync from "./ISettingsManagerAsync";

@injectable()
class StorageSettingsManager implements ISettingsManager, ISettingsManagerAsync {

    getValue<T>(key:string, fallback?:T):T {
        return JSON.parse(window.localStorage.getItem(key)) || fallback;
    }

    setValue<T>(key:string, value:T):void {
        window.localStorage.setItem(key, JSON.stringify(value));
    }

    removeValue(key:string):void {
        window.localStorage.removeItem(key);
    }

    getValueAsync<T>(key: string, fallback?: T): Promise<T> {
        return Promise.resolve(this.getValue(key, fallback));
    }

    setValueAsync<T>(key: string, value: T): Promise<void> {
        return Promise.resolve(this.setValue(key, value));
    }

    removeValueAsync(key: string): Promise<void> {
        return Promise.resolve(this.removeValue(key));
    }

    clear():void {
        window.localStorage.clear();
    }

    clearAsync(): Promise<void> {
        return Promise.resolve(this.clear());
    }
}

export default StorageSettingsManager