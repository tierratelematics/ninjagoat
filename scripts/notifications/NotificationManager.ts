import INotificationManager from "./INotificationManager";
import Notification from "./Notification";
import * as Rx from "rx";
import {injectable} from "inversify";

@injectable()
class NotificationManager implements INotificationManager {

    private client:SocketIOClient.Socket;

    notificationsFor(area:string, viewmodelId:string, parameters?:any):Rx.Observable<Notification> {
        if (!this.client) return;
        this.subscribeToChannel(area, viewmodelId, parameters);
        let source = Rx.Observable.fromCallback<Notification, string>(this.client.on, this.client);
        return source(`${area}:${viewmodelId}`).finally(() => this.unsubscribeFromChannel(area, viewmodelId, parameters));
    }

    setClient(client:SocketIOClient.Socket) {
        this.client = client;
    }

    private subscribeToChannel(area:string, viewmodelId:string, parameters?:any):void {
        this.operateOnChannel('subscribe', area, viewmodelId, parameters);
    }

    private unsubscribeFromChannel(area:string, viewmodelId:string, parameters?:any):void {
        this.operateOnChannel('unsubscribe', area, viewmodelId, parameters);
    }

    private operateOnChannel(operation:string, area:string, viewmodelId:string, parameters?:any):void {
        this.client.emit(operation, {
            area: area,
            viewmodelId: viewmodelId,
            parameters: parameters
        });
    }
}

export default NotificationManager