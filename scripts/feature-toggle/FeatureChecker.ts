import IFeatureChecker from "./IFeatureChecker";
import CheckPredicate from "./CheckPredicate";

class FeatureChecker implements IFeatureChecker {

    check(feature:any):boolean {
        let predicate:CheckPredicate = Reflect.getMetadata("__featuretoggle_predicate", feature);
        if (!predicate)
            throw new Error("Missing predicate on feature");
        return predicate();
    }

    canCheck(feature:any):boolean {
        return !!Reflect.getMetadata("__featuretoggle_predicate", feature);
    }

}

export default FeatureChecker