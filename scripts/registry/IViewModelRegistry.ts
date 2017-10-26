import RegistryEntry from "./RegistryEntry";
import AreaRegistry from "./AreaRegistry";

export interface IViewModelRegistrySetter {
    master<T>(entry: RegistryEntry<T>): AreaRegistry;

    index<T>(entry: RegistryEntry<T>): AreaRegistry;

    notFound<T>(entry: RegistryEntry<T>): AreaRegistry;

    add<T>(entry: RegistryEntry<T>): IViewModelRegistrySetter;

    forArea(area: string): AreaRegistry;
}

export interface IViewModelRegistryGetter {
    getArea(areaId: string): AreaRegistry;

    getAreas(): AreaRegistry[];

    getEntry<T>(area: string, id: string): { area: string, viewmodel: RegistryEntry<T> };

    getEntry<T>(construct: Function): { area: string, viewmodel: RegistryEntry<T> };
}

export interface IViewModelRegistry extends IViewModelRegistryGetter, IViewModelRegistrySetter {

}
