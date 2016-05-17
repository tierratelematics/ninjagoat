import Command from "./Command";
import Dictionary from "../util/Dictionary";

class CommandEnvelope<T> {
    id:string;
    type:string;
    createdTimestamp:string;
    metadata:Dictionary<any>;
    payload:T;

    static of<T extends Command>(payload:T, metadata?:Dictionary<any>) {
        let envelope = new CommandEnvelope<T>();
        envelope.payload = payload;
        envelope.metadata = metadata;
        return envelope;
    }
}

export default CommandEnvelope