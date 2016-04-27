import IPageComponentFactory from "../../scripts/components/IPageComponentFactory";
import * as React from "react";

class MockPageComponentFactory implements IPageComponentFactory {

    componentForUri<T>(uri: string): React.ClassicComponentClass<T> {
        return null;
    }
}

export default MockPageComponentFactory;
