import ObservableViewModel from "../../../scripts/viewmodels/ObservableViewModel";
import {ViewModel} from "../../../scripts/viewmodels/ViewModelDecorator";

@ViewModel("FooIndex")
export default class FooIndexViewModel extends ObservableViewModel<number> {

    public models: number[];

    onData(model: number) {
        if (!this.models) this.models = [];
        this.models.push(model);
    }
}
