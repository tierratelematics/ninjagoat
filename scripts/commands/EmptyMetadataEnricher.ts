import IMetadataEnricher from "./IMetadataEnricher";
import {injectable} from "inversify";
import Dictionary from "../util/Dictionary";

@injectable()
class EmptyMetadataEnricher implements IMetadataEnricher {

    enrich(command?:Object, metadata?:Dictionary<any>):Dictionary<any> {
        return metadata;
    }

}

export default EmptyMetadataEnricher