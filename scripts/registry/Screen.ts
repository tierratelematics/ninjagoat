import {interfaces} from "inversify";
import IViewModel from "../viewmodels/IViewModel";
import RegistryEntry from "./RegistryEntry";
import {ObservableControllerFactory} from "../observable/ObservableController";

export class Screen {

    static withViewModel<T>(construct: interfaces.Newable<IViewModel<T>>): IScreen<T> {
        return new ScreenEntry(construct);
    }
}

export interface IScreen<T> {
    addController(controller: ObservableControllerFactory<T>): IScreen<T>;

    withParameters(parameters: string): IScreen<T>;
}

export class ScreenEntry<T = any> extends RegistryEntry<T> implements IScreen<T> {

    addController(controller: ObservableControllerFactory<T>): IScreen<T> {
        this.observableFactory = controller;
        return this;
    }

    withParameters(parameters: string): IScreen<T> {
        this.parameters = parameters;
        return this;
    }
}
