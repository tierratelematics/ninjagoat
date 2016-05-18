import CommandResponse from "./CommandResponse";
import Dictionary from "../util/Dictionary";

interface ICommandDispatcher {
    dispatch(command:Object, metadata?:Dictionary<any>):Rx.Observable<CommandResponse>;
}

export default ICommandDispatcher