import IObservableFactory from "./IObservableFactory";
import {injectable} from "inversify";
import * as Rx from "rx";

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
