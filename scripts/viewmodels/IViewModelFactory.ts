import IViewModel from "./IViewModel";
import ViewModelContext from "../registry/ViewModelContext";
import {interfaces} from "inversify";
import {IObservable} from "rx";

interface IViewModelFactory {
    create<T extends IViewModel<T>>(context: ViewModelContext, construct: interfaces.Newable<IViewModel<T>>,
                                      observableFactory: (context: ViewModelContext) => IObservable<T>): T;
}

export default IViewModelFactory;
