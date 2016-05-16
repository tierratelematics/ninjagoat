import ICommandEnricher from "../../../scripts/commands/ICommandEnricher";
import CommandEnvelope from "../../../scripts/commands/CommandEnvelope";

class MockDateEnricher implements ICommandEnricher {

    enrich<T>(envelope:CommandEnvelope<T>):CommandEnvelope<T> {
        envelope.metadata = _.merge(envelope.metadata, {"date": "2016-05-16T09:52:18Z"});
        return envelope;
    }
}

export default MockDateEnricher