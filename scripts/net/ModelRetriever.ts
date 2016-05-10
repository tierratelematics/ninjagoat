import IModelRetriever from "./IModelRetriever";
import {injectable, inject} from "inversify";
import IHttpClient from "./IHttpClient";
import INotificationManager from "../notifications/INotificationManager";
import ModelState from "../viewmodels/ModelState";
import * as Rx from "rx";

@injectable()
class ModelRetriever implements IModelRetriever {

    constructor(@inject("IHttpClient") private httpClient:IHttpClient,
                @inject("INotificationManager") private notificationManager:INotificationManager) {

    }

    modelFor<T>(area:string, viewmodelId:string, parameters?:any):Rx.Observable<ModelState<T>> {
        return this.notificationManager.notificationsFor(area, viewmodelId, parameters)
            .selectMany(notification => this.httpClient.get(notification.url))
            .map(response => ModelState.Ready(<T>response.response))
            .catch(error => Rx.Observable.just(ModelState.Failed(error)))
            .startWith(<ModelState<T>>ModelState.Loading());
    }
}

export default ModelRetriever