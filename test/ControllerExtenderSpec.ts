import "reflect-metadata";

import {Mock, Times, It} from "typemoq";
import ObservableViewModel from "../scripts/observable/ObservableViewModel";
import ControllerFactoryExtender from "../scripts/observable/ControllerFactoryExtender";
import {ControllableViewModel} from "../scripts/observable/ObservableController";


type ControllableModel = ObservableViewModel<any> & ControllableViewModel;

describe("Given a controller extender", () => {

    let subject: ControllerFactoryExtender;

    beforeEach(() => {
        subject = new ControllerFactoryExtender();
    });

    context("when a viewmodel wants to receive a controller ", () => {
        context("when a controller has been provided during the registration", () => {
            it("should receive it", () => {
                let viewmodel = Mock.ofType<ControllableModel>();
                let controller = {
                    model: null,
                    refresh: () => null
                };
                subject.extend(viewmodel.object, null, controller);

                viewmodel.verify(v => v.onControllerReceived(It.isValue(controller)), Times.once());
            });
        });

        // FIXME: ?
        // context("when a controller has not been provided during the registration", () => {
        //     it("should not receive it", () => {
        //         let viewmodel = Mock.ofType<ControllableModel>();
        //         let controller =
        //
        //         subject.extend(viewmodel.object, null, );
        //
        //         viewmodel.verify(v => v.onControllerReceived(It.isAny()), Times.never());
        //     });
        // });
    });
});
