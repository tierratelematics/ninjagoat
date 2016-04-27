import IContextFactory from "./IContextFactory";
import View from "../views/View";
import IViewModel from "../viewmodels/IViewModel";
import IUriResolver from "../navigation/IUriResolver";
import IViewResolver from "../views/IViewResolver";
import {inject, injectable} from "inversify";
import IViewModelFactory from "../viewmodels/IViewModelFactory";

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
        return { view: view, viewmodel: this.viewModelFactory.create<T>(context.viewmodel, parameters) };
    }
}

export default ContextFactory;
