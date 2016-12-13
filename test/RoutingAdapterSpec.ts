import "reflect-metadata";
import expect = require("expect.js");
import IViewModelRegistry from "../scripts/registry/IViewModelRegistry";
import IRoutingAdapter from "../scripts/navigation/IRoutingAdapter";
import ViewModelRegistry from "../scripts/registry/ViewModelRegistry";
import RoutingAdapter from "../scripts/navigation/RoutingAdapter";
import IPageComponentFactory from "../scripts/components/IComponentFactory";
import RootViewModel from "./fixtures/viewmodels/RootViewModel";
import FooIndexViewModel from "./fixtures/viewmodels/FooIndexViewModel";
import BarViewModel from "./fixtures/viewmodels/BarViewModel";
import MockComponentFactory from "./fixtures/MockComponentFactory";

describe("RoutingAdapter, given a list of registry entries", () => {

    let registry:IViewModelRegistry;
    let subject:IRoutingAdapter;
    let componentFactory:IPageComponentFactory;

    beforeEach(() => {
        registry = new ViewModelRegistry();
        componentFactory = new MockComponentFactory();
        subject = new RoutingAdapter(registry, componentFactory, null);
        registry.master(RootViewModel);
        registry.index(RootViewModel);
    });

    context("when the area is the index page", () => {

        it("should correctly add it into the list of routes produced", () => {
            let routes = subject.routes();
            expect(routes.path).to.eql("/");
            expect(routes.childRoutes).to.eql([]);
        });
    });

    context("when it's the root of an area", () => {
        context("and it has no viewmodels registered", () => {
            it("should add the area to the the list of routes", () => {
                registry.add(FooIndexViewModel).forArea("Foo");
                let routes = subject.routes();

                expect(routes.path).to.eql("/");
                expect(routes.childRoutes[0].path).to.eql("foo");
            });
        });

        context("and it needs some parameters when constructed", () => {
            it("should append those parameters", () => {
                registry.add(FooIndexViewModel, _ => null, ":id").forArea("Foo");
                let routes = subject.routes();

                expect(routes.path).to.eql("/");
                expect(routes.childRoutes[0].path).to.eql("foo/:id");
            });
        });

        context("and it has some viewmodels registered", () => {
            it("should also add these viewmodels to the area registration", () => {
                registry.add(BarViewModel).forArea("Foo");
                let routes = subject.routes();

                expect(routes.path).to.eql("/");
                expect(routes.childRoutes[0].path).to.eql("foo/bar");
            });
        });

        context("and some parameters are registered for the corresponding viewmodel", () => {
            beforeEach(() => registry.add(BarViewModel, null, ":id/:subCategory").forArea("Foo"));
            it("should add these parameters to the constructed path", () => {
                let routes = subject.routes();

                expect(routes.path).to.eql("/");
                expect(routes.childRoutes[0].path).to.eql("foo/bar/:id/:subCategory");
            });
        });
    });

    context("when a not found page is present", () => {
        beforeEach(() => {
            registry.add(BarViewModel, null, ":id/:subCategory").forArea("Foo");
            registry.notFound(BarViewModel);
        });
        it("should add a 404 handler to the routing", () => {
            let routes = subject.routes();

            expect(routes.path).to.eql("/");
            expect(routes.childRoutes[0].path).to.eql("foo/bar/:id/:subCategory");
            expect(routes.childRoutes[1].path).to.eql("*");
        });
    });
});
