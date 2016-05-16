import ICommandEnricher from "../../../scripts/commands/ICommandEnricher";
import CommandEnvelope from "../../../scripts/commands/CommandEnvelope";
import * as _ from "lodash";

class MockCommandEnricher implements ICommandEnricher {

    enrich<T>(envelope:CommandEnvelope<T>):CommandEnvelope<T> {
        envelope.metadata = _.merge(envelope.metadata, {"guid": "fixed-id"});
        return envelope;
    }

}

export default MockCommandEnricher