import {IPromise} from "rx";
import DialogStatus from "./DialogStatus";

interface IConfirmationService {
    confirm(message:string,  title?:string):IPromise<DialogStatus>;
}

export default IConfirmationService