import {IPromise} from "rx";
import DialogStatus from "./DialogStatus";

interface ICustomDialogService {
    display(key:string, message:string, title?:string):IPromise<DialogStatus>;
}

export default ICustomDialogService