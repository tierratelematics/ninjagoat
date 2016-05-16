import IMetadataEnricher from "../../../scripts/commands/IMetadataEnricher";

class MockDateEnricher implements IMetadataEnricher {

    enrich<T>(metadata?:{[index:string]:any}):{[index:string]:any} {
        return _.merge({}, metadata, {"date": "2016-05-16T09:52:18Z"});
    }
}

export default MockDateEnricher