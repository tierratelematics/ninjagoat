import CommandDispatcher from "../../../scripts/commands/CommandDispatcher";
import * as Transport from "../../../scripts/constants/Transport";
import CommandResponse from "../../../scripts/commands/CommandResponse";
import CommandEnvelope from "../../../scripts/commands/CommandEnvelope";
import IGUIDGenerator from "../../../scripts/util/IGUIDGenerator";
import IDateRetriever from "../../../scripts/util/IDateRetriever";

class MockWSCommandDispatcher extends CommandDispatcher {

    constructor(dateRetriever:IDateRetriever, guidGenerator:IGUIDGenerator) {
        super(dateRetriever, guidGenerator);
    }

    canExecuteCommand(command:Object):boolean {
        return this.transport === Transport.WebSocket;
    }

    executeCommand(command:CommandEnvelope):Rx.IPromise<CommandResponse> {
        return null;
    }

}

export default MockWSCommandDispatcher