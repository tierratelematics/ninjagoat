import CommandDispatcher from "../../../scripts/commands/CommandDispatcher";
import Command from "../../../scripts/commands/Command";
import * as Authentication from "../../../scripts/constants/Authentication";

class MockAuthCommandDispatcher extends CommandDispatcher {

    internalExecute(command:Command):boolean {
        return this.authentication === Authentication.Basic;
    }

}

export default MockAuthCommandDispatcher