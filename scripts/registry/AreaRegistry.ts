import RegistryEntry from "./RegistryEntry";
import IViewModel from "../viewmodels/IViewModel";

class AreaRegistry {
    constructor(public area: string, public entries: RegistryEntry<IViewModel<any>>[]) { }
}

export default AreaRegistry;
