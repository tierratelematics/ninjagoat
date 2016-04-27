import * as React from "react";
import IContextFactory from "./IContextFactory";

export default function(contextFactory: IContextFactory): React.ClassicComponentClass<any> {
    return React.createClass({
        render() {
            let View = this.view;
            let ViewModel = this.viewmodel;
            return <View viewmodel={ViewModel} />
        },
        componentWillMount() {
            let context = contextFactory.contextFor(window.location.pathname, this.props.params);
            this.view = context.view;
            this.viewmodel = context.viewmodel;
            this.setState(this.viewmodel);
            context.viewmodel.subscribe(() => this.setState(context.viewmodel));
        }
    });
};