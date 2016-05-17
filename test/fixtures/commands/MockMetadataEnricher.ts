import IMetadataEnricher from "../../../scripts/commands/IMetadataEnricher";
import * as _ from "lodash";
import Command from "../../../scripts/commands/Command";
import Dictionary from "../../../scripts/util/Dictionary";

class MockMetadataEnricher implements IMetadataEnricher {

    enrich<T extends Command>(command?:T, metadata?:Dictionary<any>):Dictionary<any> {
        return _.merge({}, metadata, {"guid": "fixed-id"});
    }

}

export default MockMetadataEnricher