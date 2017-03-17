import IViewResolver from "./IViewResolver";
import View from "./View";
import IViewModel from "../viewmodels/IViewModel";
import {inject, injectable, interfaces} from "inversify";
import * as Area from "../registry/Area";

@injectable()
class ViewResolver implements IViewResolver {

    constructor(@inject("Views") private views:{[index:string]:any}) {
    }

    resolve<T extends IViewModel<T>>(area:string, viewmodelId?:string):interfaces.Newable<View<T>> {
        area = area[0].toUpperCase() + area.slice(1);
        let viewsForArea = this.views[area];
        if (area === Area.Index || area === Area.Master || area === Area.NotFound)
            return viewsForArea;
        if (!viewsForArea) return null;
        if (!viewmodelId)
            return viewsForArea.Index || viewsForArea[`${area}${Area.Index}`];
        else
            return viewsForArea[viewmodelId];
    }
}

export default ViewResolver;
