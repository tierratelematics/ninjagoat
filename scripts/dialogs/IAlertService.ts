import {IPromise} from "rx";

interface IAlertService {
    alert(message:string, title?:string):IPromise<void>;
}

export default IAlertService