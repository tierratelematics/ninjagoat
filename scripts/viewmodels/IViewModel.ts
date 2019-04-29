import {Subscribable} from "rxjs/Observable";
import {IDisposable} from "./IDisposable";

interface IViewModel<T> extends IDisposable, Subscribable<void> {
    "force nominal type for IViewModel": T;
}

export default IViewModel;
