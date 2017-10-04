import * as React from "react";

abstract class View<T, P = void> extends React.Component<{ viewmodel: T } & P, {}> {
    public viewModel: T = this.props.viewmodel;

    abstract render();
}

export default View;
