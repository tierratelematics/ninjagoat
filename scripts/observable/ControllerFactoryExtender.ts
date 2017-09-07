import {IViewModelFactoryExtender} from "../viewmodels/ViewModelFactory";
import ViewModelContext from "../registry/ViewModelContext";
import {Observable} from "rx";
import {injectable} from "inversify";

@injectable()
class ControllerFactoryExtender implements IViewModelFactoryExtender {

    extend<T>(viewmodel: T, context: ViewModelContext, source: Observable<T>) {

    }
}

export default ControllerFactoryExtender
