import CommandDispatcher from "../../../scripts/commands/CommandDispatcher";
import Command from "../../../scripts/commands/Command";
import Transport from "../../../scripts/constants/Transport";

class MockPostCommandDispatcher extends CommandDispatcher {

    internalExecute(command:Command):boolean {
        let transport = Reflect.getMetadata("Transport", command.constructor);
        return transport === Transport.HTTP_Post;
    }

}

export default MockPostCommandDispatcher