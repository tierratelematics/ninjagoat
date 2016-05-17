import Command from "./Command";
import Dictionary from "../util/Dictionary";

interface IMetadataEnricher {
    enrich<T extends Command>(command?:T, metadata?:Dictionary<any>):Dictionary<any>
}

export default IMetadataEnricher