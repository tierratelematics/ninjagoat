import EmptyViewModel from "./EmptyViewModel";
import ViewModel from "../../../scripts/viewmodels/ViewModelDecorator";
import ObservableViewModel from "../../../scripts/viewmodels/ObservableViewModel";

@ViewModel("FooIndex")
export default class FooIndexViewModel extends ObservableViewModel<number> {

    public models: number[];

    onData(model: number) {
        if (!this.models) this.models = [];
        this.models.push(model);
    }
}
