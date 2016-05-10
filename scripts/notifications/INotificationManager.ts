import Notification from "./Notification";

interface INotificationManager {
    notificationsFor(area:string, viewmodelId:string, parameters?:any):Rx.Observable<Notification>;
}

export default INotificationManager