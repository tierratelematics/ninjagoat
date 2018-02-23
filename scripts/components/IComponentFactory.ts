import * as React from "react";

interface IComponentFactory {
    componentForMaster<T>(): React.ClassicComponentClass<T> | React.StatelessComponent<any>;
    componentForUri<T>(uri: string): React.ClassicComponentClass<T> | React.StatelessComponent<any>;
    componentForNotFound<T>(): React.ClassicComponentClass<T> | React.StatelessComponent<any>;
}

export default IComponentFactory;
