import IObservableFactory from "./IObservableFactory";
import {injectable} from "inversify";

@injectable()
class ObservableFactory implements IObservableFactory {

    private observables: {} = {};

    register<T>(viewmodelId: string, factory: (parameters: any) => Rx.IObservable<T>): void {
        this.observables[viewmodelId] = factory;
    }

    get<T>(viewmodelId: string, parameters?: any): Rx.IObservable<T> {
        return this.observables[viewmodelId](parameters);
    }

}

export default ObservableFactory;
