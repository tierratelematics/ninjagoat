import { interfaces } from "inversify";
import * as React from "react";
import { IObservable, Disposable } from "rx";

import * as Area from "../registry/Area";
import View from "../views/View";
import IContextFactory from "./IContextFactory";

export interface IMasterComponentProps {
    contextFactory: IContextFactory;
    params?: any;
}

class MasterComponent extends React.Component<IMasterComponentProps> {
    viewmodel: IObservable<any>;
    view: interfaces.Newable<View<any>>;
    private subscription: Disposable;

    async componentWillMount() {
        let context = await this.props.contextFactory.contextFor(Area.Master);
        this.view = context.view;
        this.viewmodel = context.viewmodel;
        this.setState(this.viewmodel);

        this.subscription = this.viewmodel.subscribe(() => this.setState(context.viewmodel));
    }

    render() {
        if (!this.view) return <div></div>
        let ViewComponent = this.view;
        let ViewModel = this.viewmodel;
        return <ViewComponent viewmodel={ViewModel} children={this.props.children} />;
    }

    componentWillUnmount(): void {
        if (this.subscription) {
            this.subscription.dispose();
        }

        if (this.viewmodel && this.viewmodel.dispose) {
            this.viewmodel.dispose();
        }
    }
}

export default MasterComponent;
