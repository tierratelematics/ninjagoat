import Notification from "./Notification";

interface INotificationManager {
    notificationsFor(area:string, viewmodelId:string, parameters?:any):Rx.IObservable<Notification>;
}

export default INotificationManager