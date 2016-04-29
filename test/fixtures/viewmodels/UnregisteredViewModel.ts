import ObservableViewModel from "../../../scripts/viewmodels/ObservableViewModel";

export default class UnregisteredViewModel extends ObservableViewModel<number> {

    public models: number[];

    onData(model: number) {
        if (!this.models) this.models = [];
        this.models.push(model);
    }
}
