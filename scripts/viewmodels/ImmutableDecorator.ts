function ImmutableDecorator(target:Function) {
    Object.freeze(target);
    Object.freeze(target.prototype);
}

export default ImmutableDecorator