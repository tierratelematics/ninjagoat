import IViewResolver from "./IViewResolver";
import View from "./View";
import IViewModel from "../viewmodels/IViewModel";
import {inject, injectable, interfaces} from "inversify";
import * as Area from "../registry/Area";

@injectable()
class ViewResolver implements IViewResolver {

    constructor(@inject("Views") private views:{[index:string]:any}) {
    }

    async resolve<T extends IViewModel<any>>(area:string, viewmodelId?:string): Promise<interfaces.Newable<View<T>>> {
        area = area[0].toUpperCase() + area.slice(1);
        let viewsForArea = this.views[area];
        let view: interfaces.Newable<View<T>> = null;
        if (area === Area.Index || area === Area.Master || area === Area.NotFound) {
            view = viewsForArea;
        } else if (!viewsForArea) {
            return null;
        } else if (!viewmodelId) {
            view = viewsForArea.Index || viewsForArea[`${area}${Area.Index}`];
        } else {
            view = viewsForArea[viewmodelId];
        }
        if (isPromise(view)) {
            view = await view;
            view = (view as any).default || view;
        }
        return view;
    }
}

const isPromise = (object: any) => !!object.then;

export default ViewResolver;
