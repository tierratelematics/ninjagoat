import RegistryEntry from "../registry/RegistryEntry";

interface IViewModelFactory {
    create<T>(context: RegistryEntry<T>, parameters?: any): T;
}

export default IViewModelFactory;
