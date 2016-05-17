import IMetadataEnricher from "../../../scripts/commands/IMetadataEnricher";
import * as _ from "lodash";
import Command from "../../../scripts/commands/Command";

class MockMetadataEnricher implements IMetadataEnricher {

    enrich<T extends Command>(command?:T, metadata?:{[index:string]:any}):{[index:string]:any} {
        return _.merge({}, metadata, {"guid": "fixed-id"});
    }

}

export default MockMetadataEnricher