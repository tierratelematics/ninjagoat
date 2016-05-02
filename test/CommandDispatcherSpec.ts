/// <reference path="../typings/browser.d.ts" />
import "reflect-metadata";
import "bluebird";
import expect = require("expect.js");
import Rx = require("rx");

describe("Command dispatcher", () => {

    describe("given a command", () => {
        context("when it's decorated using the default values", () => {
            it("should be sent with the first dispatcher available");
        });

        context("when it's decorated using a different endpoint", () => {
            it("should route the command correctly");
        });

        context("when it's decorated using a different transport", () => {
            it("should use those transport");
        });

        context("when it's decorated using a different authentication strategy", () => {
            it("should authenticate correctly");
        });
    });
});