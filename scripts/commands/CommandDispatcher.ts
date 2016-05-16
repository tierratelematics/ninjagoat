import ICommandDispatcher from "./ICommandDispatcher";
import Command from "./Command";
import CommandResponse from "./CommandResponse";

abstract class CommandDispatcher implements ICommandDispatcher {

    private nextDispatcher:ICommandDispatcher;
    protected transport:string;
    protected endpoint:string;
    protected authentication:string;

    dispatch(command:Command):Rx.Observable<CommandResponse> {
        this.extractCommandMetadata(command);
        if (!this.transport && !this.endpoint && !this.authentication) {
            return this.executeCommand(command);
        }
        if (!this.canExecuteCommand(command)) {
            if (this.nextDispatcher)
                return this.nextDispatcher.dispatch(command);
        } else {
            return this.executeCommand(command);
        }
    }

    private extractCommandMetadata(command:Command):void {
        this.transport = Reflect.getMetadata("Transport", command.constructor);
        this.endpoint = Reflect.getMetadata("Endpoint", command.constructor);
        this.authentication = Reflect.getMetadata("Authentication", command.constructor);
    }

    abstract canExecuteCommand(command:Command);

    abstract executeCommand(command:Command):Rx.Observable<CommandResponse>;

    setNext(dispatcher:ICommandDispatcher):void {
        this.nextDispatcher = dispatcher;
    }
}

export default CommandDispatcher