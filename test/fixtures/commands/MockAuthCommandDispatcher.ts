import CommandDispatcher from "../../../scripts/commands/CommandDispatcher";
import Command from "../../../scripts/commands/Command";
import Authentication from "../../../scripts/constants/Authentication";

class MockAuthCommandDispatcher extends CommandDispatcher {

    internalExecute(command:Command):boolean {
        let auth = Reflect.getMetadata("Authentication", command.constructor);
        return auth === Authentication.Basic;
    }

}

export default MockAuthCommandDispatcher