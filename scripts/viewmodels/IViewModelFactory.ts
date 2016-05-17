import RegistryEntry from "../registry/RegistryEntry";

interface IViewModelFactory {
    create<T>(context: { area: string, viewmodel: RegistryEntry<T> }, parameters?: any): T;
}

export default IViewModelFactory;
