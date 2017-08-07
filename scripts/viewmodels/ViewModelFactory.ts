import {injectable, inject, interfaces, multiInject} from "inversify";
import IObjectContainer from "../ioc/IObjectContainer";
import ViewModelContext from "../registry/ViewModelContext";
import IViewModel from "./IViewModel";
import {Observable} from "rx";
import {forEach} from "lodash";

export interface IViewModelFactory {
    create<T>(context: ViewModelContext, construct: interfaces.Newable<IViewModel<T>>,
              observableFactory: (context: ViewModelContext) => Observable<T>): IViewModel<T>;
}

export interface IViewModelFactoryExtender {
    extend<T>(viewmodel: T, context: ViewModelContext, source: Observable<T>);
}

@injectable()
export class ViewModelFactory implements IViewModelFactory {

    constructor(@inject("IObjectContainer") private container: IObjectContainer,
                @multiInject("IViewModelFactoryExtender") private extenders: IViewModelFactoryExtender[]) {
    }

    create<T>(context: ViewModelContext, construct: interfaces.Newable<IViewModel<T>>,
              observableFactory: (context: ViewModelContext) => Observable<T>): IViewModel<T> {
        const key = `ninjagoat:viewmodels:${context.area}:${context.viewmodelId}`;
        if (!this.container.contains(key))
            this.container.set(key, construct);

        let viewModel = this.container.get<IViewModel<T>>(key),
            source = observableFactory(context);

        forEach(this.extenders, extender => extender.extend(viewModel, context, source));

        return viewModel;
    }
}
