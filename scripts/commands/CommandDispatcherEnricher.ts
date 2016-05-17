import ICommandDispatcher from "./ICommandDispatcher";
import Command from "./Command";
import CommandResponse from "./CommandResponse";
import IMetadataEnricher from "./IMetadataEnricher";
import * as _ from "lodash";
import {injectable, inject, multiInject} from "inversify";
import Dictionary from "../util/Dictionary";

@injectable()
class CommandDispatcherEnricher implements ICommandDispatcher {

    constructor(@inject("CommandDispatcher") private commandDispatcher:ICommandDispatcher,
                @multiInject("IMetadataEnricher") private enrichers?:IMetadataEnricher[]) {

    }

    dispatch(command:Command):Rx.Observable<CommandResponse> {
        let metadata:Dictionary<any> = _.reduce(this.enrichers, (result, enricher) => {
            result = enricher.enrich(command, result);
            return result;
        }, {});
        return this.commandDispatcher.dispatch(command, metadata);
    }
}

export default CommandDispatcherEnricher