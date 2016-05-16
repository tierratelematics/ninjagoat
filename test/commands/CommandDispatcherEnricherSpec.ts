/// <reference path="../../typings/browser.d.ts" />
import "reflect-metadata";
import "bluebird";
import expect = require("expect.js");
import Rx = require("rx");
import sinon = require("sinon");
import SinonSandboxStatic = Sinon.SinonSandboxStatic;
import SinonSandbox = Sinon.SinonSandbox;
import * as MockCommands from "../fixtures/commands/MockCommands";
import SinonSpy = Sinon.SinonSpy;
import CommandDispatcherEnriched from "../../scripts/commands/CommandDispatcherEnricher";
import ICommandDispatcher from "../../scripts/commands/ICommandDispatcher";
import MockAuthCommandDispatcher from "../fixtures/commands/MockAuthCommandDispatcher";
import MockMetadataEnricher from "../fixtures/commands/MockMetadataEnricher";
import MockDateEnricher from "../fixtures/commands/MockDateEnricher";

describe("Command dispatcher enricher, given a list of enrichers", () => {

    let subject:ICommandDispatcher;
    let commandDispatcher:ICommandDispatcher;
    let dispatchSpy:SinonSpy;

    beforeEach(() => {
        commandDispatcher = new MockAuthCommandDispatcher();
        subject = new CommandDispatcherEnriched(commandDispatcher, [new MockMetadataEnricher(), new MockDateEnricher()]);
        dispatchSpy = sinon.spy(commandDispatcher, "dispatch");
    });

    afterEach(() => {
        dispatchSpy.restore();
    });

    context("when a commands needs to be sent", () => {
        it("should append all the metadata provided by the enriches to that command", () => {
            subject.dispatch(new MockCommands.DefaultCommand());
            expect(dispatchSpy.calledWith(new MockCommands.DefaultCommand(), {
                "guid": "fixed-id",
                "date": "2016-05-16T09:52:18Z"
            })).to.be(true);
        });
    });
});