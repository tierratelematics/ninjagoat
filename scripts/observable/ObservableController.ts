import {Observable} from "rx";

export interface IModelController {
    refresh(parameters?: object);
}

export interface ObservableController<T> extends IModelController {
    model: Observable<T>;
}

export type ObservableOrController<T> = Observable<T> | ObservableController<T>;
