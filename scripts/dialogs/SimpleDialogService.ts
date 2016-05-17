import IDialogService from "./IDialogService";
import * as Promise from "bluebird";

class SimpleDialogService implements IDialogService {

    alert(message:string, title?:string):Rx.IPromise<void> {
        return new Promise<void>(resolve => {
            alert(message);
            resolve();
        });
    }

    confirm(message:string, title?:string):Rx.IPromise<void> {
        return new Promise<void>((resolve, reject) => {
            if (confirm(message)) resolve();
            else reject(new Error("Dialog rejected"));
        });
    }

    display(key:string, message:string, title?:string):Rx.IPromise<void> {
        throw new Error("Not implemented");
    }

}

export default SimpleDialogService