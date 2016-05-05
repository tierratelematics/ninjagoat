import CommandDispatcher from "../../../scripts/commands/CommandDispatcher";
import Command from "../../../scripts/commands/Command";
import Transport from "../../../scripts/constants/Transport";

class MockWSCommandDispatcher extends CommandDispatcher {

    internalExecute(command:Command):boolean {
        let transport = Reflect.getMetadata("Transport", command.constructor);
        return transport === Transport.WebSocket;
    }

}

export default MockWSCommandDispatcher