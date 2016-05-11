import INotificationManager from "./INotificationManager";
import Notification from "./Notification";
import * as Rx from "rx";
import {injectable, inject, IProvider} from "inversify";

@injectable()
class NotificationManager implements INotificationManager {

    private client:SocketIOClient.Socket;

    constructor(@inject("IProvider<SocketIOClient.Socket>") private clientProvider:IProvider<SocketIOClient.Socket>) {

    }

    notificationsFor(area:string, viewmodelId:string, parameters?:any):Rx.Observable<Notification> {
        return Rx.Observable
            .fromPromise<SocketIOClient.Socket>(this.clientProvider())
            .map(socket => {
                this.client = socket;
                this.subscribeToChannel(area, viewmodelId, parameters);
            })
            .flatMap(_ => this.getNotificationStream(area, viewmodelId))
            .finally(() => this.unsubscribeFromChannel(area, viewmodelId, parameters));
    }

    protected getNotificationStream(area:string, viewmodelId:string):Rx.Observable<Notification> {
        return Rx.Observable.fromEvent<Notification>(this.client, `${area}:${viewmodelId}`);
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