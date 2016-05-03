import TransportEnum from "../constants/Transport";
import AuthenticationEnum from "../constants/Authentication";

function Transport(type:TransportEnum) {
    return function (target:any) {
        Reflect.defineMetadata("Transport", type, target);
        return target;
    };
}

function Endpoint(endpoint:string) {
    return function (target:any) {
        Reflect.defineMetadata("Endpoint", endpoint, target);
        return target;
    };
}

function Authentication(type:AuthenticationEnum) {
    return function (target:any) {
        Reflect.defineMetadata("Authentication", type, target);
        return target;
    };
}

export {Authentication}
export {Endpoint}
export {Transport}