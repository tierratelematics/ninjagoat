interface IServiceLocator {
    get<T>(key: string): T;
}

export default IServiceLocator