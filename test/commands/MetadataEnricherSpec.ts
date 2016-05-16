/// <reference path="../../typings/browser.d.ts" />
import "reflect-metadata";
import "bluebird";
import expect = require("expect.js");
import Rx = require("rx");
import sinon = require("sinon");
import IMetadataEnricher from "../../scripts/commands/IMetadataEnricher";
import MockCommandEnricher from "../fixtures/commands/MockMetadataEnricher";

describe("Metadata enricher, given a list of enrichers", () => {

    let subject:IMetadataEnricher;

    beforeEach(() => {
        subject = new MockCommandEnricher();
    });

    context("and no metadata where already added", () => {
        it("should enrich the command with metadata", () => {
            expect(subject.enrich()).to.eql({"guid": "fixed-id"});
        });
    });

    context("and some metadata where already added", () => {
        it("should merge the existing metadata with the new ones", () => {
            expect(subject.enrich({"user": "existing-metadata"})).to.eql({
                "guid": "fixed-id",
                "user": "existing-metadata"
            });
        });
    });
});