import ViewModelContext from "../registry/ViewModelContext";
import {Observable} from "rx";

export interface ObservableFactory<T> {
    (context: ViewModelContext): Observable<T>;
}
