import {interfaces} from "inversify";
import IViewModel from "../viewmodels/IViewModel";
import RegistryEntry from "./RegistryEntry";
import {ObservableControllerFactory} from "../observable/ObservableController";

export class Screen {

    static forViewModel<T>(construct: interfaces.Newable<IViewModel<T>>): ScreenEntry<T> {
        return new ScreenEntry(construct);
    }
}

export class ScreenEntry<T = any> extends RegistryEntry<T> {

    usingController(controller: ObservableControllerFactory<T>): ScreenEntry<T> {
        this.source = controller;
        return this;
    }

    withParameters(parameters: string): ScreenEntry<T> {
        this.parameters = parameters;
        return this;
    }
}
