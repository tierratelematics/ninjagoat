/// <reference path="../typings/browser.d.ts" />
import expect = require("expect.js");
import sinon = require("sinon");
import Rx = require("rx");
import IModelRetriever from "../scripts/net/IModelRetriever";
import ModelRetriever from "../scripts/net/ModelRetriever";
import ModelState from "../scripts/viewmodels/ModelState";
import ModelPhase from "../scripts/constants/ModelPhase";
import INotificationManager from "../scripts/notifications/INotificationManager";
import IHttpClient from "../scripts/net/IHttpClient";
import HttpClient from "../scripts/net/HttpClient";
import NotificationManager from "../scripts/notifications/NotificationManager";
import SinonSandbox = Sinon.SinonSandbox;
import TestCounter from "./fixtures/viewmodels/TestCounter";
import HttpResponse from "../scripts/net/HttpResponse";

describe("Model retriever, given an area and a viewmodel id", () => {

    let subject:IModelRetriever;
    let httpClient:IHttpClient;
    let notificationManager:INotificationManager;
    let sandbox:SinonSandbox;

    beforeEach(() => {
        sandbox = sinon.sandbox.create();
        httpClient = new HttpClient();
        notificationManager = new NotificationManager();
        subject = new ModelRetriever(httpClient, notificationManager);
    });

    context("when a viewmodel needs data to be loaded", () => {

        beforeEach(() => {
            sandbox.stub(notificationManager, "notificationsFor", () => {
                return Rx.Observable.just(new HttpResponse({url: 'test'}));
            });
            sandbox.stub(httpClient, "get", (url:string)=> {
                return Rx.Observable.just(new HttpResponse({count: 20}));
            });
        });

        it("should send a loading state to the viewmodel", (done) => {
            subject.modelFor<TestCounter>("Admin", "Bar").take(1).subscribe(modelState => {
                expect(modelState.phase).to.be(ModelPhase.Loading);
                done();
            });
        });
    });

    context("when a loading state has been sent to the viewmodel", () => {

        beforeEach(() => {
            sandbox.stub(notificationManager, "notificationsFor", (area:string, id:string, parameters?:any) => {
                return Rx.Observable.just({url: 'http://testurl/' + (parameters ? parameters.id : "")});
            });
            sandbox.stub(httpClient, "get", (url:string)=> {
                if (url === 'http://testurl/') {
                    return Rx.Observable.just(new HttpResponse({count: 20}));
                } else if (url === 'http://testurl/60') {
                    return Rx.Observable.just(new HttpResponse({count: 60}));
                }
            });
        });

        it("should load the data", (done) => {
            subject.modelFor<TestCounter>("Admin", "Bar").skip(1).take(1).subscribe(modelState => {
                expect(modelState.model.count).to.be(20);
                done();
            });
        });

        context("and some parameters are needed to construct the model", () => {
            it("should append those parameters when requesting the model", (done) => {
                subject.modelFor<TestCounter>("Admin", "Bar", {id: 60}).skip(1).take(1).subscribe(modelState => {
                    expect(modelState.model.count).to.be(60);
                    done();
                });
            });
        });
    });

    context("if something bad happens while retrieving the data needed by the viewmodel", () => {

        beforeEach(() => {
            sandbox.stub(notificationManager, "notificationsFor", (area:string, id:string, parameters?:any) => {
                return Rx.Observable.just({url: 'http://testurl/' + (parameters ? parameters.id : "")});
            });
            sandbox.stub(httpClient, "get", (url:string) => Rx.Observable.throw({message: 'Something bad happened'}));
        });

        it("should push a failed state to the viewmodel", (done) => {
            subject.modelFor<TestCounter>("Admin", "Bar", {id: 60}).skip(1).take(1).subscribe(modelState => {
                if (modelState.phase === ModelPhase.Failed) {
                    expect(modelState.failure).to.eql({message: 'Something bad happened'});
                    done();
                }
            });
        });
    });
});