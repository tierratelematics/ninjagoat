import "bluebird";
import "reflect-metadata";
import {Kernel} from "inversify";
import IModule from "./components/IModule";
import IViewModelRegistry from "./registry/IViewModelRegistry";
import * as _ from "lodash";
import IRoutingAdapter from "./navigation/IRoutingAdapter";
import * as React from "react";
import {render} from "react-dom";
import {Router, browserHistory} from "react-router"
import NinjaGoatModule from "./components/NinjaGoatModule";

class Application {

    private kernel = new Kernel();
    private modules: IModule[] = [];

    constructor() {
        this.register(new NinjaGoatModule());
    }

    register(module: IModule) {
        this.kernel.load(module.modules);
        this.modules.push(module);
    }

    run(overrides?: any) {
        let registry = this.kernel.get<IViewModelRegistry>("IViewModelRegistry"),
            routingAdapter = this.kernel.get<IRoutingAdapter>("IRoutingAdapter");
        _.forEach(this.modules, (module: IModule) => module.register(registry, overrides));
        render(React.createElement(Router, {
            history: browserHistory,
            routes: routingAdapter.routes()
        }), document.getElementById("root"));
    }
}

export default Application;
