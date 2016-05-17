import INotificationManager from "./INotificationManager";
import Notification from "./Notification";
import * as Rx from "rx";
import {injectable, inject} from "inversify";
import ViewModelContext from "../registry/ViewModelContext";

@injectable()
class NotificationManager implements INotificationManager {

    constructor(@inject("SocketIOClient.Socket") private client:SocketIOClient.Socket) {

    }

    notificationsFor(context:ViewModelContext):Rx.Observable<Notification> {
        this.subscribeToChannel(context);
        return this.getNotificationStream(context).finally(() => this.unsubscribeFromChannel(context));
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