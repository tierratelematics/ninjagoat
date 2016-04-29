import IViewResolver from "./IViewResolver";
import View from "./View";
import IViewModel from "../viewmodels/IViewModel";
import {inject, injectable} from "inversify";
import * as Area from "../constants/Area";

@injectable()
class ViewResolver implements IViewResolver {

    constructor( @inject("Views") private views: {}) {
    }

    resolve<T extends IViewModel<T>>(area: string, viewmodelId?: string): View<T> {
        if (area === Area.Index || area === Area.Master)
            return this.views[area];
        if (!viewmodelId)
            return this.views[area].Index || this.views[area][`${area}${Area.Index}`];
        else
            return this.views[area][viewmodelId];
    }
}
export default ViewResolver;
