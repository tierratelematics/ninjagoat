interface ISettingsManager {
    getValue<T>(key:string, fallback?:T):T;
    setValue<T>(key:string, value:T):void;
}

export default ISettingsManager