/// <reference path="../typings/browser.d.ts" />
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

    let registry: IViewModelRegistry;
    let subject: IRoutingAdapter;
    let componentFactory: IPageComponentFactory;

    beforeEach(() => {
        registry = new ViewModelRegistry();
        componentFactory = new MockComponentFactory();
        subject = new RoutingAdapter(registry, componentFactory);
        registry.master(RootViewModel);
        registry.index(RootViewModel);
    });

    context("when the area is the index page", () => {

        it("should correctly add it into the list of routes produced", () => {
            expect(subject.routes()).to.eql({
                path: "/",
                component: null,
                indexRoute: { component: null},
                childRoutes: []
            });
        });
    });

    context("when it's the root of an area", () => {
        context("and it has no viewmodels registered", () => {
            it("should add the area to the the list of routes", () => {
                registry.add(FooIndexViewModel).forArea("Foo");

                expect(subject.routes()).to.eql({
                    path: "/",
                    component: null,
                    indexRoute: { component: null},
                    childRoutes: [{
                        path: "foo",
                        component: null
                    }]
                });
            });
        });

        context("and it needs some parameters when constructed", () => {
            it("should append those parameters", () => {
                registry.add(FooIndexViewModel, _ => null, ":id").forArea("Foo");

                expect(subject.routes()).to.eql({
                    path: "/",
                    component: null,
                    indexRoute: { component: null},
                    childRoutes: [{
                        path: "foo/:id",
                        component: null
                    }]
                });
            });
        });

        context("and it has some viewmodels registered", () => {
            it("should also add these viewmodels to the area registration", () => {
                registry.add(BarViewModel).forArea("Foo");

                expect(subject.routes()).to.eql({
                    path: "/",
                    component: null,
                    indexRoute: { component: null},
                    childRoutes: [
                        {
                            path: "foo/bar",
                            component: null
                        }]
                });
            });
        });

        context("and some parameters are registered for the corresponding viewmodel", () => {
            it("should add these parameters to the constructed path", () => {
                registry.add(BarViewModel, null, ":id/:subCategory").forArea("Foo");

                expect(subject.routes()).to.eql({
                    path: "/",
                    component: null,
                    indexRoute: { component: null},
                    childRoutes: [
                        {
                            path: "foo/bar/:id/:subCategory",
                            component: null
                        }]
                });
            });
        });
    });
});
