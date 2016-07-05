import {Kernel} from "inversify";
import IModule from "./IModule";
import IViewModelRegistry from "../registry/IViewModelRegistry";
import * as _ from "lodash";
import IRoutingAdapter from "../navigation/IRoutingAdapter";
import * as React from "react";
import {render} from "react-dom";
import {Router, browserHistory} from "react-router"
import NinjaGoatModule from "./NinjaGoatModule";

class Application {

    protected kernel = new Kernel();
    private modules:IModule[] = [];
    private routingAdapter:IRoutingAdapter;

    constructor() {
        this.register(new NinjaGoatModule());
    }

    register(module:IModule) {
        this.kernel.load(module.modules);
        this.modules.push(module);
    }

    run(overrides?:any) {
        this.boot(overrides);
        render(this.rootComponent(), document.getElementById("root"));
    }

    boot(overrides?:any) {
        let registry = this.kernel.get<IViewModelRegistry>("IViewModelRegistry");
        this.routingAdapter = this.kernel.get<IRoutingAdapter>("IRoutingAdapter");
        _.forEach(this.modules, (module:IModule) => module.register(registry, this.kernel, overrides));
    }

    protected rootComponent():React.ReactElement<any> {
        return <Router history={browserHistory} routes={this.routingAdapter.routes()}/>
    }
}

export default Application;
