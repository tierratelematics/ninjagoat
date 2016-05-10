import ISerializer from "./ISerializer";
import * as _ from "lodash";
import {injectable} from "inversify";

@injectable()
class QuerySerializer implements ISerializer<{[index:string]:string}, string> {

    serialize(data:{[index:string]:string}):string {
        throw new Error("Not implemented");
    }

    deserialize(query:string):{[index:string]:string} {
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
        return <{[index:string]:string}>_.zipObject(_.map(values, 'key'), _.map(values, 'value'));
    }
}

export default QuerySerializer