interface IMetadataEnricher {
    enrich<T>(metadata?:{[index:string]:any}):{[index:string]:any}
}

export default IMetadataEnricher