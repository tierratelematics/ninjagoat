import CommandDispatcher from "../../../scripts/commands/CommandDispatcher";
import Command from "../../../scripts/commands/Command";

class MockCommandDispatcher extends CommandDispatcher {

    internalExecute(command:Command):boolean {
        return true;
    }
    
}

export default MockCommandDispatcher