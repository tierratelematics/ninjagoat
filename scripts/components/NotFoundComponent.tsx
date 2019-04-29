import { interfaces } from "inversify";
import * as React from "react";

import * as Area from "../registry/Area";
import View from "../views/View";
import IContextFactory from "./IContextFactory";
import IViewModel from "../viewmodels/IViewModel";

export interface INotFoundComponentProps {
    contextFactory: IContextFactory;
    params?: any;
}

class NotFoundComponent extends React.Component<INotFoundComponentProps> {
    viewmodel: IViewModel<any>;
    view: interfaces.Newable<View<any>>;

    async componentWillMount() {
        let context = await this.props.contextFactory.contextFor(Area.NotFound);
        this.view = context.view;
        this.viewmodel = context.viewmodel;
        this.setState(this.viewmodel);

        this.viewmodel.subscribe(() => this.setState(context.viewmodel));
    }

    render() {
        if (!this.view) return <div></div>
        let ViewComponent = this.view;
        let ViewModel = this.viewmodel;
        return <ViewComponent viewmodel={ViewModel} children={this.props.children} />;
    }
}

export default NotFoundComponent;
