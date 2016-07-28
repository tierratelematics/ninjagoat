import * as Rx from "rx";
import IViewModel from "./IViewModel";
import {injectable} from "inversify";

@injectable()
abstract class ObservableViewModel<T> implements IViewModel<T> {
    "force nominal type for IViewModel": T;

    private subject = new Rx.Subject<void>();
    private subscription: Rx.IDisposable;

    observe(observable: Rx.IObservable<T>) {
        this.subscription = observable.subscribe(
            model => {
                this.onData(model);
                this.subject.onNext(undefined);
            },
            error => this.onError(error)
        );
    }

    protected abstract onData(data: T): void;

    subscribe(observer: Rx.IObserver<void>): Rx.IDisposable
    subscribe(onNext?: (value: void) => void, onError?: (exception: any) => void, onCompleted?: () => void): Rx.IDisposable
    subscribe(observerOrOnNext?: (Rx.IObserver<void>) | ((value: void) => void), onError?: (exception: any) => void, onCompleted?: () => void): Rx.IDisposable {
        if (isObserver(observerOrOnNext))
            return this.subject.subscribe(observerOrOnNext);
        else
            return this.subject.subscribe(observerOrOnNext, onError, onCompleted);
    }

    protected onError(error: any) {
        this.subscription.dispose();
        this.subject.onError(error);
    }

    dispose(): void {
        if (this.subscription) this.subscription.dispose();
        this.subject.onCompleted();
    }

    private notifyChanged() {
        this.subject.onNext(undefined);
    }
}

function isObserver<T>(observerOrOnNext: (Rx.IObserver<T>) | ((value: T) => void)): observerOrOnNext is Rx.IObserver<T> {
    return (<Rx.IObserver<T>>observerOrOnNext).onNext !== undefined;
}

export default ObservableViewModel;
