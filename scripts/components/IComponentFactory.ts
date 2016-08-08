import * as React from "react";

interface IComponentFactory {
    componentForMaster<T>(): React.ClassicComponentClass<T>;
    componentForUri<T>(uri: string): React.ClassicComponentClass<T>;
    componentForNotFound<T>(): React.ClassicComponentClass<T>;
}

export default IComponentFactory;
