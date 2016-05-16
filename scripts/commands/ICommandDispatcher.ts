import Command from "./Command";
import CommandResponse from "./CommandResponse";

interface ICommandDispatcher {
    dispatch(command:Command):Rx.Observable<CommandResponse>;
}

export default ICommandDispatcher