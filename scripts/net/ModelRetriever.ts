import IModelRetriever from "./IModelRetriever";
import {injectable, inject} from "inversify";
import IHttpClient from "./IHttpClient";
import INotificationManager from "../notifications/INotificationManager";
import ModelState from "../viewmodels/ModelState";
import * as Rx from "rx";
import ViewModelContext from "../registry/ViewModelContext";

@injectable()
class ModelRetriever implements IModelRetriever {

    constructor(@inject("IHttpClient") private httpClient:IHttpClient,
                @inject("INotificationManager") private notificationManager:INotificationManager) {

    }

    modelFor<T>(context:ViewModelContext):Rx.Observable<ModelState<T>> {
        return this.notificationManager.notificationsFor(context)
            .selectMany(notification => this.httpClient.get(notification.url))
            .map(response => ModelState.Ready(<T>response.response))
            .catch(error => Rx.Observable.just(ModelState.Failed(error)))
            .startWith(<ModelState<T>>ModelState.Loading());
    }
}

export default ModelRetriever