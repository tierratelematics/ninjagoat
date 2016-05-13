import CommandDispatcher from "../../../scripts/commands/CommandDispatcher";
import Command from "../../../scripts/commands/Command";
import * as Transport from "../../../scripts/constants/Transport";

class MockWSCommandDispatcher extends CommandDispatcher {

    internalExecute(command:Command):boolean {
        return this.transport === Transport.WebSocket;
    }

}

export default MockWSCommandDispatcher