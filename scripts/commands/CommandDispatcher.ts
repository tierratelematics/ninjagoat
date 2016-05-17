import ICommandDispatcher from "./ICommandDispatcher";
import Command from "./Command";
import CommandResponse from "./CommandResponse";
import CommandEnvelope from "./CommandEnvelope";
import IDateRetriever from "../util/IDateRetriever";
import IGUIDGenerator from "../util/IGUIDGenerator";
import Dictionary from "../util/Dictionary";

abstract class CommandDispatcher implements ICommandDispatcher {

    private nextDispatcher:ICommandDispatcher;
    protected transport:string;
    protected endpoint:string;
    protected authentication:string;
    protected type:string;

    constructor(private dateRetriever:IDateRetriever, private guidGenerator:IGUIDGenerator) {

    }

    dispatch(command:Command, metadata?:Dictionary<any>):Rx.Observable<CommandResponse> {
        this.extractCommandMetadata(command);
        if (!this.type)
            throw new Error("Missing type info from command");
        if ((!this.transport && !this.endpoint && !this.authentication) || this.canExecuteCommand(command)) {
            let envelope = CommandEnvelope.of(command, metadata);
            envelope.type = this.type;
            envelope.id = this.guidGenerator.generate();
            envelope.createdTimestamp = this.dateRetriever.getDate();
            return this.executeCommand<any>(envelope);
        } else if (this.nextDispatcher) {
            return this.nextDispatcher.dispatch(command, metadata);
        }
    }

    private extractCommandMetadata(command:Command):void {
        this.transport = Reflect.getMetadata("Transport", command.constructor);
        this.endpoint = Reflect.getMetadata("Endpoint", command.constructor);
        this.authentication = Reflect.getMetadata("Authentication", command.constructor);
        this.type = Reflect.getMetadata("Type", command.constructor);
    }

    abstract canExecuteCommand(command:Command);

    abstract executeCommand<T extends Command>(command:CommandEnvelope<T>):Rx.Observable<CommandResponse>;

    setNext(dispatcher:ICommandDispatcher):void {
        this.nextDispatcher = dispatcher;
    }
}

export default CommandDispatcher