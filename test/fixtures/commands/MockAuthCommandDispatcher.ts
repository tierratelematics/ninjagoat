import CommandDispatcher from "../../../scripts/commands/CommandDispatcher";
import * as Authentication from "../../../scripts/constants/Authentication";
import CommandResponse from "../../../scripts/commands/CommandResponse";
import CommandEnvelope from "../../../scripts/commands/CommandEnvelope";
import IGUIDGenerator from "../../../scripts/util/IGUIDGenerator";
import IDateRetriever from "../../../scripts/util/IDateRetriever";

class MockAuthCommandDispatcher extends CommandDispatcher {

    constructor(dateRetriever:IDateRetriever, guidGenerator:IGUIDGenerator) {
        super(dateRetriever, guidGenerator);
    }

    canExecuteCommand(command:Object):boolean {
        return this.authentication === Authentication.Basic;
    }

    executeCommand(envelope:CommandEnvelope):Rx.IPromise<CommandResponse> {
        return null;
    }

}

export default MockAuthCommandDispatcher