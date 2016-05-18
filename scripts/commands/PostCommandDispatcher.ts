import CommandDispatcher from "./CommandDispatcher";
import CommandEnvelope from "./CommandEnvelope";
import CommandResponse from "./CommandResponse";
import IDateRetriever from "../util/IDateRetriever";
import IGUIDGenerator from "../util/IGUIDGenerator";
import {HTTP_Post} from "../constants/Transport";
import IHttpClient from "../net/IHttpClient";
import {injectable, inject, named} from "inversify";
import IEndpointConfig from "../configs/IEndpointConfig";
import {Config_Base} from "../constants/RegistrationKeys";

@injectable()
class PostCommandDispatcher extends CommandDispatcher {

    constructor(@inject("IDateRetriever") dateRetriever:IDateRetriever,
                @inject("IGUIDGenerator") guidGenerator:IGUIDGenerator,
                @inject("IHttpClient") private httpClient:IHttpClient,
                @inject("IEndpointConfig") @named(Config_Base) private config:IEndpointConfig) {
        super(dateRetriever, guidGenerator);
    }

    canExecuteCommand(command:Object) {
        return this.transport === HTTP_Post && !this.authentication;
    }

    executeCommand(envelope:CommandEnvelope):Rx.IPromise<CommandResponse> {
        return this.httpClient.post(this.config.endpoint + this.endpoint, envelope).toPromise();
    }

}

export default PostCommandDispatcher