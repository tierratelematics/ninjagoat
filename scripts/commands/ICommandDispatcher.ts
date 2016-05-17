import Command from "./Command";
import CommandResponse from "./CommandResponse";

interface ICommandDispatcher {
    dispatch(command:Command, metadata?:{[index:string]:any}):Rx.Observable<CommandResponse>;
}

export default ICommandDispatcher