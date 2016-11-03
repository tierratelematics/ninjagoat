import IValidationPredicate from "./IValidationPredicate";

function FeatureToggle(validationPredicate:IValidationPredicate) {
    return function (target:any) {
        Reflect.defineMetadata("__featuretoggle_predicate", validationPredicate, target);
        return target;
    };
}

export default FeatureToggle