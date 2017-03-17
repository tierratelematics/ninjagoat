import View from "./View";
import IViewModel from "../viewmodels/IViewModel";
import {interfaces} from "inversify";

interface IViewResolver {
    resolve<T extends IViewModel<T>>(area: string, viewmodelId?: string): interfaces.Newable<View<T>>;
}

export default IViewResolver;
