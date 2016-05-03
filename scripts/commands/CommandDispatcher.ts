import ICommandDispatcher from "./ICommandDispatcher";
import Command from "./Command";

abstract class CommandDispatcher implements ICommandDispatcher {

    private nextDispatcher:ICommandDispatcher;

    dispatch(command:Command):void {
        let transport = Reflect.getMetadata("Transport", command.constructor),
            endpoint = Reflect.getMetadata("Endpoint", command.constructor),
            authentication = Reflect.getMetadata("Authentication", command.constructor);
        if (!transport && !endpoint && !authentication) {
            this.internalExecute(command);
            return;
        }
        if (!this.internalExecute(command) && this.nextDispatcher)
            this.nextDispatcher.dispatch(command);
    }

    abstract internalExecute(command:Command):boolean;

    setNext(dispatcher:ICommandDispatcher):void {
        this.nextDispatcher = dispatcher;
    }
}

export default CommandDispatcher