import INotificationManager from "./INotificationManager";
import Notification from "./Notification";
import * as io from "socket.io-client";
import * as Rx from "rx";
import {injectable} from "inversify";

@injectable()
class NotificationManager implements INotificationManager {

    private connectionUrl:string;
    private client:SocketIOClient.Socket;

    notificationsFor(area:string, viewmodelId:string, parameters?:any):Rx.Observable<Notification> {
        this.setupClient();
        this.subscribeToChannel(area, viewmodelId, parameters);
        let source = Rx.Observable.fromCallback<Notification, string>(this.client.on, this.client);
        return source(`${area}:${viewmodelId}`).finally(() => this.unsubscribeFromChannel(area, viewmodelId, parameters));
    }

    setConnectionUrl(url:string) {
        this.connectionUrl = url;
    }

    private setupClient() {
        if (!this.client)
            this.client = io.connect(this.connectionUrl);
    }

    private subscribeToChannel(area:string, viewmodelId:string, parameters?:any):void {
        this.client.emit('subscribe', {
            area: area,
            viewmodelId: viewmodelId,
            parameters: parameters
        });
    }

    private unsubscribeFromChannel(area:string, viewmodelId:string, parameters?:any):void {
        this.client.emit('unsubscribe', {
            area: area,
            viewmodelId: viewmodelId,
            parameters: parameters
        });
    }
}

export default NotificationManager