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
import MockSocketClient from "./fixtures/MockSocketClient";

describe("Model retriever, given an area and a viewmodel id", () => {

    let subject:IModelRetriever;
    let httpClient:IHttpClient;
    let notificationManager:INotificationManager;
    let sandbox:SinonSandbox;
    let socketClient:SocketIOClient.Socket;

    beforeEach(() => {
        sandbox = sinon.sandbox.create({
            useFakeTimers: true
        });
        socketClient = new MockSocketClient();
        httpClient = new HttpClient();
        notificationManager = new NotificationManager(() => Promise.resolve(socketClient));
        subject = new ModelRetriever(httpClient, notificationManager);
    });

    context("when a viewmodel needs data to be loaded", () => {

        beforeEach(stubData);

        it("should send a loading state to the viewmodel", () => {
            let modelState:ModelState<TestCounter> = null;
            subject.modelFor<TestCounter>("Admin", "Bar").take(1).subscribe(item => modelState = item);
            sandbox.clock.tick(10);
            expect(modelState.phase).to.be(ModelPhase.Loading);
        });
    });

    context("when a loading state has been sent to the viewmodel", () => {

        beforeEach(stubData);

        it("should load the data", () => {
            let modelState:ModelState<TestCounter> = null;
            subject.modelFor<TestCounter>("Admin", "Bar").skip(1).take(1).subscribe(item => modelState = item);
            sandbox.clock.tick(10);
            expect(modelState.model.count).to.be(20);
        });

        context("and some parameters are needed to construct the model", () => {
            it("should append those parameters when requesting the model", () => {
                let modelState:ModelState<TestCounter> = null;
                subject.modelFor<TestCounter>("Admin", "Bar", {id: 60}).skip(1).take(1).subscribe(item => modelState = item);
                sandbox.clock.tick(10);
                expect(modelState.model.count).to.be(60);
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

        it("should push a failed state to the viewmodel", () => {
            let modelState:ModelState<TestCounter> = null;
            subject.modelFor<TestCounter>("Admin", "Bar", {id: 60}).skip(1).take(1).subscribe(item => modelState = item);
            sandbox.clock.tick(10);
            expect(modelState.failure).to.eql({message: 'Something bad happened'});
        });
    });

    function stubData() {
        sandbox.stub(notificationManager, "notificationsFor", (area:string, id:string, parameters?:any) => {
            return Rx.Observable.just({url: 'http://testurl/' + (parameters ? parameters.id : "")});
        });
        sandbox.stub(httpClient, "get", (url:string) => {
            if (url === 'http://testurl/') {
                return Rx.Observable.just(new HttpResponse({count: 20}));
            } else if (url === 'http://testurl/60') {
                return Rx.Observable.just(new HttpResponse({count: 60}));
            }
        });
    }
});