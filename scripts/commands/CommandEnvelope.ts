class CommandEnvelope<T> {
    id:string;
    type:string;
    createdTimestamp:string;
    metadata:any;
    payload:T;
}

export default CommandEnvelope