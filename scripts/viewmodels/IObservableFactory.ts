import * as Rx from "rx";

interface IObservableFactory {
    register<T>(viewmodelId: string, factory: (parameters: any) => Rx.IObservable<T>): void;
    get<T>(viewmodelId: string, parameters?: any): Rx.IObservable<T>;
}

export default IObservableFactory;
