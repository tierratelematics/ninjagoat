import CommandDispatcher from "../../../scripts/commands/CommandDispatcher";
import Command from "../../../scripts/commands/Command";
import * as Transport from "../../../scripts/constants/Transport";

class MockPostCommandDispatcher extends CommandDispatcher {

    internalExecute(command:Command):boolean {
        return this.transport === Transport.HTTP_Post;
    }

}

export default MockPostCommandDispatcher