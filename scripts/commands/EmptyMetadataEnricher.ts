import IMetadataEnricher from "./IMetadataEnricher";

class EmptyMetadataEnricher implements IMetadataEnricher {

    enrich<T>(metadata?:{[index:string]:any}):{[index:string]:any} {
        return metadata;
    }

}

export default EmptyMetadataEnricher