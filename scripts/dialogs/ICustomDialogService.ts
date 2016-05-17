import {IPromise} from "rx";

interface ICustomDialogService {
    display(key:string, message:string, title?:string):IPromise<void>;
}

export default ICustomDialogService