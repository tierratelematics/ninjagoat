import * as React from "react";

abstract class View<T> extends React.Component<{ viewmodel: T }, {}> {
    public viewModel: T = this.props.viewmodel;

    abstract render();
}

export default View;
