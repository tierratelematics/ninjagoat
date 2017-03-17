import ISerializer from "./ISerializer";
import * as _ from "lodash";
import {injectable} from "inversify";
import Dictionary from "../util/Dictionary";

@injectable()
class QuerySerializer implements ISerializer<Dictionary<string>, string> {

    serialize(data:Dictionary<string>):string {
        throw new Error("Not implemented");
    }

    deserialize(query:string):Dictionary<string>{
        if (!query)
            return {};
        let parameters = query.split("&"),
            values = _.map(parameters, function (value) {
                let parts = value.split("=");
                return {
                    key: parts[0],
                    value: parts[1]
                };
            });
        return <Dictionary<string>>_.zipObject(_.map(values, 'key'), _.map(values, 'value'));
    }
}

export default QuerySerializer