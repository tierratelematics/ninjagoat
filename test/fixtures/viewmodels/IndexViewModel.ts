import IViewModel from "../../../scripts/viewmodels/IViewModel";
import * as Rx from "rx";
import {ViewModel} from "../../../scripts/viewmodels/ViewModelDecorator";

@ViewModel("Index")
class IndexViewModel implements IViewModel<number> {
    "force nominal type for IViewModel": number;

    dispose(): void {
    }

    subscribe(observer: Rx.IObserver<void>): Rx.IDisposable
    subscribe(onNext?: (value: void) => void, onError?: (exception: any) => void, onCompleted?: () => void): Rx.IDisposable
    subscribe(observerOrOnNext?: (Rx.IObserver<void>) | ((value: void) => void), onError?: (exception: any) => void, onCompleted?: () => void): Rx.IDisposable {
        return null;
    }
}

export default IndexViewModel;
