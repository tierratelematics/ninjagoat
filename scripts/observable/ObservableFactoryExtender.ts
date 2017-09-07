import {IViewModelFactoryExtender} from "../viewmodels/ViewModelFactory";
import ViewModelContext from "../registry/ViewModelContext";
import {Observable} from "rx";
import ObservableViewModel from "./ObservableViewModel";
import {injectable} from "inversify";

@injectable()
class ObservableFactoryExtender implements IViewModelFactoryExtender {

    extend<T>(viewmodel: T, context: ViewModelContext, source: Observable<T>) {
        if (viewmodel instanceof ObservableViewModel)
            (<any>viewmodel).observe(source);
    }
}

export default ObservableFactoryExtender
