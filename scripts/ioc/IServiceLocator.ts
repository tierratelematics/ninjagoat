interface IServiceLocator {
    get<T>(key: string, name?:string): T;
}

export default IServiceLocator