import CommandDispatcher from "../../../scripts/commands/CommandDispatcher";
import * as Transport from "../../../scripts/constants/Transport";
import CommandResponse from "../../../scripts/commands/CommandResponse";
import CommandEnvelope from "../../../scripts/commands/CommandEnvelope";
import IDateRetriever from "../../../scripts/util/IDateRetriever";
import IGUIDGenerator from "../../../scripts/util/IGUIDGenerator";

class MockPostCommandDispatcher extends CommandDispatcher {

    constructor(dateRetriever:IDateRetriever, guidGenerator:IGUIDGenerator) {
        super(dateRetriever, guidGenerator);
    }

    canExecuteCommand(command:Object):boolean {
        return this.transport === Transport.HTTP_Post;
    }

    executeCommand(envelope:CommandEnvelope):Rx.IPromise<CommandResponse> {
        return null;
    }

}

export default MockPostCommandDispatcher