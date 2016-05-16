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
import CommandDispatcherEnriched from "../../scripts/commands/CommandDispatcherEnriched";
import ICommandDispatcher from "../../scripts/commands/ICommandDispatcher";
import MockAuthCommandDispatcher from "../fixtures/commands/MockAuthCommandDispatcher";
import CommandEnvelope from "../../scripts/commands/CommandEnvelope";
import MockCommandEnricher from "../fixtures/commands/MockCommandEnricher";
import MockDateEnricher from "../fixtures/commands/MockDateEnricher";

describe("Command dispatcher enriched, given a list of enrichers", () => {

    let subject:ICommandDispatcher;
    let commandDispatcher:ICommandDispatcher;
    let dispatchSpy:SinonSpy;

    beforeEach(() => {
        commandDispatcher = new MockAuthCommandDispatcher();
        subject = new CommandDispatcherEnriched(commandDispatcher, [new MockCommandEnricher(), new MockDateEnricher()]);
        dispatchSpy = sinon.spy(commandDispatcher, "dispatch");
    });

    afterEach(() => {
        dispatchSpy.restore();
    });

    context("when a commands needs to be sent", () => {

        it("should append all the metadata provided by the enriches to that command", () => {
            let commandEnvelope = new CommandEnvelope<MockCommands.DefaultCommand>();
            commandEnvelope.payload = new MockCommands.DefaultCommand();
            commandEnvelope.metadata = {"guid": "fixed-id", "date": "2016-05-16T09:52:18Z"};
            subject.dispatch(new MockCommands.DefaultCommand());
            expect(dispatchSpy.calledWith(commandEnvelope)).to.be(true);
        });
    });
});