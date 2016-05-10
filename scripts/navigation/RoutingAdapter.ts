import IRoutingAdapter from "./IRoutingAdapter";
import IViewModelRegistry from "../registry/IViewModelRegistry";
import AreaRegistry from "../registry/AreaRegistry";
import * as _ from "lodash";
import * as path from "path";
import {inject, injectable} from "inversify";
import * as Area from "../constants/Area";
import IComponentFactory from "../components/IComponentFactory";
import {PlainRoute} from "react-router";

@injectable()
class RoutingAdapter implements IRoutingAdapter {

    constructor(@inject("IViewModelRegistry") private registry:IViewModelRegistry,
                @inject("IComponentFactory") private componentFactory:IComponentFactory) {
    }

    routes():PlainRoute {
        let areas = this.registry.getAreas();
        return {
            childRoutes: this.getRoutes(areas),
            component: this.componentFactory.componentForMaster(),
            indexRoute: {component: this.componentFactory.componentForUri("/")},
            path: "/"
        };
    }

    private getRoutes(areas:AreaRegistry[]):PlainRoute[] {
        return <PlainRoute[]>_(areas)
            .filter(area => !_.includes([Area.Index, Area.Master], area.area))
            .reduce((routes, area) => _.flatten(this.getRoutesForArea(area)), [])
            .valueOf();
    }

    private getRoutesForArea(area:AreaRegistry):{}[] {
        return <PlainRoute[]>_(area.entries)
            .reduce((routes, entry) => {
                let id = entry.id.indexOf(Area.Index) > -1 ? "" : entry.id.toLowerCase(),
                    route = path.join(area.area.toLowerCase(), id, entry.parameters || "");
                routes.push({
                    component: this.componentFactory.componentForUri(route),
                    path: route
                });
                return routes;
            }, [])
            .valueOf();
    }
}

export default RoutingAdapter;
