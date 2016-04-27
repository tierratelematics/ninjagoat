import * as Rx from "rx";

interface IViewModel<T> extends Rx.IDisposable, Rx.IObservable<void> {
    "force nominal type for IViewModel": T;
}

export default IViewModel;
