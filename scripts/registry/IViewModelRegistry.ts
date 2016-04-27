import RegistryEntry from "./RegistryEntry";
import AreaRegistry from "./AreaRegistry";
import IViewModel from "../viewmodels/IViewModel";
import ViewModelContext from "../registry/ViewModelContext";
import {INewable} from "inversify";
import * as Rx from "rx";

interface IViewModelRegistry {
    root<T>(construct: INewable<IViewModel<T>>, observable?: (context: ViewModelContext) => Rx.IObservable<T>, parameters?: string): AreaRegistry;
    add<T>(construct: INewable<IViewModel<T>>, observable?: (context: ViewModelContext) => Rx.IObservable<T>, parameters?: string): IViewModelRegistry;
    forArea(area: string): AreaRegistry;
    getArea(areaId: string): AreaRegistry;
    getAreas(): AreaRegistry[];
    getEntry<T>(area: string, id: string): RegistryEntry<T>;
}

export default IViewModelRegistry;
