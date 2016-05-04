import ObservableViewModel from "../../../scripts/viewmodels/ObservableViewModel";
import ViewModel from "../../../scripts/viewmodels/ViewModelDecorator";
import ModelState from "../../../scripts/viewmodels/ModelState";
import ModelPhase from "../../../scripts/constants/ModelPhase";

@ViewModel("State")
export default class StateViewModel extends ObservableViewModel<ModelState<number>> {

    public models:number[];
    public loading:boolean;
    public failure:any;

    onData(modelState:ModelState<number>) {
        if (!this.models) this.models = [];
        switch (modelState.phase) {
            case ModelPhase.Loading:
                this.loading = true;
                break;
            case ModelPhase.Ready:
                this.models.push(modelState.model);
                break;
            case ModelPhase.Failed:
                this.failure = modelState.failure;
                break;
        }
    }
}
