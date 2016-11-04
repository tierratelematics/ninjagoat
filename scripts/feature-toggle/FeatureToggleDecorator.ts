import CheckPredicate from "./CheckPredicate";

function FeatureToggle(checkPredicate:CheckPredicate) {
    return function (target:any) {
        Reflect.defineMetadata("__featuretoggle_predicate", checkPredicate, target);
        return target;
    };
}

export default FeatureToggle