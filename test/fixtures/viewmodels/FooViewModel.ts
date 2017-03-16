import ObservableViewModel from "../../../scripts/viewmodels/ObservableViewModel";
import {ViewModel} from "../../../scripts/viewmodels/ViewModelDecorator";

@ViewModel("Foo")
export default class FooViewModel extends ObservableViewModel<number> {
    protected onData(data: number) {
    }
}
