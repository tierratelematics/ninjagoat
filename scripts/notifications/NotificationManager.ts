import INotificationManager from "./INotificationManager";
import Notification from "./Notification";

class NotificationManager implements INotificationManager {
    
    notificationsFor(area:string, viewmodelId:string, parameters?:any):Rx.IObservable<Notification> {
        return undefined;
    }

    unsubscribeFromAll():void {
    }

}

export default NotificationManager