import IComponentFactory from "../../scripts/components/IComponentFactory";
import * as React from "react";

class MockComponentFactory implements IComponentFactory {

    componentForNotFound<T>():React.ClassicComponentClass<T> {
        return null;
    }

    componentForMaster<T>():React.ClassicComponentClass<T> {
        return null;
    }

    componentForUri<T>(uri: string): React.ClassicComponentClass<T> {
        return null;
    }
}

export default MockComponentFactory;
