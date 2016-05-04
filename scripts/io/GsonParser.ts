import IParser from "./IParser";
import Gson from "./Gson";

class GsonParser<T> implements IParser<any, T> {

    private types: any | any[];

    constructor(types?: any | any[]) {
        this.types = types;
    }

    parse(data: any): T {
        return new Gson<T>(this.types).deserialize(data);
    }
}

export default GsonParser;
