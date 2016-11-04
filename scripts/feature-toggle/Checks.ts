import * as _ from "lodash";
import CheckPredicate from "./CheckPredicate";

export function always() {
    return true;
}

export function never() {
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

export function compose(p1:CheckPredicate, p2:CheckPredicate):() => boolean {
    return function () {
        return p1() && p2();
    }
}

export function negate(predicate:CheckPredicate):() => boolean {
    return function () {
        return !predicate();
    }
}