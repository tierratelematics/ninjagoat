import Command from "./Command";

class CommandEnvelope<T> {
    id:string;
    type:string;
    createdTimestamp:string;
    metadata:any;
    payload:T;

    static of<T extends Command>(payload:T) {
        let envelope = new CommandEnvelope<T>();
        envelope.payload = payload;
        return envelope;
    }
}

export default CommandEnvelope