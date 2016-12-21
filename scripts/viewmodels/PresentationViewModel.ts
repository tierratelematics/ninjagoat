import ObservableViewModel from "./ObservableViewModel";
import {injectable, inject} from "inversify";
import ILocationListener from "../navigation/ILocationListener";
import Refresh from "./RefreshDecorator";

@injectable()
abstract class PresentationViewModel<T> extends ObservableViewModel<T> {
    public presentation:string;

    constructor(@inject("ILocationListener") locationListener:ILocationListener) {
        super();
        locationListener.pushLocation(location.pathname); //Push initial location
        locationListener.changes().subscribe(data => {
            this.updatePresentation(Reflect.getMetadata("ninjagoat:presentation", data.viewmodel.construct));
        });
    }

    @Refresh
    protected updatePresentation(presentation:string) {
        this.presentation = presentation;
    }
}

export default PresentationViewModel