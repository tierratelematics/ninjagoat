import Notification from "./Notification";
import ViewModelContext from "../registry/ViewModelContext";

interface INotificationManager {
    notificationsFor(context:ViewModelContext):Rx.Observable<Notification>;
}

export default INotificationManager