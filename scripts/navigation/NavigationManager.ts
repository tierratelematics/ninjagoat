import INavigationManager from "./INavigationManager";
import ILocationHandler from "./ILocationHandler";
import {IViewModelRegistry} from "../registry/IViewModelRegistry";
import * as _ from "lodash";
import * as Area from "../registry/Area";
import Dictionary from "../util/Dictionary";
import {injectable, inject} from "inversify";
import { IRouterConfig } from "../navigation/IRouterConfig";

@injectable()
class NavigationManager implements INavigationManager {

    constructor(@inject("ILocationHandler") private locationHandler:ILocationHandler,
                @inject("IViewModelRegistry") private registry:IViewModelRegistry,
                @inject("IRouterConfig") private routerConfig: IRouterConfig) {
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
        const basenameWithArea = `${this.routerConfig.basename}${area}`;
        if (!viewmodelId) {
            return `${basenameWithArea}`;
        } else {
            viewmodelId = viewmodelId.toLowerCase();
            if (!parameters)
                return `${basenameWithArea}/${viewmodelId}`;
            else {
                let entry = this.registry.getEntry(area, viewmodelId),
                    params = this.substituteParamsForPath(entry, parameters);
                return `${basenameWithArea}/${viewmodelId}/${params}`;
            }
        }
    }

    private substituteParamsForPath(entry, parameters:Dictionary<any>):string {
        let path = entry.viewmodel.parameters,
            pathParts = path.split("/");
        _.forEach(pathParts, value => {
            path = path.replace(value, parameters[value.replace(/(\(|\)|:)/gi, "")] || "");
        });
        return path.replace(/\/{2,}/g, "/");
    }
}

export default NavigationManager;
