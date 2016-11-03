import expect = require("expect.js");

describe("Feature toggle, given a constructor decorated with a feature toggle", () => {

    context("when it's always valid", () => {
        it("should enable the feature", () => {

        });
    });

    context("when an environment selector is applied", () => {
        context("and the current environment is present in the environments list", () => {
            it("should enable the feature", () => {

            });
        });

        context("and the current environment is not present in the environments list", () => {
            it("should disable the feature", () => {

            });
        });
    });

    context("when a date selector is applied", () => {
        context("and the current date is greater than the date selected", () => {
            it("should enable the feature", () => {

            });
        });

        context("and the current date is less than the date selected", () => {
            it("should disable the feature", () => {

            });
        });
    });

    context("when a version selector is applied", () => {
        context("and the current version is greater than the version selected", () => {
            it("should enable the feature", () => {

            });
        });

        context("and the current version is less than the version selected", () => {
            it("should disable the feature", () => {

            });
        });
    });
});