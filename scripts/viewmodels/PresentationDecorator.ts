function Presentation(name:string) {
    return function (target:any) {
        Reflect.defineMetadata("ninjagoat:presentation", name, target);
        return target;
    };
}

export default Presentation