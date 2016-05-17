import Command from "./Command";

interface IMetadataEnricher {
    enrich<T extends Command>(command?:T, metadata?:{[index:string]:any}):{[index:string]:any}
}

export default IMetadataEnricher