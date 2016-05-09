/// <reference path="../typings/browser.d.ts" />
import expect = require("expect.js");
import sinon = require("sinon");

describe("Model retriever, given an area and a viewmodel id", () => {

    context("when a viewmodel needs data to be loaded", () => {
        it("should send a loading state to the viewmodel");
    });

    context("when a loading state has been sent to the viewmodel", () => {
        it("should load the data");
    });

    context("if something bad happens while retrieving the data needed by the viewmodel", () => {
        it("should push a failed state to the viewmodel");
    });
});