import ObservableViewModel from "./ObservableViewModel";
import {injectable, inject} from "inversify";
import ILocationListener from "../navigation/ILocationListener";

@injectable()
abstract class PresentationViewModel<T> extends ObservableViewModel<T> {
    public presentation:string;

    constructor(@inject("ILocationListener") locationListener:ILocationListener) {
        super();
        locationListener.changes().subscribe(data => {
            this.presentation = Reflect.getMetadata("ninjagoat:presentation", data.viewmodel.construct);
        });
    }
}

export default PresentationViewModel