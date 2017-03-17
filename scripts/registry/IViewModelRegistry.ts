import RegistryEntry from "./RegistryEntry";
import AreaRegistry from "./AreaRegistry";
import IViewModel from "../viewmodels/IViewModel";
import ViewModelContext from "../registry/ViewModelContext";
import {interfaces} from "inversify";
import * as Rx from "rx";

interface IViewModelRegistry {
    master<T>(construct: interfaces.Newable<IViewModel<T>>, observable?: (context: ViewModelContext) => Rx.IObservable<T>): AreaRegistry;
    index<T>(construct: interfaces.Newable<IViewModel<T>>, observable?: (context: ViewModelContext) => Rx.IObservable<T>): AreaRegistry;
    notFound<T>(construct: interfaces.Newable<IViewModel<T>>, observable?: (context: ViewModelContext) => Rx.IObservable<T>): AreaRegistry;
    add<T>(construct: interfaces.Newable<IViewModel<T>>, observable?: (context: ViewModelContext) => Rx.IObservable<T>, parameters?: string): IViewModelRegistry;
    forArea(area: string): AreaRegistry;
    getArea(areaId: string): AreaRegistry;
    getAreas(): AreaRegistry[];
    getEntry<T>(area: string, id: string): {area: string, viewmodel: RegistryEntry<T>};
    getEntry<T>(construct: Function): {area: string, viewmodel: RegistryEntry<T>};
}

export default IViewModelRegistry;
