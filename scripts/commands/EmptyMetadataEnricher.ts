import IMetadataEnricher from "./IMetadataEnricher";
import {injectable} from "inversify";
import Command from "./Command";

@injectable()
class EmptyMetadataEnricher implements IMetadataEnricher {

    enrich<T extends Command>(command?:T, metadata?:{[index:string]:any}):{[index:string]:any} {
        return metadata;
    }

}

export default EmptyMetadataEnricher