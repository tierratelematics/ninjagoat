import * as _ from "lodash";

export function enabled() {
    return true;
}

export function environment(environments:string[]) {
    return function () {
        return _.includes(environments, process.env.NODE_ENV);
    }
}

export function version(version:string) {
    return function () {
        return process.env.PACKAGE_VERSION >= version;
    }
}