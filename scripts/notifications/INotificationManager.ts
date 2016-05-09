import Notification from "./Notification";

interface INotificationManager {
    notificationsFor(area:string, viewmodelId:string, parameters?:any):Rx.IObservable<Notification>;
    unsubscribeFromAll():void;
}

export default INotificationManager