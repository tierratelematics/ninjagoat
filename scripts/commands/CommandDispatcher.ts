import ICommandDispatcher from "./ICommandDispatcher";
import Command from "./Command";

abstract class CommandDispatcher implements ICommandDispatcher {

    private nextDispatcher:ICommandDispatcher;
    protected transport:string;
    protected endpoint:string;
    protected authentication:string;

    dispatch(command:Command):void {
        this.extractCommandMetadata(command);
        if (!this.transport && !this.endpoint && !this.authentication) {
            this.internalExecute(command);
            return;
        }
        if (!this.internalExecute(command) && this.nextDispatcher)
            this.nextDispatcher.dispatch(command);
    }

    private extractCommandMetadata(command:Command):void {
        this.transport = Reflect.getMetadata("Transport", command.constructor);
        this.endpoint = Reflect.getMetadata("Endpoint", command.constructor);
        this.authentication = Reflect.getMetadata("Authentication", command.constructor);
    }

    abstract internalExecute(command:Command):boolean;

    setNext(dispatcher:ICommandDispatcher):void {
        this.nextDispatcher = dispatcher;
    }
}

export default CommandDispatcher