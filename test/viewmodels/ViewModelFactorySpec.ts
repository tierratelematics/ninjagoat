import "reflect-metadata";
import expect = require("expect.js");
import {IMock, Mock, Times, It} from "typemoq";
import IObjectContainer from "../../scripts/ioc/IObjectContainer";
import {IViewModelFactoryExtender, ViewModelFactory} from "../../scripts/viewmodels/ViewModelFactory";
import ViewModelContext from "../../scripts/registry/ViewModelContext";
import BarViewModel from "../fixtures/viewmodels/BarViewModel";
import ObservableViewModel from "../../scripts/viewmodels/ObservableViewModel";
import {Observable} from "rx";

describe("Given a viewmodel factory", () => {

    let subject: ViewModelFactory;
    let objectContainer: IMock<IObjectContainer>;

    beforeEach(() => {
        objectContainer = Mock.ofType<IObjectContainer>();
        objectContainer.setup(o => o.get(It.isAny())).returns(() => new BarViewModel());
    });

    context("when some extensions are present", () => {
        let extender: IMock<IViewModelFactoryExtender>;
        beforeEach(() => {
            extender = Mock.ofType<IViewModelFactoryExtender>();
            subject = new ViewModelFactory(objectContainer.object, [extender.object]);
        });
        it("should apply those extensions to the created viewmodel", () => {
            let viewmodel = subject.create(new ViewModelContext("Admin", "Bar"), BarViewModel, () => Observable.empty());

            extender.verify(e => e.extend(It.isValue(viewmodel), It.isValue(new ViewModelContext("Admin", "Bar")), It.isAny()), Times.once());
        });
    });

    context("when no extensions are present", () => {
        beforeEach(() => {
            subject = new ViewModelFactory(objectContainer.object, []);
        });
        it("should create the viewmodel as is", () => {
            let viewmodel = subject.create(new ViewModelContext("Admin", "Bar"), BarViewModel, () => Observable.empty());

            expect(viewmodel instanceof ObservableViewModel).to.be(true);
        });
    });
});
