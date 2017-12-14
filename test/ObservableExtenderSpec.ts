import "reflect-metadata";
import {IMock, Mock, Times, It} from "typemoq";
import {Observable} from "rx";
import ObservableFactoryExtender from "../scripts/observable/ObservableFactoryExtender";
import ObservableViewModel from "../scripts/observable/ObservableViewModel";

describe("Given an observable extender", () => {

    let subject: ObservableFactoryExtender;
    let viewmodel: IMock<ObservableViewModel<any>>;

    beforeEach(() => {
        viewmodel = Mock.ofType<ObservableViewModel<any>>();
        subject = new ObservableFactoryExtender();
    });

    context("when a controller is provided", () => {
        it("should pass the data to the viewmodel", () => {
            let obs = Observable.empty();
            subject.extend(viewmodel.object, null, {
                model: obs,
                refresh: () => null
            });

            viewmodel.verify(v => v.observe(It.isValue(obs)), Times.once());
        });
    });
});
