import Command from "./Command";
import CommandResponse from "./CommandResponse";
import Dictionary from "../util/Dictionary";

interface ICommandDispatcher {
    dispatch(command:Command, metadata?:Dictionary<any>):Rx.Observable<CommandResponse>;
}

export default ICommandDispatcher