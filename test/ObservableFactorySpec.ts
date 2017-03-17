import "reflect-metadata";
import expect = require("expect.js");
import {Subject} from "rx";
import IObservableFactory from "../scripts/viewmodels/IObservableFactory";
import ObservableFactory from "../scripts/viewmodels/ObservableFactory";

describe("ObservableFactory, given a viewmodel id", () => {

    let subject: IObservableFactory;
    let notifications: number[];

    beforeEach(() => {
        subject = new ObservableFactory();
        notifications = [];
    });

    context("when the corresponding observable should be retrieved", () => {
        it("should construct the right observable", () => {
            let dataSubject = new Subject<number>();
            dataSubject.subscribe(data => notifications.push(data));
            subject.register<number>("Foo", parameters => {
                dataSubject.onNext(parameters.counter);
                return dataSubject;
            });
            subject.get<number>("Foo", { counter: 20 });

            expect(notifications).to.eql([20]);
        });
    });
});
