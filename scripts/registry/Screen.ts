import {interfaces} from "inversify";
import IViewModel from "../viewmodels/IViewModel";
import RegistryEntry from "./RegistryEntry";
import {ObservableControllerFactory} from "../observable/ObservableController";

export class Screen {

    static withViewModel<T>(construct: interfaces.Newable<IViewModel<T>>): IScreenController<T> {
        return new ScreenEntry(construct);
    }
}

export interface IScreenController<T> {
    addController(controller: ObservableControllerFactory<T>): IScreenParameters;
}

export interface IScreenParameters {
    withParameters(parameters: string);
}

export class ScreenEntry<T = any> extends RegistryEntry<T> implements IScreenController<T>, IScreenParameters {

    addController(controller: ObservableControllerFactory<T>): IScreenParameters {
        this.observableFactory = controller;
        return this;
    }

    withParameters(parameters: string) {
        this.parameters = parameters;
        return this;
    }
}
