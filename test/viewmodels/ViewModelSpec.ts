import "reflect-metadata";
import expect = require("expect.js");
import BarViewModel from "../fixtures/viewmodels/BarViewModel";
import CrashViewModel from "../fixtures/viewmodels/CrashViewModel";
import {Subject, Subscription} from "rxjs";

describe("Given an ObservableViewModel", () => {

    let subject: BarViewModel;
    let modelSubject: Subject<number>;
    let notifications: void[];
    let notificationError: any;
    let notificationsCompleted;
    let subscription: Subscription;

    beforeEach(() => {
        modelSubject = new Subject<number>();
        subject = new BarViewModel();
        subject.observe(modelSubject);

        notifications = [];
        notificationError = null;
        notificationsCompleted = false;
        subscription = subject.subscribe(_ => notifications.push(null), error => notificationError = error, () => notificationsCompleted = true);
    });

    context("when it receives a new model", () => {
        beforeEach(() => {
            modelSubject.next(10);
        });

        it("should notify that new data is available", () => {
            expect(subject.models[0]).to.be(10);
        });

        it("should notify that data has been changed", () => {
            expect(notifications).to.not.be.empty();
        });

        context("and there is an error while processing it", () => {
            beforeEach(() => {
                subscription.unsubscribe();
                notifications = [];
                let crashViewModel = new CrashViewModel();
                crashViewModel.observe(modelSubject);
                crashViewModel.subscribe(_ => notifications.push(null), error => notificationError = error, () => notificationsCompleted = true);
            });

            it("the error should be propagated to the system", () => {
                expect(() => {
                    modelSubject.next(10);
                }).to.throwError();
            });

            it("should not notify that data has been changed", () => {
                try {
                    modelSubject.next(10);
                } catch (error) {
                    expect(notifications).to.be.empty();
                }
            });
        });
    });

    context("when it is not needed anymore", () => {
        beforeEach(() => {
            modelSubject.next(10);
            subject.dispose();
        });

        it("should dispose all the resources", () => {
            expect(notificationsCompleted).to.be(true);
        });

        context("and subsequent notifications are sent", () => {
            it("should ignore them", () => {
                expect(() => {
                    modelSubject.next(20);
                    expect(notifications.length).to.be(1);
                }).not.to.throwError();
            });
        });
    });

    context("when it receives an error from the model", () => {
        it("should notify the error to the subscribers", () => {
            modelSubject.error(new Error());

            expect(notificationError).not.to.be(null);
        });
    });

    context("when a method is marked with a refresh annotation", () => {
        context("and the method is not async", () => {
            it("should notify that the model has been changed", () => {
                subject.operateOnData();

                expect(notifications).to.have.length(1);
            });
        });
        context("and the method is async", () => {
            it("should notify that the model has been changed correctly", async() => {
                await subject.asyncOperation();

                expect(subject.async).to.be(true);
                expect(notifications).to.have.length(1);
            });
        });
    });
});
