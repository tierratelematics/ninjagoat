import IViewModel from "../viewmodels/IViewModel";
import ViewModelContext from "../registry/ViewModelContext";
import {interfaces} from "inversify";
import * as Rx from "rx";

class RegistryEntry<T> {

    construct: interfaces.Newable<IViewModel<T>>;
    id: string;
    observableFactory: (context: ViewModelContext) => Rx.IObservable<T>;
    parameters?: string;
    notify?: (parameters: any) => string;

    constructor(construct: interfaces.Newable<IViewModel<T>>, id: string,
                observableFactory: (context: ViewModelContext) => Rx.IObservable<T>, parameters?: string) {
        this.construct = construct;
        this.id = id;
        this.observableFactory = observableFactory;
        this.parameters = parameters;
    }
}

export default RegistryEntry;
