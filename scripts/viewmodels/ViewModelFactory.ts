import IViewModelFactory from "./IViewModelFactory";
import {injectable, inject} from "inversify";
import IObjectContainer from "../ioc/IObjectContainer";
import ObservableViewModel from "./ObservableViewModel";
import RegistryEntry from "../registry/RegistryEntry";
import ViewModelContext from "../registry/ViewModelContext";
import IViewModel from "./IViewModel";

@injectable()
class ViewModelFactory implements IViewModelFactory {

    constructor(@inject("IObjectContainer") private container: IObjectContainer) {
    }

    create<T extends IViewModel<any>>(context: {area: string, viewmodel: RegistryEntry<T>}, parameters?: any): T {
        const key = `ninjagoat:viewmodels:${context.area}:${context.viewmodel.id}`;
        if (!this.container.contains(key))
            this.container.set(key, context.viewmodel.construct);

        let viewModel = this.container.get<T>(key);
        if (viewModel instanceof ObservableViewModel)
            (<any>viewModel).observe(
                context.viewmodel.observableFactory(new ViewModelContext(context.area, context.viewmodel.id, parameters)));

        return viewModel;
    }
}

export default ViewModelFactory;
