import "reflect-metadata";
import "bluebird";
import expect = require("expect.js");
import Rx = require("rx");
import IContextFactory from "../scripts/components/IContextFactory";
import ContextFactory from "../scripts/components/ContextFactory";
import IViewModelRegistry from "../scripts/registry/IViewModelRegistry";
import ViewModelRegistry from "../scripts/registry/ViewModelRegistry";
import BarView from "./fixtures/views/foo/Bar";
import RootView from "./fixtures/views/Index";
import IObservableFactory from "../scripts/viewmodels/IObservableFactory";
import ObservableFactory from "../scripts/viewmodels/ObservableFactory";
import IUriResolver from "../scripts/navigation/IUriResolver";
import UriResolver from "../scripts/navigation/UriResolver";
import IViewResolver from "../scripts/views/IViewResolver";
import ViewResolver from "../scripts/views/ViewResolver";
import FooIndex from "./fixtures/views/foo/FooIndex";
import BarViewModel from "./fixtures/viewmodels/BarViewModel";
import FooIndexViewModel from "./fixtures/viewmodels/FooIndexViewModel";
import RootViewModel from "./fixtures/viewmodels/RootViewModel";
import ViewModelFactory from "../scripts/viewmodels/ViewModelFactory";
import IViewModelFactory from "../scripts/viewmodels/IViewModelFactory";
import ViewModelContext from "../scripts/registry/ViewModelContext";
import MockObjectContainer from "./fixtures/MockObjectContainer";
import IndexViewModel from "./fixtures/viewmodels/IndexViewModel";
import {Index} from "../scripts/config/Area";
import * as Area from "../scripts/config/Area";
import MasterView from "./fixtures/views/Master";
import QuerySerializer from "../scripts/io/QuerySerializer";

describe("ContextFactory, given an URI", () => {

    let subject:IContextFactory;
    let registry:IViewModelRegistry;
    let factory:IViewModelFactory;
    let observableFactory:IObservableFactory;
    let uriResolver:IUriResolver;
    let viewResolver:IViewResolver;
    let container:MockObjectContainer;

    beforeEach(() => {
        container = new MockObjectContainer();
        registry = new ViewModelRegistry();
        factory = new ViewModelFactory(container);
        observableFactory = new ObservableFactory();
        uriResolver = new UriResolver(registry);
        viewResolver = new ViewResolver(require("./fixtures/views/export"));
        subject = new ContextFactory(uriResolver, viewResolver, factory, new QuerySerializer());

        observableFactory.register<number>("Bar", (context:ViewModelContext) => Rx.Observable.just(context.parameters.id));

        registry.master(RootViewModel);
        registry.index(IndexViewModel);
        registry
            .add(BarViewModel, parameters => observableFactory.get<number>("Bar", parameters), ":id")
            .add(FooIndexViewModel, parameters => observableFactory.get<number>("Bar", parameters))
            .forArea("Foo");
    });

    context("when it's composed by an area and a viewmodel", () => {
        it("should return the correct view and associated viewmodel", () => {
            let context = subject.contextFor<BarViewModel>("/foo/bar/25", {id: 25});

            expect(context.view).to.be(BarView);
            expect(context.viewmodel.models).to.eql([25]);
        });

        context("and there are some parameters in the query string", () => {
            it("should forward those parameters to the viewmodel", () => {
                let context = subject.contextFor<FooIndexViewModel>("/foo?id=30");
                expect(context.viewmodel.models).to.eql([30]);
            });
        });
    });

    context("when it's composed by only an area", () => {
        it("should return the correct area view and the associated viewmodel", () => {
            let context = subject.contextFor("/foo", {});

            expect(context.view).to.be(FooIndex);
            expect(context.viewmodel instanceof FooIndexViewModel).to.be(true);
        });
    });

    context("when it's composed by only the application root", () => {
        context("but a factory function was not supplied to the viewmodel registration", () => {
            it("should not construct the dependencies", () => {
                let context = subject.contextFor("/");

                expect(context.view).to.be(RootView);
                expect(context.viewmodel instanceof IndexViewModel).to.be(true);
            });
        });
    });

    context("when it's composed by the master application container", () => {
        it("should return the master context", () => {
            let context = subject.contextFor(Area.Master);

            expect(context.view).to.be(MasterView);
            expect(context.viewmodel instanceof RootViewModel).to.be(true);
        });
    });
});
