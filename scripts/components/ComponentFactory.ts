import IContextFactory from "./IContextFactory";
import IComponentFactory from "./IComponentFactory";
import * as React from "react";
import PageComponent from "./PageComponent";
import {inject, injectable} from "inversify";
import MasterComponent from "./MasterComponent";
import NotFoundComponent from "./NotFoundComponent";

@injectable()
class ComponentFactory implements IComponentFactory {

    constructor(@inject("IContextFactory") private contextFactory:IContextFactory) {
    }

    componentForMaster<T>():React.ClassicComponentClass<any> {
        return this.buildComponent(MasterComponent);
    }

    componentForUri<T>(uri:string):React.ClassicComponentClass<any> {
        return this.buildComponent(PageComponent);
    }

    componentForNotFound<T>():React.ClassicComponentClass<any> {
        return this.buildComponent(NotFoundComponent);
    }

    private buildComponent(Component):React.ClassicComponentClass<any> {
        let contextFactory = this.contextFactory;
        return React.createClass({
            render() {
                return React.createElement(Component, {
                    contextFactory: contextFactory,
                    params: this.props.params,
                    children: this.props.children
                });
            }
        });
    }
}

export default ComponentFactory;
