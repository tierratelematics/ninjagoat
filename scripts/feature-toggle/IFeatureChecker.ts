interface IFeatureChecker {
    check(feature:any):boolean;
    canCheck(feature:any):boolean;
}

export default IFeatureChecker