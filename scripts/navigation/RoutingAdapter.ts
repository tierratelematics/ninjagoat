import IRoutingAdapter from "./IRoutingAdapter";
import IViewModelRegistry from "../registry/IViewModelRegistry";
import AreaRegistry from "../registry/AreaRegistry";
import * as _ from "lodash";
import * as path from "path";
import {RouteConfig, PlainRoute} from "react-router";
import {inject, injectable} from "inversify";
import * as Area from "../constants/Area";
import IComponentFactory from "../components/IComponentFactory";

@injectable()
class RoutingAdapter implements IRoutingAdapter {

    constructor(@inject("IViewModelRegistry") private registry:IViewModelRegistry,
                @inject("IComponentFactory") private componentFactory:IComponentFactory) {
    }

    routes():RouteConfig {
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
            .reduce((routes, area) => {
                let route = area.area.toLowerCase();
                routes.push({
                    component: this.componentFactory.componentForUri(route),
                    path: route
                });
                routes.push(this.getRoutesForArea(area));
                return _.flatten(routes);
            }, [])
            .valueOf();
    }

    private getRoutesForArea(area:AreaRegistry):PlainRoute[] {
        return <PlainRoute[]>_(area.entries)
            .filter(entry => !_.includes([Area.Index, Area.Master, area.area + Area.Index], entry.id))
            .reduce((routes, entry) => {
                let route = path.join(area.area.toLowerCase(), entry.id.toLowerCase(), entry.parameters || "");
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
