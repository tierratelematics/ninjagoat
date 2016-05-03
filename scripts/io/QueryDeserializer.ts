import * as _ from "lodash";

class QueryDeserializer {
    static deserialize(query:string):{} {
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

export default QueryDeserializer