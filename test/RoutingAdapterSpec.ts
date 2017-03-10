import "reflect-metadata";
import expect = require("expect.js");
import {IMock, Mock, It} from "typemoq";
import IViewModelRegistry from "../scripts/registry/IViewModelRegistry";
import IRoutingAdapter from "../scripts/navigation/IRoutingAdapter";
import RoutingAdapter from "../scripts/navigation/RoutingAdapter";
import IPageComponentFactory from "../scripts/components/IComponentFactory";
import RootViewModel from "./fixtures/viewmodels/RootViewModel";
import FooIndexViewModel from "./fixtures/viewmodels/FooIndexViewModel";
import BarViewModel from "./fixtures/viewmodels/BarViewModel";
import AreaRegistry from "../scripts/registry/AreaRegistry";
import RegistryEntry from "../scripts/registry/RegistryEntry";
import * as _ from "lodash";

describe("RoutingAdapter, given a list of registry entries", () => {

    let registry: IMock<IViewModelRegistry>;
    let subject: IRoutingAdapter;
    let componentFactory: IMock<IPageComponentFactory>;
    let baseViewModels: AreaRegistry[] = [
        new AreaRegistry("Master", [
            new RegistryEntry<any>(RootViewModel, "Root", null, null)
        ]),
        new AreaRegistry("Index", [
            new RegistryEntry<any>(RootViewModel, "Root", null, null)
        ])
    ];

    beforeEach(() => {
        registry = Mock.ofType<IViewModelRegistry>();
        componentFactory = Mock.ofType<IPageComponentFactory>();
        componentFactory.setup(c => c.componentForUri(It.isAny())).returns(() => null);
        componentFactory.setup(c => c.componentForMaster()).returns(() => null);
        componentFactory.setup(c => c.componentForNotFound()).returns(() => null);
        subject = new RoutingAdapter(registry.object, componentFactory.object, null);
    });

    context("when the area is the index page", () => {
        beforeEach(() => registry.setup(r => r.getAreas()).returns(() => baseViewModels));
        it("should correctly add it into the list of routes produced", () => {
            let routes = subject.routes();

            expect(routes.path).to.eql("/");
            expect(routes.childRoutes).to.eql([]);
        });
    });

    context("when it's the root of an area", () => {
        context("and it has no viewmodels registered", () => {
            beforeEach(() => registry.setup(r => r.getAreas()).returns(() => _.union(baseViewModels, [
                new AreaRegistry("Foo", [
                    new RegistryEntry<any>(FooIndexViewModel, "FooIndex", null, null)
                ])
            ])));
            it("should add the area to the the list of routes", () => {
                let routes = subject.routes();

                expect(routes.path).to.eql("/");
                expect(routes.childRoutes[0].path).to.eql("foo");
            });
        });

        context("and it needs some parameters when constructed", () => {
            beforeEach(() => registry.setup(r => r.getAreas()).returns(() => _.union(baseViewModels, [
                new AreaRegistry("Foo", [
                    new RegistryEntry<any>(FooIndexViewModel, "FooIndex", null, ":id")
                ])
            ])));
            it("should append those parameters", () => {
                let routes = subject.routes();

                expect(routes.path).to.eql("/");
                expect(routes.childRoutes[0].path).to.eql("foo/:id");
            });
        });

        context("and it has some viewmodels registered", () => {
            beforeEach(() => registry.setup(r => r.getAreas()).returns(() => _.union(baseViewModels, [
                new AreaRegistry("Foo", [
                    new RegistryEntry<any>(BarViewModel, "Bar", null, null)
                ])
            ])));
            it("should also add these viewmodels to the area registration", () => {
                let routes = subject.routes();

                expect(routes.path).to.eql("/");
                expect(routes.childRoutes[0].path).to.eql("foo/bar");
            });
        });

        context("and some parameters are registered for the corresponding viewmodel", () => {
            beforeEach(() => registry.setup(r => r.getAreas()).returns(() => _.union(baseViewModels, [
                new AreaRegistry("Foo", [
                    new RegistryEntry<any>(BarViewModel, "Bar", null, ":id/:subCategory")
                ])
            ])));
            it("should add these parameters to the constructed path", () => {
                let routes = subject.routes();

                expect(routes.path).to.eql("/");
                expect(routes.childRoutes[0].path).to.eql("foo/bar/:id/:subCategory");
            });
        });
    });

    context("when a not found page is present", () => {
        beforeEach(() => {
            registry.setup(r => r.getAreas()).returns(() => _.union(baseViewModels, [
                new AreaRegistry("Foo", [
                    new RegistryEntry<any>(BarViewModel, "Bar", null, ":id/:subCategory")
                ])
            ]));
            registry.setup(r => r.getArea("NotFound")).returns(() => new AreaRegistry("NotFound", [
                new RegistryEntry<any>(BarViewModel, "Bar", null, null)
            ]));
        });
        it("should add a 404 handler to the routing", () => {
            let routes = subject.routes();

            expect(routes.path).to.eql("/");
            expect(routes.childRoutes[0].path).to.eql("foo/bar/:id/:subCategory");
            expect(routes.childRoutes[1].path).to.eql("*");
        });
    });
});
