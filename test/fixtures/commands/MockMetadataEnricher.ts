import IMetadataEnricher from "../../../scripts/commands/IMetadataEnricher";
import * as _ from "lodash";
import Dictionary from "../../../scripts/util/Dictionary";

class MockMetadataEnricher implements IMetadataEnricher {

    enrich(command?:Object, metadata?:Dictionary<any>):Dictionary<any> {
        return _.merge({}, metadata, {"guid": "fixed-id"});
    }

}

export default MockMetadataEnricher