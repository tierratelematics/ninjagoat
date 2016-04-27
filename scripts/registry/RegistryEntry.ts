import IViewModel from "../viewmodels/IViewModel";
import ViewModelContext from "../registry/ViewModelContext";
import {INewable} from "inversify";

class RegistryEntry<T> {

    constructor(public constructor: INewable<IViewModel<T>>,
        public id: string,
        public observableFactory: (context: ViewModelContext) => Rx.IObservable<T>,
        public parameters: string) {
    }
}

export default RegistryEntry;
