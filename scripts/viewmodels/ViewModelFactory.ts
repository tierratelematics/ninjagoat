import IViewModelFactory from "./IViewModelFactory";
import {injectable, inject} from "inversify";
import IObjectContainer from "../components/IObjectContainer";
import ObservableViewModel from "./ObservableViewModel";
import RegistryEntry from "../registry/RegistryEntry";
import ViewModelContext from "../registry/ViewModelContext";

@injectable()
class ViewModelFactory implements IViewModelFactory {

    constructor( @inject("IObjectContainer") private container: IObjectContainer) { }

    create<T>(context: RegistryEntry<T>, parameters?: any): T {
        const key = `ninjagoat:viewmodels:${context.id}`;
        if (!this.container.contains(key))
            this.container.set(key, context.construct);

        let viewModel = this.container.get<T>(key);
        if (viewModel instanceof ObservableViewModel)
            (<any>viewModel).observe(context.observableFactory(new ViewModelContext(context.id, parameters)));

        return viewModel;
    }
}

export default ViewModelFactory;
