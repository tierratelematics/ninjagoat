import IViewModel from "../viewmodels/IViewModel";
import ViewModelContext from "../registry/ViewModelContext";
import {INewable} from "inversify";
import * as Rx from "rx";

class RegistryEntry<T> {

    constructor(public construct: INewable<IViewModel<T>>,
        public id: string,
        public observableFactory: (context: ViewModelContext) => Rx.IObservable<T>,
        public parameters: string) {
    }
}

export default RegistryEntry;
