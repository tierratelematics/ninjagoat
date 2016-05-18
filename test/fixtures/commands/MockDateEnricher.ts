import IMetadataEnricher from "../../../scripts/commands/IMetadataEnricher";
import * as _ from "lodash";
import Dictionary from "../../../scripts/util/Dictionary";

class MockDateEnricher implements IMetadataEnricher {

    enrich(command?:Object, metadata?:Dictionary<any>):Dictionary<any> {
        return _.merge({}, metadata, {"date": "2016-05-16T09:52:18Z"});
    }
}

export default MockDateEnricher