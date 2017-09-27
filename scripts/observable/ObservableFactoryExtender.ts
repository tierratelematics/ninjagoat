import {IViewModelFactoryExtender} from "../viewmodels/ViewModelFactory";
import ViewModelContext from "../registry/ViewModelContext";
import {injectable} from "inversify";
import {ObservableOrController} from "../registry/IViewModelRegistry";

@injectable()
class ObservableFactoryExtender implements IViewModelFactoryExtender {

    extend<T>(viewmodel: T, context: ViewModelContext, source: ObservableOrController<T>) {
        let vm = <any>viewmodel;
        if (!vm.observe) return;
        if (source.refresh)
            vm.observe(source.model);
        else
            vm.observe(source);
    }
}

export default ObservableFactoryExtender
