import INavigationManager from "./INavigationManager";
import ILocationHandler from "./ILocationHandler";
import IViewModelRegistry from "../registry/IViewModelRegistry";
import * as _ from "lodash";
import * as Area from "../constants/Area";
import Dictionary from "../util/Dictionary";

class NavigationManager implements INavigationManager {

    constructor(private locationHandler: ILocationHandler, private registry: IViewModelRegistry) {
    }

    navigate(area: string, viewmodelId?: string, parameters?: Dictionary<any>): void {
        if (area === Area.Index) area = "";
        area = area.toLowerCase();
        if (!viewmodelId) {
            this.locationHandler.changeLocation(`/${area}`);
        } else {
            viewmodelId = viewmodelId.toLowerCase();
            if (!parameters)
                this.locationHandler.changeLocation(`/${area}/${viewmodelId}`);
            else {
                let entry = this.registry.getEntry(area, viewmodelId),
                    params = this.substituteParamsForPath(entry, parameters);
                this.locationHandler.changeLocation(`/${area}/${viewmodelId}/${params}`);
            }
        }
    }

    private substituteParamsForPath(entry, parameters: Dictionary<any>): string {
        let path = entry.parameters;
        _.forEach(parameters, (value, key) => {
            path = path.replace(":" + key, value);
        });
        return path;
    }
}

export default NavigationManager;
