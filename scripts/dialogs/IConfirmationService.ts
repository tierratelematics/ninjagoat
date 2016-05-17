import {IPromise} from "rx";

interface IConfirmationService {
    confirm(message:string,  title?:string):IPromise<void>;
}

export default IConfirmationService