import ObservableViewModel from "../../../scripts/viewmodels/ObservableViewModel";
import Refresh from "../../../scripts/viewmodels/RefreshDecorator";
import {ViewModel} from "../../../scripts/viewmodels/ViewModelDecorator";

@ViewModel("Bar")
export default class BarViewModel extends ObservableViewModel<number> {

    public models: number[];
    public async = false;

    onData(model: number) {
        if (!this.models) this.models = [];
        this.models.push(model);
    }

    @Refresh
    operateOnData() {

    }

    @Refresh
    async asyncOperation() {
        await this.getPromise();
        this.async = true;
    }

    private getPromise(): Promise<void> {
        return Promise.resolve();
    }
}
