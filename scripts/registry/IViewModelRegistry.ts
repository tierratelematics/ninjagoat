import RegistryEntry from "./RegistryEntry";
import AreaRegistry from "./AreaRegistry";
import IViewModel from "../viewmodels/IViewModel";
import {interfaces} from "inversify";
import {ObservableFactory} from "../observable/ObservableFactory";
import {Observable} from "rx";
import {ObservableController, ObservableControllerFactory} from "../observable/ObservableController";

export type ObservableOrController<T> = Observable<T> | ObservableController<T>;

export type ObservableOrControllerFactory<T> = ObservableFactory<T> | ObservableControllerFactory<T>;

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

    getEntry<T>(area: string, id: string): { area: string, viewmodel: RegistryEntry<T> };

    getEntry<T>(construct: Function): { area: string, viewmodel: RegistryEntry<T> };
}

export interface IViewModelRegistry extends IViewModelRegistryGetter, IViewModelRegistrySetter {

}
