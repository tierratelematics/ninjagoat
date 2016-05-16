import ICommandDispatcher from "./ICommandDispatcher";
import Command from "./Command";
import CommandResponse from "./CommandResponse";
import ICommandEnricher from "./ICommandEnricher";

class CommandDispatcherEnriched implements ICommandDispatcher {

    constructor(private commandDispatcher:ICommandDispatcher, private enrichers:ICommandEnricher[]) {

    }

    dispatch(command:Command):Rx.Observable<CommandResponse> {
        return undefined;
    }
}

export default CommandDispatcherEnriched