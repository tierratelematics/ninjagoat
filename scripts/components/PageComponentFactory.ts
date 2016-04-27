import IContextFactory from "./IContextFactory";
import IPageComponentFactory from "./IPageComponentFactory";
import * as React from "react";
import PageComponent from "./PageComponent";
import {inject, injectable} from "inversify";

@injectable()
class PageComponentFactory implements IPageComponentFactory {

    constructor( @inject("IContextFactory") private contextFactory: IContextFactory) {
    }

    componentForUri<T>(uri: string): React.ClassicComponentClass<T> {
        return PageComponent(this.contextFactory);
    }
}

export default PageComponentFactory;
