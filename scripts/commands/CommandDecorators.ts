import TransportEnum from "../constants/Transport";
import AuthenticationEnum from "../constants/Authentication";

function Transport(type:TransportEnum) {
    return function (target:any) {
        return target;
    };
}

function Endpoint(endpoint:string) {
    return function (target:any) {
        return target;
    };
}

function Authentication(type:AuthenticationEnum) {
    return function (target:any) {
        return target;
    };
}

export {Authentication}
export {Endpoint}
export {Transport}