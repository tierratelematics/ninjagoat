/// <reference path="../typings/browser.d.ts" />
import expect = require("expect.js");
import sinon = require("sinon");
import NotificationManager from "../scripts/notifications/NotificationManager";
import SinonStub = Sinon.SinonStub;
import MockSocketClient from "./fixtures/MockSocketClient";

describe("NotificationManager, given an area and a viewmodel id", () => {

    let subject:NotificationManager;
    let client:SocketIOClient.Socket;
    let emitStub:SinonStub;

    beforeEach(() => {
        client = new MockSocketClient();
        subject = new NotificationManager();
        subject.setClient(client);
        emitStub = sinon.stub(client, "emit");
    });

    afterEach(() => {
        emitStub.restore();
    });

    context("when this viewmodel needs notifications about the model change", () => {
        it("should subscribe to the backend", () => {
            subject.notificationsFor("Admin", "FakePage");
            expect(emitStub.calledWith('subscribe', {
                area: "Admin",
                viewmodelId: "FakePage",
                parameters: undefined
            })).to.be(true);
        });

        context("and custom parameters are needed on the backend side", () => {
            it("should also add these parameters to the subscription request", () => {
                subject.notificationsFor("Admin", "FakePage", {id: 60});
                expect(emitStub.calledWith('subscribe', {
                    area: "Admin",
                    viewmodelId: "FakePage",
                    parameters: {id: 60}
                })).to.be(true);
            });
        });
    });

    context("when a notifications is not needed anymore", () => {
        it("should dispose the subscription", () => {
            let subscription = subject.notificationsFor("Admin", "FakePage", {id: 60}).subscribe(() => {
            });
            subscription.dispose();
            expect(emitStub.calledWith('unsubscribe', {
                area: "Admin",
                viewmodelId: "FakePage",
                parameters: {id: 60}
            })).to.be(true);
        });
    });
});