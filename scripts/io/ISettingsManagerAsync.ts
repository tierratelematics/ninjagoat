interface ISettingsManagerAsync {
    getValueAsync<T>(key:string, fallback?:T):Promise<T>;
    setValueAsync<T>(key:string, value:T):Promise<void>;
}

export default ISettingsManagerAsync