/// <reference path="../typings/browser.d.ts" />
import expect = require("expect.js");
import * as sinon from "sinon";
import * as Rx from "rx";
import SinonStub = Sinon.SinonStub;
import SinonSpy = Sinon.SinonSpy;
import BarViewModel from "./fixtures/viewmodels/BarViewModel";

describe("Given an ObservableViewModel", () => {

    let subject: BarViewModel;
    let modelSubject;
    let notifications: void[];
    let notificationError: any;
    let notificationsCompleted;

    beforeEach(() => {
        modelSubject = new Rx.Subject<number>();
        subject = new BarViewModel();
        subject.observe(modelSubject);

        notifications = [];
        notificationError = null;
        notificationsCompleted = false;
        subject.subscribe(_ => notifications.push(null), error => notificationError = error, () => notificationsCompleted = true);
    });

    context("when it receives a new model", () => {

        beforeEach(() => {
            modelSubject.onNext(10);
        });

        it("should notify that new data is available", () => {
            expect(subject.models[0]).to.be(10);
        });

        it("should notify that data has been changed", () => {
            expect(notifications).to.not.be.empty();
        });

        context("and there is an error while processing it", () => {

            let stub: SinonStub;

            beforeEach(() => {
                notifications = [];
                stub = sinon.stub(subject, "onData", () => {
                    throw new Error();
                });
            });

            it("the error should be propagated to the system", () => {
                expect(() => {
                    modelSubject.onNext(10);
                }).to.throwError();
            });

            it("should not notify that data has been changed", () => {
                try {
                    modelSubject.onNext(10);
                } catch (error) {
                    expect(notifications).to.be.empty();
                }
            });
        });
    });

    context("when it receives the completion for the model", () => {

        let disposeSpy: SinonSpy;

        beforeEach(() => {
            disposeSpy = sinon.spy(subject, "dispose");
            modelSubject.onNext(10);
            modelSubject.onCompleted();
        });

        afterEach(() => {
            disposeSpy.restore();
        });

        it("should complete itself as well", () => {
            expect(notificationsCompleted).to.be(true);
        });

        it("should dispose itself", () => {
            expect(disposeSpy.calledOnce).to.be(true);
        });

        context("and subsequent notifications are sent", () => {
            it("should ignore them", () => {
                expect(() => {
                    modelSubject.onNext(20);
                    expect(notifications.length).to.be(1);
                }).not.to.throwError();
            });
        });
    });

    context("when it receives an error from the model", () => {
        it("should notify the error to the subscribers", () => {
            modelSubject.onError(new Error());

            expect(notificationError).not.to.be(null);
        });
    });
});
