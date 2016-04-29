class PaginationObject {
    public epcrs: {
        fields: string[],
        pagination: string[]
    } = {
        fields: [],
        pagination: []
    };
    public entries = [];

    getEpcrs() {
        return this.epcrs;
    }

    getEntries() {
        return this.entries;
    }
}

export default PaginationObject;
