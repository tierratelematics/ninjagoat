interface IFeatureValidator {
    validate(feature:any):boolean;
    canValidate(feature:any):boolean;
}

export default IFeatureValidator