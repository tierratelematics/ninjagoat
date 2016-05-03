import IContextFactory from "./IContextFactory";
import View from "../views/View";
import IViewModel from "../viewmodels/IViewModel";
import IUriResolver from "../navigation/IUriResolver";
import IViewResolver from "../views/IViewResolver";
import {inject, injectable} from "inversify";
import IViewModelFactory from "../viewmodels/IViewModelFactory";
import * as _ from "lodash";

@injectable()
class ContextFactory implements IContextFactory {

    constructor(
        @inject("IUriResolver") private uriResolver: IUriResolver,
        @inject("IViewResolver") private viewResolver: IViewResolver,
        @inject("IViewModelFactory") private viewModelFactory: IViewModelFactory) {
    }

    contextFor<T extends IViewModel<any>>(uri: string, parameters?: any): { view: View<T>, viewmodel: T } {
        let context = this.uriResolver.resolve<T>(uri);
        let view = this.viewResolver.resolve<T>(context.area, context.viewmodel.id);
        let contextParameters = _.assign({}, parameters, this.getQueryParams(uri));
        return { view: view, viewmodel: this.viewModelFactory.create<T>(context.viewmodel, contextParameters) };
    }

    protected getQueryParams(uri:string):{} {
        let query = uri.split("?")[1];
        if (!query)
            return {};
        let parameters = query.split("&"),
            values = _.map(parameters, function (value) {
                var parts = value.split("=");
                return {
                    key: parts[0],
                    value: parts[1]
                };
            });
        return _.zipObject(_.map(values, 'key'), _.map(values, 'value'));
    }
}

export default ContextFactory;
