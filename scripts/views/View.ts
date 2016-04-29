import * as React from "react";

class View<T> extends React.Component<{ viewmodel: T }, {}> {
    public viewModel: T = this.props.viewmodel;
}

export default View;
