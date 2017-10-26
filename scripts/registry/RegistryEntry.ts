import IViewModel from "../viewmodels/IViewModel";
import {interfaces} from "inversify";
import {ObservableControllerFactory} from "../observable/ObservableController";

class RegistryEntry<T = any> {

    constructor(public construct: interfaces.Newable<IViewModel<T>>, public id?: string,
                public source?: ObservableControllerFactory<any>, public parameters?: string) {
    }
}

export default RegistryEntry
