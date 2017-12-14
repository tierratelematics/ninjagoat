import "reflect-metadata";
import expect = require("expect.js");
import {IViewModelRegistry} from "../../scripts/registry/IViewModelRegistry";
import ViewModelRegistry from "../../scripts/registry/ViewModelRegistry";
import FooViewModel from "../fixtures/viewmodels/FooViewModel";
import BarViewModel from "../fixtures/viewmodels/BarViewModel";
import UnregisteredViewModel from "../fixtures/viewmodels/UnregisteredViewModel";
import {Screen} from "../../scripts/registry/Screen";

describe("ViewModelRegistry, given a list of ViewModel identifiers", () => {

    let registry: IViewModelRegistry;

    beforeEach(() => {
        registry = new ViewModelRegistry();
    });

    context("when registered for a specific area", () => {
        it("should assign such entries to the specified area", () => {
            let area = registry
                .add(Screen.forViewModel(FooViewModel))
                .add(Screen.forViewModel(BarViewModel))
                .forArea("Admin");

            expect(area.entries[0].id).to.eql("Foo");
            expect(area.entries[1].id).to.eql("Bar");
        });

        context("and custom parameters are needed", () => {
            it("should add such parameters to the entry as well", () => {
                let area = registry.add(Screen.forViewModel(FooViewModel).withParameters(":id")).forArea("Admin");

                expect(area.entries[0].id).to.eql("Foo");
                expect(area.entries[0].parameters).to.eql(":id");
            });
        });
    });

    context("when the root viewmodel has to be registered", () => {
        it("should be registered as a default in the registry", () => {
            registry.index(Screen.forViewModel(BarViewModel));

            expect(registry.getArea("Index").entries[0].id).to.eql("Bar");
        });
    });

    context("when the master application container viewmodel has to be registered", () => {
        it("should be registered as a default in the registry", () => {
            registry.master(Screen.forViewModel(BarViewModel));

            expect(registry.getArea("Master").entries[0].id).to.eql("Bar");
        });
    });

    context("when a registration is overridden", () => {
        it("should not duplicate the entry", () => {
            registry.add(Screen.forViewModel(FooViewModel)).add(Screen.forViewModel(BarViewModel)).forArea("Admin");
            registry.add(Screen.forViewModel(BarViewModel)).add(Screen.forViewModel(FooViewModel)).forArea("Admin");

            expect(registry.getArea("Admin").entries[0].id).to.eql("Bar");
        });
    });

    context("when requested to return the entries for a specific area", () => {
        it("should return only the entries pertaining to that area", () => {
            registry.add(Screen.forViewModel(FooViewModel)).add(Screen.forViewModel(BarViewModel)).forArea("Admin");

            expect(registry.getArea("Admin").entries[0].id).to.eql("Foo");
            expect(registry.getArea("Admin").entries[1].id).to.eql("Bar");
        });

        context("and the area identifier is case sensitive", () => {
            it("should transform it and return the entries pertaining", () => {
                registry.add(Screen.forViewModel(FooViewModel)).add(Screen.forViewModel(BarViewModel)).forArea("Admin");

                expect(registry.getArea("admin").entries[0].id).to.eql("Foo");
                expect(registry.getArea("admin").entries[1].id).to.eql("Bar");
            });
        });

        context("when the area does not exist", () => {
            it("should return an empty lookup", () => {
                let lookup = registry.getEntry("Test", "ViewModel");

                expect(lookup).to.eql({area: null, viewmodel: null});
            });
        });
    });

    context("when requested to return a specific entry", () => {
        it("should find and return it", () => {
            registry.add(Screen.forViewModel(FooViewModel)).add(Screen.forViewModel(BarViewModel)).forArea("Admin");

            expect(registry.getEntry("admin", "Bar").viewmodel.id).to.eql("Bar");
        });
    });

    context("when requested to return a specific entry passing its viewmodel", () => {
        it("should find and return it", () => {
            registry.add(Screen.forViewModel(FooViewModel)).add(Screen.forViewModel(BarViewModel)).forArea("Admin");
            let entry = registry.getEntry(FooViewModel);

            expect(entry.area).to.eql("Admin");
            expect(entry.viewmodel.construct).to.be(FooViewModel);
        });
    });

    context("when multiple areas are registered", () => {
        it("should return the list of those areas", () => {
            registry.add(Screen.forViewModel(FooViewModel)).forArea("Admin");
            registry.add(Screen.forViewModel(FooViewModel)).forArea("Users");
            let areas = registry.getAreas();

            expect(areas).to.have.length(2);
            expect(areas[0].area).to.be("Admin");
            expect(areas[1].area).to.be("Users");
        });
    });

    context("when a viewmodel name is not assigned", () => {
        it("should throw an error regarding the missing registration", () => {
            expect(() => {
                registry.add(Screen.forViewModel(UnregisteredViewModel)).forArea("Admin");
            }).to.throwError();
        });
    });
});
