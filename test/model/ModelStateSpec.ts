import expect = require("expect.js");
import * as Rx from "rx";
import SinonStub = Sinon.SinonStub;
import SinonSpy = Sinon.SinonSpy;
import StateViewModel from "../fixtures/viewmodels/StateViewModel";
import ModelState from "../../scripts/viewmodels/ModelState";

describe("ModelState, given a viewmodel", () => {

    let subject:StateViewModel;

    beforeEach(() => {
        subject = new StateViewModel();
    });

    context("when a ready state is pushed into the viewmodel", () => {
        it("should notify that new data is available", () => {
            subject.observe(Rx.Observable.just(ModelState.Ready(10)));
            expect(subject.models).to.eql([10]);
        });
    });

    context("when a loading state is pushed into the viewmodel", () => {
        it("should notify that it's loading new data", () => {
            subject.observe(Rx.Observable.just(ModelState.Loading()));
            expect(subject.loading).to.be(true);
        });
    });

    context("when a failed state is pushed into the viewmodel", () => {
        it("should notify that it has failed loading new data", () => {
            subject.observe(Rx.Observable.just(ModelState.Failed(new Error())));
            expect(subject.failure instanceof Error).to.be(true);
        });
    });
});
