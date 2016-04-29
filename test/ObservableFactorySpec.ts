/// <reference path="../typings/browser.d.ts" />
import expect = require("expect.js");
import * as Rx from "rx";
import IObservableFactory from "../scripts/viewmodels/IObservableFactory";
import ObservableFactory from "../scripts/viewmodels/ObservableFactory";

describe("ObservableFactory, given a viewmodel id", () => {

    let subject: IObservableFactory;
    let dataEmitted: number[];

    beforeEach(() => {
        subject = new ObservableFactory();
        dataEmitted = [];
    });

    context("when the corresponding observable should be retrieved", () => {
        it("should construct the right observable", () => {
            let dataSubject = new Rx.Subject<number>();
            dataSubject.subscribe(data => dataEmitted.push(data));
            subject.register<number>("Foo", parameters => {
                dataSubject.onNext(parameters.counter);
                return dataSubject;
            });
            subject.get<number>("Foo", { counter: 20 });

            expect(dataEmitted).to.eql([20]);
        });
    });
});
