import { interfaces } from "inversify";
import { isEqual } from "lodash";
import * as React from "react";
import { IObservable } from "rx";

import View from "../views/View";
import IContextFactory from "./IContextFactory";

export interface IPageComponentProps {
    contextFactory: IContextFactory;
    params?: any;
}

class PageComponent extends React.Component<IPageComponentProps> {
    viewmodel: IObservable<any>;    view: interfaces.Newable<View<any>>;

    componentWillMount() {
        this.setupPage(this.props);
    }
    componentWillReceiveProps(props: any) {
        // Deadly patch to avoid duplicated render cycle due to an improper edit of context [see MaterialUi | MuiThemeProvider]
        if (isEqual(props.params, this.props.params)) return;

        this.viewmodel.dispose();
        this.setupPage(props);
    }
    componentWillUnmount() {
        if (this.viewmodel) this.viewmodel.dispose();
    }
    async setupPage(props: any) {
        let context = await props.contextFactory.contextFor(
            window.location.pathname + window.location.search,
            props.params
        );
        this.view = context.view;
        this.viewmodel = context.viewmodel;
        this.setState(this.viewmodel);
        context.viewmodel.subscribe(() => this.setState(context.viewmodel));
    }

    render() {
        if (!this.view) return <div></div>
        let ViewComponent = this.view;
        let ViewModel = this.viewmodel;
        let key = JSON.stringify(this.props.params);
        return ViewComponent ? <ViewComponent viewmodel={ViewModel} key={key} /> : <div></div>;
    }
}

export default PageComponent;
