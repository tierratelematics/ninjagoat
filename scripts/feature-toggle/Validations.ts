import * as _ from "lodash";
import IValidationPredicate from "./IValidationPredicate";

export function enabled() {
    return true;
}

export function disabled() {
    return false;
}

export function environment(environments:string[]):() => boolean {
    return function () {
        return _.includes(environments, process.env.NODE_ENV);
    }
}

export function version(version:string):() => boolean {
    return function () {
        return process.env.PACKAGE_VERSION >= version;
    }
}

export function compose(p1:IValidationPredicate, p2:IValidationPredicate):() => boolean {
    return function () {
        return p1() && p2();
    }
}