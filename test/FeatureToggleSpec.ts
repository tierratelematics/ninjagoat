import expect = require("expect.js");
import IFeatureValidator from "../scripts/feature-toggle/IFeatureValidator";
import FeatureValidator from "../scripts/feature-toggle/FeatureValidator";
import {AlwaysValid, EnvToggle, VersionToggle, NotDecoratedToggle} from "./fixtures/FeatureToggles";

describe("Feature toggle, given a constructor decorated with a feature toggle", () => {

    let featureValidator:IFeatureValidator;

    beforeEach(() => {
        featureValidator = new FeatureValidator();
    });

    context("when it's always enable", () => {
        it("should enable the feature", () => {
            expect(featureValidator.validate(AlwaysValid)).to.be(true);
        });
    });

    context("when the decorator is missing", () => {
        it("should thrown an error", () => {
            expect(() => {
                featureValidator.validate(NotDecoratedToggle);
            }).to.throwError();
        });
    });

    context("when an environment selector is applied", () => {
        context("and the current environment is present in the environments list", () => {
            beforeEach(() => process.env.NODE_ENV = "dev");
            it("should enable the feature", () => {
                expect(featureValidator.validate(EnvToggle)).to.be(true);
            });
        });

        context("and the current environment is not present in the environments list", () => {
            beforeEach(() => process.env.NODE_ENV = "beta");
            it("should disable the feature", () => {
                expect(featureValidator.validate(EnvToggle)).to.be(false);
            });
        });
    });

    context("when a version selector is applied", () => {
        context("and the current version is greater than the version selected", () => {
            beforeEach(() => process.env.PACKAGE_VERSION = "3.0.0");
            it("should enable the feature", () => {
                expect(featureValidator.validate(VersionToggle)).to.be(true);
            });
        });

        context("and the current version is less than the version selected", () => {
            beforeEach(() => process.env.PACKAGE_VERSION = "1.5.8");
            it("should disable the feature", () => {
                expect(featureValidator.validate(VersionToggle)).to.be(false);
            });
        });

        context("and the current version is the same of the version selected", () => {
            beforeEach(() => process.env.PACKAGE_VERSION = "2.0.0");
            it("should enable the feature", () => {
                expect(featureValidator.validate(VersionToggle)).to.be(true);
            });
        });
    });
});