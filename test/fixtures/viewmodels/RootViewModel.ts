import IViewModel from "../../../scripts/viewmodels/IViewModel";
import {ViewModel} from "../../../scripts/viewmodels/ViewModelDecorator";
import {Observer, Unsubscribable} from "rxjs";

@ViewModel("Root")
class RootViewModel implements IViewModel<number> {
    "force nominal type for IViewModel": number;

    dispose(): void {
    }

    subscribe(observer: Observer<void>): Unsubscribable;
    subscribe(onNext?: (value: void) => void, onError?: (exception: any) => void, onCompleted?: () => void): Unsubscribable;
    subscribe(observerOrOnNext?: (Observer<void>) | ((value: void) => void), onError?: (exception: any) => void, onCompleted?: () => void): Unsubscribable {
        return null;
    }
}

export default RootViewModel;
