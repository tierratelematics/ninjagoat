import Dictionary from "../util/Dictionary";

interface IMetadataEnricher {
    enrich(command?:Object, metadata?:Dictionary<any>):Dictionary<any>
}

export default IMetadataEnricher