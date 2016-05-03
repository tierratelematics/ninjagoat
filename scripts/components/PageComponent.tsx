import * as React from "react";

export default React.createClass({
    render() {
        let View = this.view;
        let ViewModel = this.viewmodel;
        return <View viewmodel={ViewModel}/>
    },
    componentWillMount() {
        let context = this.props.contextFactory.contextFor(
            window.location.pathname + window.location.search,
            this.props.params
        );
        this.view = context.view;
        this.viewmodel = context.viewmodel;
        this.setState(this.viewmodel);
        context.viewmodel.subscribe(() => this.setState(context.viewmodel));
    },
    componentWillUnmount() {
        if (this.viewmodel) this.viewmodel.dispose();
    }
});