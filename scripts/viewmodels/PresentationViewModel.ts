import {map, distinctUntilChanged} from "rxjs/operators";
import ObservableViewModel from "../observable/ObservableViewModel";
import {injectable, inject} from "inversify";
import ILocationListener from "../navigation/ILocationListener";
import Refresh from "./RefreshDecorator";

@injectable()
abstract class PresentationViewModel<T> extends ObservableViewModel<T> {
    public presentation: string;

    constructor(@inject("ILocationListener") locationListener: ILocationListener) {
        super();
        locationListener.pushLocation(location.pathname); //Push initial location
        locationListener.changes()
            .pipe(
                map(data => Reflect.getMetadata("ninjagoat:presentation", data.viewmodel.construct)),
                distinctUntilChanged()
            )
            .subscribe(presentation => {
                this.updatePresentation(presentation);
            });
    }

    @Refresh
    protected updatePresentation(presentation: string) {
        this.presentation = presentation;
    }
}

export default PresentationViewModel;
