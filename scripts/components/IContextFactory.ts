import View from "../views/View";
import IViewModel from "../viewmodels/IViewModel";
import {interfaces} from "inversify";

interface IContextFactory {
    contextFor<T extends IViewModel<any>>(uri: string, parameters?: any): { view: interfaces.Newable<View<T>>, viewmodel: T };
}

export default IContextFactory;
