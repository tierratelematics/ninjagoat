import IViewResolver from "./IViewResolver";
import View from "./View";
import IViewModel from "../viewmodels/IViewModel";
import {inject, injectable} from "inversify";
import * as Area from "../config/Area";

@injectable()
class ViewResolver implements IViewResolver {

    constructor(@inject("Views") private views:{[index:string]:any}) {
    }

    resolve<T extends IViewModel<T>>(area:string, viewmodelId?:string):View<T> {
        area = area[0].toUpperCase() + area.slice(1);
        let viewsForArea = this.views[area];
        if (area === Area.Index || area === Area.Master)
            return viewsForArea;
        if (!viewsForArea) return null;
        if (!viewmodelId)
            return viewsForArea.Index || viewsForArea[`${area}${Area.Index}`];
        else
            return viewsForArea[viewmodelId];
    }
}

export default ViewResolver;
