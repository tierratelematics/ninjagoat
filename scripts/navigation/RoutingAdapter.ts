import IRoutingAdapter from "./IRoutingAdapter";
import IViewModelRegistry from "../registry/IViewModelRegistry";
import AreaRegistry from "../registry/AreaRegistry";
import * as _ from "lodash";
import {inject, injectable} from "inversify";
import * as Area from "../registry/Area";
import IComponentFactory from "../components/IComponentFactory";
import {PlainRoute} from "react-router";
import {RouterState} from "react-router";
import {RedirectFunction} from "react-router";
import IRouteStrategy from "./IRouteStrategy";
import RegistryEntry from "../registry/RegistryEntry";

@injectable()
class RoutingAdapter implements IRoutingAdapter {

    constructor(@inject("IViewModelRegistry") private registry:IViewModelRegistry,
                @inject("IComponentFactory") private componentFactory:IComponentFactory,
                @inject("IRouteStrategy") private routeStrategy:IRouteStrategy) {
    }

    routes():PlainRoute {
        let areas = this.registry.getAreas(),
            routes = this.getRoutes(areas);
        if (this.registry.getArea(Area.NotFound)) //If there's a 404 handler
            routes.push({
                path: "*",
                component: this.componentFactory.componentForNotFound()
            });
        return {
            childRoutes: routes,
            component: this.componentFactory.componentForMaster(),
            indexRoute: {component: this.componentFactory.componentForUri("/")},
            path: "/",
            onEnter: (nextState:RouterState, replace:RedirectFunction, callback: Function) => {
                this.handleOnEnter(this.registry.getArea("Index").entries[0], nextState, replace, callback);
            }
        };
    }

    private getRoutes(areas:AreaRegistry[]):PlainRoute[] {
        return <PlainRoute[]>_(areas)
            .filter(area => !_.includes([Area.Index, Area.Master, Area.NotFound], area.area))
            .reduce((routes, area) => {
                routes.push(this.getRoutesForArea(area));
                return _.flatten(routes);
            }, [])
            .valueOf();
    }

    private getRoutesForArea(area:AreaRegistry):{}[] {
        return <PlainRoute[]>_(area.entries)
            .reduce((routes, entry) => {
                let id = entry.id.indexOf(Area.Index) > -1 ? "" : entry.id.toLowerCase(),
                    parameters = entry.parameters || "",
                    route = area.area.toLowerCase();
                if (id) route += "/" + id;
                if (parameters) route += "/" + parameters;
                routes.push({
                    component: this.componentFactory.componentForUri(route),
                    path: route,
                    onEnter: (nextState:RouterState, replace:RedirectFunction, callback: Function) => {
                        this.handleOnEnter(entry, nextState, replace, callback);
                    }
                });
                return routes;
            }, [])
            .valueOf();
    }

    private handleOnEnter(entry: RegistryEntry<any>, nextState:RouterState, replace:RedirectFunction, callback: Function) {
        this.routeStrategy.enter(entry,  nextState).then(url => {
            if (url) replace(url);
        }).then(() => callback());
    }
}

export default RoutingAdapter;
