import Command from "./Command";

class CommandEnvelope<T> {
    id:string;
    type:string;
    createdTimestamp:string;
    metadata:{[index:string]:any};
    payload:T;

    static of<T extends Command>(payload:T, metadata?:{[index:string]:any}) {
        let envelope = new CommandEnvelope<T>();
        envelope.payload = payload;
        envelope.metadata = metadata;
        return envelope;
    }
}

export default CommandEnvelope