import IDialogService from "./IDialogService";
import * as Promise from "bluebird";
import DialogStatus from "./DialogStatus";

class SimpleDialogService implements IDialogService {

    alert(message:string, title?:string):Rx.IPromise<DialogStatus> {
        return new Promise<DialogStatus>(resolve => {
            alert(message);
            resolve(DialogStatus.Confirmed);
        });
    }

    confirm(message:string, title?:string):Rx.IPromise<DialogStatus> {
        return new Promise<DialogStatus>(resolve => {
            if (confirm(message)) resolve(DialogStatus.Confirmed);
            else resolve(DialogStatus.Rejected);
        });
    }

    display(key:string, message:string, title?:string):Rx.IPromise<DialogStatus> {
        throw new Error("Not implemented");
    }

}

export default SimpleDialogService