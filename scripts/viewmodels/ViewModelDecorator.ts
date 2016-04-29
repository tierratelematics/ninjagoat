function ViewModel(name:string) {
    return function (target:any) {
        Reflect.defineMetadata("ninjagoat:viewmodel", name, target);
        return target;
    };
}

export default ViewModel;