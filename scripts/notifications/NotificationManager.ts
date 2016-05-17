import INotificationManager from "./INotificationManager";
import Notification from "./Notification";
import * as Rx from "rx";
import {injectable, inject, IProvider} from "inversify";
import ViewModelContext from "../registry/ViewModelContext";

@injectable()
class NotificationManager implements INotificationManager {

    private client:SocketIOClient.Socket;

    constructor(@inject("IProvider<SocketIOClient.Socket>") private clientProvider:IProvider<SocketIOClient.Socket>) {

    }

    notificationsFor(context:ViewModelContext):Rx.Observable<Notification> {
        return Rx.Observable
            .fromPromise<SocketIOClient.Socket>(this.clientProvider())
            .map(socket => {
                this.client = socket;
                this.subscribeToChannel(context);
            })
            .flatMap(_ => this.getNotificationStream(context))
            .finally(() => this.unsubscribeFromChannel(context));
    }

    protected getNotificationStream(context:ViewModelContext):Rx.Observable<Notification> {
        return Rx.Observable.fromEvent<Notification>(this.client, `${context.area}:${context.viewmodelId}`);
    }

    private subscribeToChannel(context:ViewModelContext):void {
        this.operateOnChannel('subscribe', context);
    }

    private unsubscribeFromChannel(context:ViewModelContext):void {
        this.operateOnChannel('unsubscribe', context);
    }

    private operateOnChannel(operation:string, context:ViewModelContext):void {
        this.client.emit(operation, {
            area: context.area,
            viewmodelId: context.viewmodelId,
            parameters: context.parameters
        });
    }
}

export default NotificationManager