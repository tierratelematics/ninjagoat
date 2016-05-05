import ISerializer from "./ISerializer";
import * as _ from "lodash";

class QuerySerializer implements ISerializer<{[index:string]:any}, string> {

    serialize(data:{[index:string]:any}):string {
        throw new Error("Not implemented");
    }

    deserialize(query:string):{[index:string]:any} {
        if (!query)
            return {};
        let parameters = query.split("&"),
            values = _.map(parameters, function (value) {
                var parts = value.split("=");
                return {
                    key: parts[0],
                    value: parts[1]
                };
            });
        return _.zipObject(_.map(values, 'key'), _.map(values, 'value'));
    }
}

export default QuerySerializer