import ModelState from "../viewmodels/ModelState";

interface IModelRetriever {
    modelFor<T>(area:string, viewmodelId:string, parameters?:any):Rx.Observable<ModelState<T>>;
}

export default IModelRetriever