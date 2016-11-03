import FeatureToggle from "../../scripts/feature-toggle/FeatureToggleDecorator";
import {enabled, environment, version, compose} from "../../scripts/feature-toggle/Validations";

@FeatureToggle(enabled)
export class AlwaysValid {

}

@FeatureToggle(version("2.0.0"))
export class VersionToggle {

}

@FeatureToggle(environment(["dev", "test"]))
export class EnvToggle {

}

export class NotDecoratedToggle {

}

@FeatureToggle(compose(environment(["dev", "test"]), version("2.0.0")))
export class MixedToggle {

}