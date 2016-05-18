import Dictionary from "../util/Dictionary";

class CommandEnvelope {
    id:string;
    type:string;
    createdTimestamp:string;
    metadata:Dictionary<any>;
    payload:Object;

    static of(payload:Object, metadata?:Dictionary<any>) {
        let envelope = new CommandEnvelope();
        envelope.payload = payload;
        envelope.metadata = metadata;
        return envelope;
    }
}

export default CommandEnvelope