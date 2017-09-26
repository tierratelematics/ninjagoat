import IViewModel from "../viewmodels/IViewModel";
import {interfaces} from "inversify";
import {ObservableOrControllerFactory} from "./IViewModelRegistry";

class RegistryEntry<T = any> {

    notify?: (parameters: any) => string;

    constructor(public construct: interfaces.Newable<IViewModel<T>>, public id?: string,
                public source?: ObservableOrControllerFactory<any>, public parameters?: string) {
    }
}

export default RegistryEntry
