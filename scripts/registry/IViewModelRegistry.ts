import RegistryEntry from "./RegistryEntry";
import AreaRegistry from "./AreaRegistry";
import IViewModel from "../viewmodels/IViewModel";
import ViewModelContext from "../registry/ViewModelContext";
import {interfaces} from "inversify";
import {Observable} from "rx";

export interface ObservableFactory<T> {
    (context: ViewModelContext): Observable<T>;
}

export interface IViewModelRegistrySetter {
    master<T>(construct: interfaces.Newable<IViewModel<T>>, observable?: ObservableFactory<T>): AreaRegistry;
    index<T>(construct: interfaces.Newable<IViewModel<T>>, observable?: ObservableFactory<T>): AreaRegistry;
    notFound<T>(construct: interfaces.Newable<IViewModel<T>>, observable?: ObservableFactory<T>): AreaRegistry;
    add<T>(construct: interfaces.Newable<IViewModel<T>>, observable?: ObservableFactory<T>, parameters?: string): IViewModelRegistrySetter;
    withParameters(parameters: string): IViewModelRegistrySetter;
    notifyBy(notify: (parameters: any) => string): IViewModelRegistrySetter;
    forArea(area: string): AreaRegistry;
}

export interface IViewModelRegistryGetter {
    getArea(areaId: string): AreaRegistry;
    getAreas(): AreaRegistry[];
    getEntry<T>(area: string, id: string): {area: string, viewmodel: RegistryEntry<T>};
    getEntry<T>(construct: Function): {area: string, viewmodel: RegistryEntry<T>};
}

export interface IViewModelRegistry extends IViewModelRegistryGetter, IViewModelRegistrySetter {

}
