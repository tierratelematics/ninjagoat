import {Observable, EMPTY} from "rxjs";
import ViewModelContext from "../registry/ViewModelContext";

export interface IModelController {
    refresh(parameters?: object);
    updates?(): Observable<object>; // Expose the method in order to do some actions on the observable passed to the viewmodel
}

export interface ObservableController<T> extends IModelController {
    model: Observable<T>;
}

export interface ObservableControllerFactory<T> {
    (context: ViewModelContext): ObservableController<T>;
}

export interface ControllableViewModel {
    onControllerReceived(controller: IModelController);
}

export function controllerFromObservable<T>(observable: Observable<T>): ObservableController<T> {
    return {
        model: observable,
        refresh: parameters => null,
        updates: () => EMPTY
    };
}
