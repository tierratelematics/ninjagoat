import {injectable} from "inversify";
import {hasIn} from "lodash";
import {IViewModelFactoryExtender} from "../viewmodels/ViewModelFactory";
import ViewModelContext from "../registry/ViewModelContext";
import {ObservableController} from "./ObservableController";


@injectable()
class ControllerFactoryExtender implements IViewModelFactoryExtender {

    extend<T>(viewmodel: T, context: ViewModelContext, source: ObservableController<T>) {
        let vm = <any>viewmodel;
        if (vm.onControllerReceived && hasIn(source, "refresh"))
            vm.onControllerReceived(source);
    }
}

export default ControllerFactoryExtender;
