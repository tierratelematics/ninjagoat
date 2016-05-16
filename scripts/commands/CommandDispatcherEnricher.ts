import ICommandDispatcher from "./ICommandDispatcher";
import Command from "./Command";
import CommandResponse from "./CommandResponse";
import IMetadataEnricher from "./IMetadataEnricher";
import * as _ from "lodash";

class CommandDispatcherEnricher implements ICommandDispatcher {

    constructor(private commandDispatcher:ICommandDispatcher, private enrichers:IMetadataEnricher[]) {

    }

    dispatch(command:Command):Rx.Observable<CommandResponse> {
        let metadata:{[index:string]:any} = _.reduce(this.enrichers, (result, enricher) => {
            result = enricher.enrich(result);
            return result;
        }, {});
        return this.commandDispatcher.dispatch(command, metadata);
    }
}

export default CommandDispatcherEnricher