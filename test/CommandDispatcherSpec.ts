/// <reference path="../typings/browser.d.ts" />
import "reflect-metadata";
import "bluebird";
import expect = require("expect.js");
import Rx = require("rx");
import sinon = require("sinon");
import CommandDispatcher from "../scripts/commands/CommandDispatcher";
import MockCommandDispatcher from "./fixtures/commands/MockCommandDispatcher";
import SinonSandboxStatic = Sinon.SinonSandboxStatic;
import SinonSandbox = Sinon.SinonSandbox;
import * as MockCommands from "./fixtures/commands/MockCommands";

describe("Command dispatcher", () => {

    let subject:CommandDispatcher;
    let sandbox:SinonSandbox;

    beforeEach(() => {
        sandbox = sinon.sandbox.create();
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe("given a command", () => {
        context("when it's not decorated with path, transport or authentication", () => {
            it("should be sent with the first dispatcher available", () => {
                let subject = new MockCommandDispatcher(),
                    commandDispatcher2 = new MockCommandDispatcher(),
                    subjectSpy = sandbox.spy(subject, "internalExecute"),
                    commandDispatcher2Spy = sandbox.spy(commandDispatcher2, "internalExecute");
                subject.dispatch(new MockCommands.DefaultCommand());
                expect(subjectSpy.called).to.be(true);
                expect(commandDispatcher2Spy.called).to.be(false);
            });
        });

        context("when it's decorated using a different endpoint", () => {
            it("should route the command correctly", () => {
                
            });
        });

        context("when it's decorated using a different transport", () => {
            it("should use those transport", () => {
                
            });
        });

        context("when it's decorated using a different authentication strategy", () => {
            it("should authenticate correctly", () => {
                
            });
        });
    });
});