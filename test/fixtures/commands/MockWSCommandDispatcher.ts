import CommandDispatcher from "../../../scripts/commands/CommandDispatcher";
import Command from "../../../scripts/commands/Command";
import * as Transport from "../../../scripts/constants/Transport";
import CommandResponse from "../../../scripts/commands/CommandResponse";

class MockWSCommandDispatcher extends CommandDispatcher {

    canExecuteCommand(command:Command):boolean {
        return this.transport === Transport.WebSocket;
    }

    executeCommand(command:Command):Rx.Observable<CommandResponse> {
        return null;
    }

}

export default MockWSCommandDispatcher