import expect = require("expect.js");
import IFeatureChecker from "../scripts/feature-toggle/IFeatureChecker";
import FeatureChecker from "../scripts/feature-toggle/FeatureChecker";
import {AlwaysValid, EnvToggle, VersionToggle, NotDecoratedToggle, MixedToggle} from "./fixtures/FeatureToggles";

describe("Feature toggle, given a constructor decorated with a feature toggle", () => {

    let featureChecker:IFeatureChecker;

    beforeEach(() => {
        featureChecker = new FeatureChecker();
    });

    context("when it's always enabled", () => {
        it("should enable the feature", () => {
            expect(featureChecker.check(AlwaysValid)).to.be(true);
        });
    });

    context("when the decorator is missing", () => {
        it("should thrown an error", () => {
            expect(() => {
                featureChecker.check(NotDecoratedToggle);
            }).to.throwError();
        });
    });

    context("when an environment selector is applied", () => {
        context("and the current environment is present in the environments list", () => {
            beforeEach(() => process.env.NODE_ENV = "dev");
            it("should enable the feature", () => {
                expect(featureChecker.check(EnvToggle)).to.be(true);
            });
        });

        context("and the current environment is not present in the environments list", () => {
            beforeEach(() => process.env.NODE_ENV = "beta");
            it("should disable the feature", () => {
                expect(featureChecker.check(EnvToggle)).to.be(false);
            });
        });
    });

    context("when a version selector is applied", () => {
        context("and the current version is greater than the version selected", () => {
            beforeEach(() => process.env.PACKAGE_VERSION = "3.0.0");
            it("should enable the feature", () => {
                expect(featureChecker.check(VersionToggle)).to.be(true);
            });
        });

        context("and the current version is less than the version selected", () => {
            beforeEach(() => process.env.PACKAGE_VERSION = "1.5.8");
            it("should disable the feature", () => {
                expect(featureChecker.check(VersionToggle)).to.be(false);
            });
        });

        context("and the current version is the same of the version selected", () => {
            beforeEach(() => process.env.PACKAGE_VERSION = "2.0.0");
            it("should enable the feature", () => {
                expect(featureChecker.check(VersionToggle)).to.be(true);
            });
        });
    });

    context("when multiple selectors are applied", () => {
        context("and all the selectors are satisfied", () => {
            beforeEach(() => {
                process.env.PACKAGE_VERSION = "3.0.0";
                process.env.NODE_ENV = "dev";
            });
            it("should enable the feature", () => {
                expect(featureChecker.check(MixedToggle)).to.be(true);
            });
        });

        context("and some selectors are not satisfied", () => {
            beforeEach(() => {
                process.env.PACKAGE_VERSION = "1.0.0";
                process.env.NODE_ENV = "dev";
            });
            it("should disable the feature", () => {
                expect(featureChecker.check(MixedToggle)).to.be(false);
            });
        });
    });
});