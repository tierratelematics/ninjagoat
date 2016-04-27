import IViewResolver from "./IViewResolver";
import View from "./View";
import IViewModel from "../viewmodels/IViewModel";
import {inject, injectable} from "inversify";

@injectable()
class ViewResolver implements IViewResolver {

    constructor( @inject("Views") private views: {}) {
    }

    resolve<T extends IViewModel<T>>(area: string, viewmodelId?: string): View<T> {
        if (area === "Index")
            return this.views["Index"];
        if (!viewmodelId)
            return this.views[area].Index || this.views[area][`${area}Index`];
        else
            return this.views[area][viewmodelId];
    }
}
export default ViewResolver;
