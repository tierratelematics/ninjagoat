import RegistryEntry from "../registry/RegistryEntry";

interface IUriResolver {
    resolve<T>(uri: string): { area: string, viewmodel: RegistryEntry<T> };
}

export default IUriResolver;
