import CommandDispatcher from "../../../scripts/commands/CommandDispatcher";
import Command from "../../../scripts/commands/Command";
import * as Authentication from "../../../scripts/constants/Authentication";
import CommandResponse from "../../../scripts/commands/CommandResponse";

class MockAuthCommandDispatcher extends CommandDispatcher {

    canExecuteCommand(command:Command):boolean {
        return this.authentication === Authentication.Basic;
    }

    executeCommand(command:Command):Rx.Observable<CommandResponse> {
        return null;
    }

}

export default MockAuthCommandDispatcher