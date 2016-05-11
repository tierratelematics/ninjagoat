import ModelState from "../viewmodels/ModelState";
import ViewModelContext from "../registry/ViewModelContext";

interface IModelRetriever {
    modelFor<T>(context:ViewModelContext):Rx.Observable<ModelState<T>>;
}

export default IModelRetriever