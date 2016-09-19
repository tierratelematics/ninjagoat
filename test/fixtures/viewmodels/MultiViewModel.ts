import ObservableViewModel from "../../../scripts/viewmodels/ObservableViewModel";
import ViewModel from "../../../scripts/viewmodels/ViewModelDecorator";

@ViewModel(["Multi1", "Multi2"])
export default class MultiViewModel extends ObservableViewModel<number> {
    protected onData(data:number) {
    }
}
