import RegistryEntry from "../registry/RegistryEntry";
import IViewModel from "./IViewModel";

interface IViewModelFactory {
    create<T extends IViewModel<any>>(context: {area: string, viewmodel: RegistryEntry<T>}, parameters?: any): T;
}

export default IViewModelFactory;
