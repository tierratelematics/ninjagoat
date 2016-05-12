function Refresh(target:any, propertyKey:string, descriptor:TypedPropertyDescriptor<any>) {
    let originalMethod = descriptor.value;
    descriptor.value = function (...args:any[]) {
        let result = originalMethod.apply(this, args);
        this.notifyChanged();
        return result;
    };

    return descriptor;
}

export default Refresh