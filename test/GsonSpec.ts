/// <reference path="../typings/browser.d.ts" />
import expect = require("expect.js");
import TestModel from "./fixtures/gson/TestModel";
import Gson from "../scripts/io/Gson";
import Country from "./fixtures/gson/Country";
import PaginationObject from "./fixtures/gson/PaginationObject";

describe("GSON, given a type", function () {
    context("when a valid json object is supplied", () => {
        it("must be deserialized into such type", () => {
            let gson = new Gson<TestModel>(TestModel),
                json = {
                    user: "john",
                    password: "doe"
                };
            let obj = gson.deserialize(json);

            expect(obj.user).to.eql("john");
            expect(obj.password).to.eql("doe");
        });

        context("but the type is not registered", () => {
            it("should throw an error regarding that such type is not found", () => {
                expect(() => {
                    let gson = new Gson<TestModel>(),
                        json = {
                            user: "john",
                            password: "doe"
                        };
                    gson.deserialize(json);
                }).to.throwError();
            });
        });

        context("and that type contains a nested object", () => {
            it("should also deserialize correctly that", () => {
                let gson = new Gson<TestModel>([TestModel]),
                    json = {
                        "user": "john",
                        "password": "doe",
                        "others": [
                            {
                                "user": "foo",
                                "password": "bar"
                            }
                        ]
                    };
                let obj = gson.deserialize(json);

                expect(obj.user).to.eql("john");
                expect(obj.password).to.eql("doe");
                expect(obj.others[0].user).to.eql("foo");
                expect(obj.others[0].password).to.eql("bar");
            });
        });

        context("and that type contains an array of nested strings", () => {
            it("should deserialize it correctly", function () {
                let gson = new Gson<PaginationObject>([PaginationObject]),
                    json = require("./fixtures/gson/pagination.json");
                let obj = gson.deserialize(json);

                expect(obj.getEpcrs().fields).to.eql(["code", "serialNumber"]);
                expect(obj.getEpcrs().pagination.sort).to.eql(["string", "string2"]);
            });
        });
    });

    context("when bad json is supplied", () => {
        it("should throw an error", function () {
            expect(() => {
                let gson = new Gson<TestModel>([TestModel]),
                    json = "foobar";
                gson.deserialize(json);
            }).to.throwError();
        });
    });

    context("when a valid json array is supplied", () => {
        context("but it's empty", () => {
            it("should return an empty array", function () {
                let gson = new Gson<Country[]>([Country]),
                    json = [];
                let obj = gson.deserialize(json);

                expect(obj.length).to.eql(0);
            });
        });

        it("should deserialize it correctly", function () {
            let gson = new Gson<Country[]>([Country]),
                json = [
                    {
                        "id": 4,
                        "phrase_text": "Afghanistan",
                        "code": "AF",
                        "code3": "AFG",
                        "has_states": false,
                        "prefix": 93
                    }
                ];
            let obj = gson.deserialize(json);

            expect(obj[0].getId()).to.eql(4);
            expect(obj[0].getName()).to.eql("Afghanistan");
            expect(obj[0].hasStates()).to.be(false);
        });
    });
});
