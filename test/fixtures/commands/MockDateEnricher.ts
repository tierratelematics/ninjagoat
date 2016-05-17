import IMetadataEnricher from "../../../scripts/commands/IMetadataEnricher";
import * as _ from "lodash";
import Command from "../../../scripts/commands/Command";

class MockDateEnricher implements IMetadataEnricher {

    enrich<T extends Command>(command?:T, metadata?:{[index:string]:any}):{[index:string]:any} {
        return _.merge({}, metadata, {"date": "2016-05-16T09:52:18Z"});
    }
}

export default MockDateEnricher