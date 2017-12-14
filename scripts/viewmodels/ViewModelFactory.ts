import {injectable, inject, interfaces, multiInject, optional} from "inversify";
import IObjectContainer from "../ioc/IObjectContainer";
import ViewModelContext from "../registry/ViewModelContext";
import IViewModel from "./IViewModel";
import {forEach} from "lodash";
import {ObservableController, ObservableControllerFactory} from "../observable/ObservableController";

export interface IViewModelFactory {
    create<T extends IViewModel<any>>(context: ViewModelContext, construct: interfaces.Newable<T>,
                                    factory: ObservableControllerFactory<any>): T;
}

export interface IViewModelFactoryExtender {
    extend<T>(viewmodel: T, context: ViewModelContext, source: ObservableController<T>);
}

@injectable()
export class ViewModelFactory implements IViewModelFactory {

    constructor(@inject("IObjectContainer") private container: IObjectContainer,
                @multiInject("IViewModelFactoryExtender") @optional() private extenders: IViewModelFactoryExtender[] = []) {
    }

    create<T extends IViewModel<any>>(context: ViewModelContext, construct: interfaces.Newable<T>,
                                      factory: ObservableControllerFactory<any>): T {
        const key = `ninjagoat:viewmodels:${context.area}:${context.viewmodelId}`;
        if (!this.container.contains(key))
            this.container.set(key, construct);

        let viewModel = this.container.get<T>(key),
            source = factory(context);

        forEach(this.extenders, extender => extender.extend(viewModel, context, source));

        return viewModel;
    }
}
