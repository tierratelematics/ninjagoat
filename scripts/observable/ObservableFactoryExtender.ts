import {IViewModelFactoryExtender} from "../viewmodels/ViewModelFactory";
import ViewModelContext from "../registry/ViewModelContext";
import ObservableViewModel from "./ObservableViewModel";
import {injectable} from "inversify";
import {ObservableOrController} from "../registry/IViewModelRegistry";

@injectable()
class ObservableFactoryExtender implements IViewModelFactoryExtender {

    extend<T>(viewmodel: T, context: ViewModelContext, source: ObservableOrController<T>) {
        if (!(viewmodel instanceof ObservableViewModel)) return;
        if (source.refresh)
            (<any>viewmodel).observe(source.model);
        else
            (<any>viewmodel).observe(source);
    }
}

export default ObservableFactoryExtender
