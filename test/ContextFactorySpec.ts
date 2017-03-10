import "reflect-metadata";
import expect = require("expect.js");
import {IMock, Mock, It, Times} from "typemoq";
import IContextFactory from "../scripts/components/IContextFactory";
import ContextFactory from "../scripts/components/ContextFactory";
import BarView from "./fixtures/views/foo/Bar";
import RootView from "./fixtures/views/Index";
import IUriResolver from "../scripts/navigation/IUriResolver";
import IViewResolver from "../scripts/views/IViewResolver";
import FooIndex from "./fixtures/views/foo/FooIndex";
import BarViewModel from "./fixtures/viewmodels/BarViewModel";
import FooIndexViewModel from "./fixtures/viewmodels/FooIndexViewModel";
import RootViewModel from "./fixtures/viewmodels/RootViewModel";
import IViewModelFactory from "../scripts/viewmodels/IViewModelFactory";
import IndexViewModel from "./fixtures/viewmodels/IndexViewModel";
import {Observable} from "rx";
import * as Area from "../scripts/registry/Area";
import MasterView from "./fixtures/views/Master";
import ISerializer from "../scripts/io/ISerializer";
import Dictionary from "../scripts/util/Dictionary";
import RegistryEntry from "../scripts/registry/RegistryEntry";

describe("ContextFactory, given an URI", () => {

    let subject: IContextFactory;
    let factory: IMock<IViewModelFactory>;
    let uriResolver: IMock<IUriResolver>;
    let viewResolver: IMock<IViewResolver>;
    let serializer: IMock<ISerializer<Dictionary<string>, string>>;

    beforeEach(() => {
        factory = Mock.ofType<IViewModelFactory>();
        uriResolver = Mock.ofType<IUriResolver>();
        viewResolver = Mock.ofType<IViewResolver>();
        serializer = Mock.ofType<ISerializer<Dictionary<string>,string>>();
        subject = new ContextFactory(uriResolver.object, viewResolver.object, factory.object, serializer.object);
    });

    context("when it's composed by an area and a viewmodel", () => {
        beforeEach(() => {
            viewResolver.setup(v => v.resolve(It.isAny(), It.isAny())).returns(() => BarView);
            uriResolver.setup(u => u.resolve(It.isAny())).returns(() => {
                return {
                    area: "Foo",
                    viewmodel: new RegistryEntry(BarViewModel, "Bar", null, null)
                }
            });
            factory.setup(f => f.create(It.isAny(), It.isAny(), It.isAny())).returns((context) => {
                let viewmodel = new BarViewModel();
                viewmodel.observe(Observable.just(context.parameters.id));
                return viewmodel;
            });
        });
        it("should return the correct view and associated viewmodel", () => {
            let context = subject.contextFor<BarViewModel>("/foo/bar/25", {id: 25});

            expect(context.view).to.be(BarView);
            expect(context.viewmodel.models).to.eql([25]);
        });

        context("and there are some parameters in the query string", () => {
            beforeEach(() => {
                serializer.setup(s => s.deserialize("id=30")).returns(() => {
                    return {id: "30"}
                });
            });

            it("should forward those parameters to the viewmodel", () => {
                let context = subject.contextFor<BarViewModel>("/foo/bar/?id=30");

                expect(context.viewmodel.models).to.eql(["30"]);
            });
        });
    });

    context("when it's composed by only an area", () => {
        beforeEach(() => {
            viewResolver.setup(v => v.resolve(It.isAny(), It.isAny())).returns(() => FooIndex);
            uriResolver.setup(u => u.resolve(It.isAny())).returns(() => {
                return {
                    area: "Foo",
                    viewmodel: new RegistryEntry(FooIndexViewModel, "FooIndex", null, null)
                }
            });
            factory.setup(f => f.create(It.isAny(), It.isAny(), It.isAny())).returns(() => new FooIndexViewModel());
        });
        it("should return the correct area view and the associated viewmodel", () => {
            let context = subject.contextFor("/foo", {});

            expect(context.view).to.be(FooIndex);
            expect(context.viewmodel instanceof FooIndexViewModel).to.be(true);
        });
    });

    context("when it's composed by only the application root", () => {
        beforeEach(() => {
            viewResolver.setup(v => v.resolve(It.isAny(), It.isAny())).returns(() => RootView);
            uriResolver.setup(u => u.resolve(It.isAny())).returns(() => {
                return {
                    area: "Index",
                    viewmodel: new RegistryEntry(IndexViewModel, "Index", null, null)
                }
            });
            factory.setup(f => f.create(It.isAny(), It.isAny(), It.isAny())).returns(() => new IndexViewModel());
        });
        context("but a factory function was not supplied to the viewmodel registration", () => {
            it("should not construct the dependencies", () => {
                let context = subject.contextFor("/");

                expect(context.view).to.be(RootView);
                expect(context.viewmodel instanceof IndexViewModel).to.be(true);
            });
        });
    });

    context("when it's composed by the master application container", () => {
        beforeEach(() => {
            viewResolver.setup(v => v.resolve(It.isAny(), It.isAny())).returns(() => MasterView);
            uriResolver.setup(u => u.resolve(It.isAny())).returns(() => {
                return {
                    area: "Master",
                    viewmodel: new RegistryEntry(RootViewModel, "Root", null, null)
                }
            });
            factory.setup(f => f.create(It.isAny(), It.isAny(), It.isAny())).returns(() => new RootViewModel());
        });
        it("should return the master context", () => {
            let context = subject.contextFor(Area.Master);

            expect(context.view).to.be(MasterView);
            expect(context.viewmodel instanceof RootViewModel).to.be(true);
        });
    });
});
