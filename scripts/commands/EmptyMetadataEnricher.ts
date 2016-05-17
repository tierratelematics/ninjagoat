import IMetadataEnricher from "./IMetadataEnricher";
import {injectable} from "inversify";
import Command from "./Command";
import Dictionary from "../util/Dictionary";

@injectable()
class EmptyMetadataEnricher implements IMetadataEnricher {

    enrich<T extends Command>(command?:T, metadata?:Dictionary<any>):Dictionary<any> {
        return metadata;
    }

}

export default EmptyMetadataEnricher