import "reflect-metadata";
import {IMock, Mock, Times, It} from "typemoq";
import expect = require("expect.js");
import INavigationManager from "../scripts/navigation/INavigationManager";
import NavigationManager from "../scripts/navigation/NavigationManager";
import ILocationHandler from "../scripts/navigation/ILocationHandler";
import IViewModelRegistry from "../scripts/registry/IViewModelRegistry";
import BarViewModel from "./fixtures/viewmodels/BarViewModel";
import RegistryEntry from "../scripts/registry/RegistryEntry";

describe("NavigationManager, given an area", () => {

    let subject: INavigationManager;
    let locationHandler: IMock<ILocationHandler>;
    let registry: IMock<IViewModelRegistry>;

    beforeEach(() => {
        registry = Mock.ofType<IViewModelRegistry>();
        locationHandler = Mock.ofType<ILocationHandler>();
        subject = new NavigationManager(locationHandler.object, registry.object);
    });

    context("when the area is the default one", () => {
        it("should navigate to the root page", () => {
            subject.navigate("Index");

            locationHandler.verify(l => l.changeLocation("/"), Times.once());
        });
    });

    context("when the area is not the default one", () => {
        it("should navigate to the corresponding url", () => {
            subject.navigate("Users");

            locationHandler.verify(l => l.changeLocation("/users"), Times.once());
        });

        context("and a viewmodel identifier is provided", () => {
            it("should navigate to the specific page", () => {
                subject.navigate("Users", "Bar");

                locationHandler.verify(l => l.changeLocation("/users/bar"), Times.once());
            });

            context("and some parameters needs to be passed to this page", () => {
                it("should append these parameters", () => {
                    registry.setup(r => r.getEntry("users", "bar")).returns(() => {
                        return {
                            area: "Users",
                            viewmodel: new RegistryEntry(BarViewModel, "Bar", null, ":bar/:subCategory")
                        }
                    });
                    subject.navigate("Users", "Bar", {
                        bar: 20,
                        subCategory: "foo"
                    });

                    locationHandler.verify(l => l.changeLocation("/users/bar/20/foo"), Times.once());
                });

                context("when a parameter is optional", () => {
                    it("should correctly substitute it", () => {
                        registry.setup(r => r.getEntry("fake", "bar")).returns(() => {
                            return {
                                area: "Fake",
                                viewmodel: new RegistryEntry(BarViewModel, "Bar", null, "(:bar)")
                            }
                        });
                        subject.navigate("Fake", "Bar", {
                            bar: 20
                        });

                        locationHandler.verify(l => l.changeLocation("/fake/bar/20"), Times.once());
                    });
                });

                context("when a required parameter is followed by an optional parameter", () => {
                    it("should correctly resolve the url", () => {
                        registry.setup(r => r.getEntry("fake", "bar")).returns(() => {
                            return {
                                area: "Fake",
                                viewmodel: new RegistryEntry(BarViewModel, "Bar", null, ":id/(:bar)")
                            }
                        });
                        subject.navigate("Fake", "Bar", {
                            id: 50
                        });

                        locationHandler.verify(l => l.changeLocation("/fake/bar/50/"), Times.once());
                    });
                });
            });
        });
    });
});
