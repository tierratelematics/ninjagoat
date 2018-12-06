import IContextFactory from "./IContextFactory";
import View from "../views/View";
import IViewModel from "../viewmodels/IViewModel";
import IUriResolver from "../navigation/IUriResolver";
import IViewResolver from "../views/IViewResolver";
import {inject, injectable, interfaces} from "inversify";
import * as _ from "lodash";
import ISerializer from "../io/ISerializer";
import Dictionary from "../util/Dictionary";
import ViewModelContext from "../registry/ViewModelContext";
import {IViewModelFactory} from "../viewmodels/ViewModelFactory";

@injectable()
class ContextFactory implements IContextFactory {

    constructor(@inject("IUriResolver") private uriResolver: IUriResolver,
                @inject("IViewResolver") private viewResolver: IViewResolver,
                @inject("IViewModelFactory") private viewModelFactory: IViewModelFactory,
                @inject("QuerySerializer") private serializer: ISerializer<Dictionary<string>, string>) {
    }

    async contextFor<T extends IViewModel<any>>(uri: string, parameters?: any): Promise<{ view: interfaces.Newable<View<T>>, viewmodel: T }> {
        let context = this.uriResolver.resolve<T>(uri);
        let view = await this.viewResolver.resolve<T>(context.area, context.viewmodel.id);
        let contextParameters = _.assign({}, parameters, this.serializer.deserialize(uri.split("?")[1]));
        let viewModelContext = new ViewModelContext(context.area, context.viewmodel.id, contextParameters);
        let viewModel = context.viewmodel;
        return {
            view: view,
            viewmodel: this.viewModelFactory.create<T>(viewModelContext, <interfaces.Newable<T>>viewModel.construct, viewModel.source)
        };
    }
}

export default ContextFactory;
