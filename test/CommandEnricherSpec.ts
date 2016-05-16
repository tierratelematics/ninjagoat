/// <reference path="../typings/browser.d.ts" />
import "reflect-metadata";
import "bluebird";
import expect = require("expect.js");
import Rx = require("rx");
import sinon = require("sinon");
import * as Commands from "./fixtures/commands/MockCommands";
import ICommandEnricher from "../scripts/commands/ICommandEnricher";
import MockCommandEnricher from "./fixtures/commands/MockCommandEnricher";
import CommandEnvelope from "../scripts/commands/CommandEnvelope";

describe("Command enricher, given a list of enrichers", () => {

    let subject:ICommandEnricher;

    beforeEach(() => {
        subject = new MockCommandEnricher();
    });

    context("when a commands needs to be sent", () => {

        it("should enrich the command with metadata", () => {
            let envelope = new CommandEnvelope<Commands.DefaultCommand>();
            expect(subject.enrich(envelope).metadata).to.eql({"guid": "fixed-id"});
        });

        context("and some metadata where already added", () => {

            it("should merge the existing metadata with the new ones", () => {
                let envelope = new CommandEnvelope<Commands.DefaultCommand>();
                envelope.metadata = {"user": "existing-metadata"};
                expect(subject.enrich(envelope).metadata).to.eql({"guid": "fixed-id", "user": "existing-metadata"});
            });
        });
    });
});