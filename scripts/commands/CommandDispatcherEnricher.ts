import ICommandDispatcher from "./ICommandDispatcher";
import Command from "./Command";
import CommandResponse from "./CommandResponse";
import IMetadataEnricher from "./IMetadataEnricher";

class CommandDispatcherEnricher implements ICommandDispatcher {

    constructor(private commandDispatcher:ICommandDispatcher, private enrichers:IMetadataEnricher[]) {

    }

    dispatch(command:Command):Rx.Observable<CommandResponse> {
        return null;
    }
}

export default CommandDispatcherEnricher