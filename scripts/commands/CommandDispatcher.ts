import ICommandDispatcher from "./ICommandDispatcher";
import Command from "./Command";

abstract class CommandDispatcher implements ICommandDispatcher {

    private nextDispatcher:ICommandDispatcher;

    dispatch(command:Command):void {
      /*  if (!this.internalExecute(command) && this.nextDispatcher)
            this.nextDispatcher.dispatch(command);*/
    }

    abstract internalExecute(command:Command):boolean;

    setNext(dispatcher:ICommandDispatcher):void {
        this.nextDispatcher = dispatcher;
    }
}

export default CommandDispatcher