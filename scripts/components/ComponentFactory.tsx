import IContextFactory from "./IContextFactory";
import IComponentFactory from "./IComponentFactory";
import * as React from "react";
import PageComponent from "./PageComponent";
import { inject, injectable } from "inversify";
import MasterComponent from "./MasterComponent";
import NotFoundComponent from "./NotFoundComponent";

@injectable()
class ComponentFactory implements IComponentFactory {

    constructor(@inject("IContextFactory") private contextFactory: IContextFactory) {
    }

    componentForMaster<T>(): React.ClassicComponentClass<any> | React.StatelessComponent<any> {
        return this.buildComponent(MasterComponent);
    }

    componentForUri<T>(uri: string): React.ClassicComponentClass<any> | React.StatelessComponent<any> {
        return this.buildComponent(PageComponent);
    }

    componentForNotFound<T>(): React.ClassicComponentClass<any> | React.StatelessComponent<any> {
        return this.buildComponent(NotFoundComponent);
    }

    private buildComponent(Component): React.ClassicComponentClass<any> | React.StatelessComponent<any> {
        let contextFactory = this.contextFactory;
        return (props) => <Component contextFactory={contextFactory} params={props.params} children={props.children} />;
    }
}

export default ComponentFactory;
