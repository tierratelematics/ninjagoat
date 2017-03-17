import IViewModelFactory from "./IViewModelFactory";
import {injectable, inject, interfaces} from "inversify";
import IObjectContainer from "../ioc/IObjectContainer";
import ObservableViewModel from "./ObservableViewModel";
import ViewModelContext from "../registry/ViewModelContext";
import IViewModel from "./IViewModel";
import {IObservable} from "rx";

@injectable()
class ViewModelFactory implements IViewModelFactory {

    constructor(@inject("IObjectContainer") private container: IObjectContainer) {
    }

    create<T extends IViewModel<T>>(context: ViewModelContext, construct: interfaces.Newable<IViewModel<T>>,
                                      observableFactory: (context: ViewModelContext) => IObservable<T>): T {
        const key = `ninjagoat:viewmodels:${context.area}:${context.viewmodelId}`;
        if (!this.container.contains(key))
            this.container.set(key, construct);

        let viewModel = this.container.get<T>(key);
        if (viewModel instanceof ObservableViewModel)
            (<any>viewModel).observe(observableFactory(context));

        return viewModel;
    }
}

export default ViewModelFactory;
