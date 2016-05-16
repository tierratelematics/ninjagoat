import CommandEnvelope from "./CommandEnvelope";

interface ICommandEnricher {
    enrich<T>(envelope:CommandEnvelope<T>):CommandEnvelope<T>
}

export default ICommandEnricher