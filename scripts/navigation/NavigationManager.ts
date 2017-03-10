import INavigationManager from "./INavigationManager";
import ILocationHandler from "./ILocationHandler";
import IViewModelRegistry from "../registry/IViewModelRegistry";
import * as _ from "lodash";
import * as Area from "../registry/Area";
import Dictionary from "../util/Dictionary";
import {injectable, inject} from "inversify";

@injectable()
class NavigationManager implements INavigationManager {

    constructor(@inject("ILocationHandler") private locationHandler:ILocationHandler,
                @inject("IViewModelRegistry") private registry:IViewModelRegistry) {
    }

    navigate(area:string, viewmodelId?:string, parameters?:Dictionary<any>):void {
        this.locationHandler.changeLocation(this.getNavigationPath(area, viewmodelId, parameters));
    }

    replace(area:string, viewmodelId?:string, parameters?:Dictionary<any>):void {
        this.locationHandler.replaceLocation(this.getNavigationPath(area, viewmodelId, parameters));
    }

    getNavigationPath(area:string, viewmodelId?:string, parameters?:Dictionary<any>):string {
        if (area === Area.Index) area = "";
        area = area.toLowerCase();
        if (!viewmodelId) {
            return `/${area}`;
        } else {
            viewmodelId = viewmodelId.toLowerCase();
            if (!parameters)
                return `/${area}/${viewmodelId}`;
            else {
                let entry = this.registry.getEntry(area, viewmodelId),
                    params = this.substituteParamsForPath(entry, parameters);
                return `/${area}/${viewmodelId}/${params}`;
            }
        }
    }

    private substituteParamsForPath(entry, parameters:Dictionary<any>):string {
        let path = entry.viewmodel.parameters,
            pathParts = path.split("/");
        _.forEach(pathParts, value => {
            path = path.replace(value, parameters[value.replace(/(\(|\)|:)/gi, "")] || "");
        });
        return path;
    }
}

export default NavigationManager;
