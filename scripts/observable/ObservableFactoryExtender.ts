import {IViewModelFactoryExtender} from "../viewmodels/ViewModelFactory";
import ViewModelContext from "../registry/ViewModelContext";
import {injectable} from "inversify";
import {ObservableController} from "./ObservableController";

@injectable()
class ObservableFactoryExtender implements IViewModelFactoryExtender {

    extend<T>(viewmodel: T, context: ViewModelContext, source: ObservableController<T>) {
        let vm = <any>viewmodel;
        if (vm.observe) vm.observe(source.model);
    }
}

export default ObservableFactoryExtender;
