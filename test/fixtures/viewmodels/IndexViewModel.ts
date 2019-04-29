import IViewModel from "../../../scripts/viewmodels/IViewModel";
import {ViewModel} from "../../../scripts/viewmodels/ViewModelDecorator";
import {Observer, Subscription} from "rxjs";

@ViewModel("Index")
class IndexViewModel implements IViewModel<number> {
    "force nominal type for IViewModel": number;

    dispose(): void {
    }

    subscribe(observer: Observer<void>): Subscription;
    subscribe(onNext?: (value: void) => void, onError?: (exception: any) => void, onCompleted?: () => void): Subscription;
    subscribe(observerOrOnNext?: (Observer<void>) | ((value: void) => void), onError?: (exception: any) => void, onCompleted?: () => void): Subscription {
        return null;
    }
}

export default IndexViewModel;
