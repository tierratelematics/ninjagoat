/// <reference path="../typings/browser.d.ts" />
import expect = require("expect.js");
import ViewModelRegistry from "../scripts/registry/ViewModelRegistry";
import IViewModelRegistry from "../scripts/registry/IViewModelRegistry";
import IUriResolver from "../scripts/navigation/IUriResolver";
import UriResolver from "../scripts/navigation/UriResolver";
import BarViewModel from "./fixtures/viewmodels/BarViewModel";
import FooIndexViewModel from "./fixtures/viewmodels/FooIndexViewModel";
import IndexViewModel from "./fixtures/viewmodels/IndexViewModel";
import RootViewModel from "./fixtures/viewmodels/RootViewModel";
import * as Area from "../scripts/constants/Area";

describe("UriResolver, given an URI", () => {

    let registry:IViewModelRegistry;
    let subject:IUriResolver;

    beforeEach(() => {
        registry = new ViewModelRegistry();
        subject = new UriResolver(registry);
    });

    context("when there are no parameters", () => {

        beforeEach(() => {
            registry.add(BarViewModel).forArea("Admin");
        });

        it("should return the corresponding viewmodel identifier", () => {
            let resource = subject.resolve("/admin/bar");

            expect(resource.viewmodel.id).to.be("Bar");
        });
    });

    context("when it contains some parameters", () => {

        beforeEach(() => {
            registry.add(BarViewModel, null, ":id/:subCategory").forArea("Admin");
        });

        it("should return the corresponding viewmodel identifier and the parameters", () => {
            let resource = subject.resolve("/admin/bar/25/56");

            expect(resource.area).to.be("Admin");
            expect(resource.viewmodel.id).to.be("Bar");
            expect(resource.viewmodel.parameters).to.be(":id/:subCategory");
        });
    });

    context("when it's the root of an area", () => {
        context("and there is a specific Index viewmodel associated", () => {

            beforeEach(() => {
                registry.add(FooIndexViewModel).forArea("Foo");
            });

            it("should return the viewmodel identifier composed by the name of the area plus Index", () => {
                let resource = subject.resolve("/foo");

                expect(resource.viewmodel.id).to.be("FooIndex");
            });
        });

        context("and there is not a specific Index viewmodel associated", () => {

            beforeEach(() => {
                registry.add(IndexViewModel).forArea("Admin");
            });

            it("should return the Index viewmodel identifier", () => {
                let resource = subject.resolve("/admin");

                expect(resource.viewmodel.id).to.be("Index");
            });
        });
    });

    context("when it's the root of the application", () => {
        context("when it's registered with the standard Index name", () => {

            beforeEach(() => {
                registry.index(IndexViewModel);
            });

            it("should return the Index viewmodel identifier", () => {
                let resource = subject.resolve("/");

                expect(resource.area).to.be("Index");
                expect(resource.viewmodel.id).to.be("Index");
            });
        });

        context("when it's registered with a name different than index", () => {

            beforeEach(() => {
                registry.index(RootViewModel);
            });

            it("should return the Index viewmodel identifier", () => {
                let resource = subject.resolve("/");

                expect(resource.area).to.be("Index");
                expect(resource.viewmodel.id).to.be("Root");
            });
        });
    });

    context("when it's the master application container", () => {
        it("should return the master viewmodel identifier", () => {
            registry.master(RootViewModel);
            let resource = subject.resolve(Area.Master);

            expect(resource.area).to.be(Area.Master);
            expect(resource.viewmodel.id).to.be("Root");
        })
    });

    context("when the uri contains some query string parameters", () => {
        it("should ignore those parameters during the uri resolution", () => {
            registry.add(FooIndexViewModel).forArea("Foo");
            let resource = subject.resolve("/foo?id=20");

            expect(resource.viewmodel.id).to.be("FooIndex");
        });
    });
});
