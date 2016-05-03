import ISerializer from "./ISerializer";
import * as _ from "lodash";

class Gson<T> implements ISerializer<T, any> {

    private types: any[] = [];
    private instances: any[] = [];

    constructor(types?: any) {
        if (!_.isArray(types))
            types = _.compact([types]);
        _.forEach(types, type => this.registerType(type));
    }

    serialize(data: any): any {
        return JSON.stringify(data);
    }

    deserialize(data: any): T {
        if (_.isString(data))
            data = JSON.parse(data);
        let Type = this.findTypeOfObject(data);
        if (!Type)
            throw new Error("Cannot find a specific type for this data");
        return this.cycle(data);
    }

    registerType(type: any) {
        if (!_.includes(this.types, type))
            this.types.push(type);
        this.mapInstanceItems();
    }

    protected cycle(data: any) {
        let Type = this.findTypeOfObject(data),
            TObject = Type ? new Type() : {};

        if (_.isArray(data)) {
            TObject = [];
            _.forEach(data, item => {
                TObject.push(this.cycle({ obj: item }).obj);
            });
            return TObject;
        }
        if (!_.isObject(data)) {
            return data;
        }
        _.forEach(data, (value, key) => {
            if (_.isArray(value)) {
                TObject[key] = [];
                _.forEach(value, item => {
                    TObject[key].push(this.cycle(item));
                });
            } else if (_.isObject(value)) {
                TObject[key] = this.cycle(value);
            } else {
                TObject[key] = value;
            }
        });
        return TObject;
    }

    protected mapInstanceItems() {
        this.instances = _.map(this.types, Type => new Type());
    }

    protected findTypeOfObject(object: any) {
        if (_.isArray(object)) {
            object = object[0];
        }
        return _.find(this.types, (types, index) => this.containsAllFields(object, this.instances[index]));
    }

    protected containsAllFields(object: any, instance: any) {
        return _(object)
            .keys()
            .every(key => _.has(instance, key))
            .valueOf();
    }
}

export default Gson;
