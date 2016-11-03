import * as _ from "lodash";

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