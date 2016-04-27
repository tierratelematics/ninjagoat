import * as React from "react";

interface IPageComponentFactory {
    componentForUri<T>(uri: string): React.ClassicComponentClass<T>;
}

export default IPageComponentFactory;
