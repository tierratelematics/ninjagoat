import {injectable} from "inversify";
import {Observable, Observer, Subject, Subscription} from "rxjs";
import IViewModel from "../viewmodels/IViewModel";


@injectable()
abstract class ObservableViewModel<T> implements IViewModel<T> {
    "force nominal type for IViewModel": T;

    private subject = new Subject<void>();
    private subscription: Subscription;

    observe(observable: Observable<T>) {
        this.subscription = observable.subscribe(
            model => {
                this.onData(model);
                this.subject.next(undefined);
            },
            error => this.onError(error)
        );
    }

    protected abstract onData(data: T): void;

    subscribe(observer: Observer<void>): Subscription;
    subscribe(onNext?: (value: void) => void, onError?: (exception: any) => void, onCompleted?: () => void): Subscription;
    subscribe(observerOrOnNext?: (Observer<void>) | ((value: void) => void), onError?: (exception: any) => void, onCompleted?: () => void): Subscription {
        if (isObserver(observerOrOnNext))
            return this.subject.subscribe(observerOrOnNext);
        else
            return this.subject.subscribe(observerOrOnNext, onError, onCompleted);
    }

    protected onError(error: any) {
        this.subscription.unsubscribe();
        this.subject.error(error);
    }

    dispose(): void {
        if (this.subscription) this.subscription.unsubscribe();
        this.subject.complete();
    }

    private notifyChanged() {
        this.subject.next(undefined);
    }
}

function isObserver<T>(observerOrOnNext: (Observer<T>) | ((value: T) => void)): observerOrOnNext is Observer<T> {
    return (<Observer<T>>observerOrOnNext).next !== undefined;
}

export default ObservableViewModel;
