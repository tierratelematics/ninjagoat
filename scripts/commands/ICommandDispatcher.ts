import Command from "./Command";

interface ICommandDispatcher {
    dispatch(command:Command):void;
}

export default ICommandDispatcher