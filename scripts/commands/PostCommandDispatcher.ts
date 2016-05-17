import CommandDispatcher from "./CommandDispatcher";
import Command from "./Command";
import CommandEnvelope from "./CommandEnvelope";
import CommandResponse from "./CommandResponse";
import IDateRetriever from "../util/IDateRetriever";
import IGUIDGenerator from "../util/IGUIDGenerator";
import {HTTP_Post} from "../constants/Transport";
import IHttpClient from "../net/IHttpClient";
import {injectable, inject} from "inversify";

@injectable()
class PostCommandDispatcher extends CommandDispatcher {

    constructor(@inject() dateRetriever:IDateRetriever, guidGenerator:IGUIDGenerator, private httpClient:IHttpClient) {
        super(dateRetriever, guidGenerator);
    }

    canExecuteCommand(command:Command) {
        return this.transport === HTTP_Post;
    }

    executeCommand<T extends Command>(command:CommandEnvelope<T>):Rx.Observable<CommandResponse> {
        return this.httpClient.post(this.endpoint, command);
    }

}

export default PostCommandDispatcher