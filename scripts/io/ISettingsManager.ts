interface ISettingsManager {
    getValue<T>(key:string, fallback?:T):T;
    setValue<T>(key:string, value:T):void;
    removeValue(key:string):void;
    clear():void;
}

export default ISettingsManager