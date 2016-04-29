import INavigationManager from "./INavigationManager";
import ILocationHandler from "./ILocationHandler";
import IViewModelRegistry from "../registry/IViewModelRegistry";
import * as _ from "lodash";
import Dictionary = _.Dictionary;
import * as Area from "../constants/Area";

class NavigationManager implements INavigationManager {

    constructor(private locationHandler: ILocationHandler, private registry: IViewModelRegistry) {
    }

    navigate(area: string, viewmodelId?: string, parameters?: {}): void {
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

    private substituteParamsForPath(entry, parameters: {}): string {
        let path = entry.parameters;
        _.forEach(<Dictionary<any>>parameters, (value, key) => {
            path = path.replace(":" + key, value);
        });
        return path;
    }
}

export default NavigationManager;
