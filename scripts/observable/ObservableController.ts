import {Observable} from "rx";
import ViewModelContext from "../registry/ViewModelContext";

export interface IModelController {
    refresh(parameters?: object);
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
