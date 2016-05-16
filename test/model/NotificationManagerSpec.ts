/// <reference path="../../typings/browser.d.ts" />
import expect = require("expect.js");
import sinon = require("sinon");
import NotificationManager from "../../scripts/notifications/NotificationManager";
import SinonStub = Sinon.SinonStub;
import MockSocketClient from "../fixtures/MockSocketClient";
import SinonFakeTimers = Sinon.SinonFakeTimers;
import * as Rx from "rx";
import ViewModelContext from "../../scripts/registry/ViewModelContext";

describe("NotificationManager, given an area and a viewmodel id", () => {

    let subject:NotificationManager;
    let client:SocketIOClient.Socket;
    let emitStub:SinonStub;
    let notificationsStreamStub:SinonStub;

    beforeEach(() => {
        client = new MockSocketClient();
        subject = new NotificationManager(() => Promise.resolve(client));
        emitStub = sinon.stub(client, "emit");
        notificationsStreamStub = sinon.stub(subject, "getNotificationStream", () => {
            return Rx.Observable.just({url: 'test'});
        });
    });

    afterEach(() => {
        notificationsStreamStub.restore();
        emitStub.restore();
    });

    context("when this viewmodel needs notifications about the model change", () => {
        it("should subscribe to the backend", (done) => {
            subject.notificationsFor(new ViewModelContext("Admin", "FakePage")).subscribe(_ => {
                expect(emitStub.calledWith('subscribe', {
                    area: "Admin",
                    viewmodelId: "FakePage",
                    parameters: undefined
                })).to.be(true);
                done();
            });
        });

        context("and custom parameters are needed on the backend side", () => {
            it("should also add these parameters to the subscription request", (done) => {
                subject.notificationsFor(new ViewModelContext("Admin", "FakePage", {id: 60})).subscribe(_ => {
                    expect(emitStub.calledWith('subscribe', {
                        area: "Admin",
                        viewmodelId: "FakePage",
                        parameters: {id: 60}
                    })).to.be(true);
                    done();
                });
            });
        });
    });

    context("when a notifications is not needed anymore", () => {
        it("should dispose the subscription", (done) => {
            let subscription = subject.notificationsFor(new ViewModelContext("Admin", "FakePage", {id: 60})).subscribe(() => {
                subscription.dispose();
                expect(emitStub.calledWith('unsubscribe', {
                    area: "Admin",
                    viewmodelId: "FakePage",
                    parameters: {id: 60}
                })).to.be(true);
                done();
            });
        });
    });
});