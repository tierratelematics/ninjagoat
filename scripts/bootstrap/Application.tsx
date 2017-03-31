import {Container} from "inversify";
import getDecorators from "inversify-inject-decorators";
import IModule from "./IModule";
import IViewModelRegistry from "../registry/IViewModelRegistry";
import * as _ from "lodash";
import IRoutingAdapter from "../navigation/IRoutingAdapter";
import * as React from "react";
import {render} from "react-dom";
import {Router, browserHistory} from "react-router"
import NinjaGoatModule from "./NinjaGoatModule";
import ILocationListener from "../navigation/ILocationListener";
import {IFeatureChecker, FeatureChecker} from "bivio";

let container = new Container();
export let {lazyInject} = getDecorators(container);

export class Application {

    protected container = container ;
    private modules:IModule[] = [];
    private routingAdapter:IRoutingAdapter;
    private featureChecker = new FeatureChecker();

    constructor() {
        this.register(new NinjaGoatModule());
        this.container.bind<IFeatureChecker>("IFeatureChecker").toConstantValue(this.featureChecker);
    }

    register(module:IModule):boolean {
        if (!this.featureChecker.canCheck(module.constructor) || this.featureChecker.check(module.constructor)) {
            if (module.modules)
                module.modules(this.container);
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
        let registry = this.container.get<IViewModelRegistry>("IViewModelRegistry");
        this.routingAdapter = this.container.get<IRoutingAdapter>("IRoutingAdapter");
        _.forEach(this.modules, (module:IModule) => module.register(registry, this.container, overrides));
    }

    protected rootComponent():React.ReactElement<any> {
        let locationListener = this.container.get<ILocationListener>("ILocationListener");
        browserHistory.listen(event => locationListener.pushLocation(event.pathname));
        return <Router history={browserHistory} routes={this.routingAdapter.routes()}/>
    }
}