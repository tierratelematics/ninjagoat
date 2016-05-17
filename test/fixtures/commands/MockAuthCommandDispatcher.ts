import CommandDispatcher from "../../../scripts/commands/CommandDispatcher";
import Command from "../../../scripts/commands/Command";
import * as Authentication from "../../../scripts/constants/Authentication";
import CommandResponse from "../../../scripts/commands/CommandResponse";
import CommandEnvelope from "../../../scripts/commands/CommandEnvelope";
import IGUIDGenerator from "../../../scripts/util/IGUIDGenerator";
import IDateRetriever from "../../../scripts/util/IDateRetriever";

class MockAuthCommandDispatcher extends CommandDispatcher {

    constructor(dateRetriever:IDateRetriever, guidGenerator:IGUIDGenerator) {
        super(dateRetriever, guidGenerator);
    }

    canExecuteCommand(command:Command):boolean {
        return this.authentication === Authentication.Basic;
    }

    executeCommand<T extends Command>(command:CommandEnvelope<T>):Rx.Observable<CommandResponse> {
        return null;
    }

}

export default MockAuthCommandDispatcher