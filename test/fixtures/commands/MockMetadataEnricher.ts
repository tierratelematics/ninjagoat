import IMetadataEnricher from "../../../scripts/commands/IMetadataEnricher";
import * as _ from "lodash";

class MockMetadataEnricher implements IMetadataEnricher {

    enrich<T>(metadata?:{[index:string]:any}):{[index:string]:any} {
        return _.merge({}, metadata, {"guid": "fixed-id"});
    }

}

export default MockMetadataEnricher