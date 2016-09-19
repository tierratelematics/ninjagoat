import {injectable, decorate} from "inversify";
import * as _ from "lodash";

function ViewModel(name:string|string[]) {
    return function (target:any) {
        decorate(injectable(), target);
        name = _.isArray(name) ? (<string[]>name).join(",") : name;
        Reflect.defineMetadata("ninjagoat:viewmodel", name, target);
        return target;
    };
}

export default ViewModel