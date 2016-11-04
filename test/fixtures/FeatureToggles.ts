import FeatureToggle from "../../scripts/feature-toggle/FeatureToggleDecorator";
import {always, environment, version, compose} from "../../scripts/feature-toggle/Checks";

@FeatureToggle(always)
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