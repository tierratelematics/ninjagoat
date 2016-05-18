import {IPromise} from "rx";
import DialogStatus from "./DialogStatus";

interface IAlertService {
    alert(message:string, title?:string):IPromise<DialogStatus>;
}

export default IAlertService