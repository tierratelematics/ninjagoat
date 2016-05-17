function Transport(type:string) {
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

function Authentication(type:string) {
    return function (target:any) {
        Reflect.defineMetadata("Authentication", type, target);
        return target;
    };
}

function Type(type:string) {
    return function (target:any) {
        Reflect.defineMetadata("Type", type, target);
        return target;
    };
}

export {Authentication}
export {Endpoint}
export {Transport}
export {Type}