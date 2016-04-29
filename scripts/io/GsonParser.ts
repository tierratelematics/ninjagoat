import Parser from "./Parser";
import Gson from "./Gson";

class GsonParser<T> implements Parser<any, T> {

    private types: any | any[];

    constructor(types?: any | any[]) {
        this.types = types;
    }

    parse(data: any): T {
        return new Gson<T>(this.types).deserialize(data);
    }
}

export default GsonParser;
