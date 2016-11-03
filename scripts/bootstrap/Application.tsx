import {Kernel} from "inversify";
import IModule from "./IModule";
import IViewModelRegistry from "../registry/IViewModelRegistry";
import * as _ from "lodash";
import IRoutingAdapter from "../navigation/IRoutingAdapter";
import * as React from "react";
import {render} from "react-dom";
import {Router, browserHistory} from "react-router"
import NinjaGoatModule from "./NinjaGoatModule";
import ILocationListener from "../navigation/ILocationListener";
import FeatureValidator from "../feature-toggle/FeatureValidator";

class Application {

    protected kernel = new Kernel();
    private modules:IModule[] = [];
    private routingAdapter:IRoutingAdapter;
    private featureValidator = new FeatureValidator();

    constructor() {
        this.register(new NinjaGoatModule());
    }

    register(module:IModule):boolean {
        if (!this.featureValidator.canValidate(module.constructor) || this.featureValidator.validate(module.constructor)) {
            if (module.modules)
                module.modules(this.kernel);
            this.modules.push(module);
            return true;
        }
        return false;
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
        let locationListener = this.kernel.get<ILocationListener>("ILocationListener");
        browserHistory.listen(event => locationListener.pushLocation(event.pathname));
        return <Router history={browserHistory} routes={this.routingAdapter.routes()}/>
    }
}

export default Application;
