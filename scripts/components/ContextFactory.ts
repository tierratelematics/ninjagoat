import IContextFactory from "./IContextFactory";
import View from "../views/View";
import IViewModel from "../viewmodels/IViewModel";
import IUriResolver from "../navigation/IUriResolver";
import IViewResolver from "../views/IViewResolver";
import {inject, injectable, interfaces} from "inversify";
import IViewModelFactory from "../viewmodels/IViewModelFactory";
import * as _ from "lodash";
import ISerializer from "../io/ISerializer";
import Dictionary from "../util/Dictionary";
import ViewModelContext from "../registry/ViewModelContext";

@injectable()
class ContextFactory implements IContextFactory {

    constructor(@inject("IUriResolver") private uriResolver: IUriResolver,
                @inject("IViewResolver") private viewResolver: IViewResolver,
                @inject("IViewModelFactory") private viewModelFactory: IViewModelFactory,
                @inject("QuerySerializer") private serializer: ISerializer<Dictionary<string>, string>) {
    }

    contextFor<T extends IViewModel<any>>(uri: string, parameters?: any): {view: interfaces.Newable<View<T>>, viewmodel: T} {
        let context = this.uriResolver.resolve<T>(uri);
        let view = this.viewResolver.resolve<T>(context.area, context.viewmodel.id);
        let contextParameters = _.assign({}, parameters, this.serializer.deserialize(uri.split("?")[1]));
        let viewModelContext = new ViewModelContext(context.area, context.viewmodel.id, contextParameters);
        let viewModel = context.viewmodel;
        return {
            view: view,
            viewmodel: this.viewModelFactory.create<T>(viewModelContext, viewModel.construct, viewModel.observableFactory)
        };
    }
}

export default ContextFactory;
