#Ninjagoat
The not so baaaaaaad MVVM framework.

![](http://www.clker.com/cliparts/m/N/S/T/M/y/ninja-goat-md.png)
![](https://img.shields.io/badge/release-0.2.2-blue.svg)
![](https://img.shields.io/badge/license-Apache 2.0-blue.svg)
![](https://img.shields.io/badge/goat-bikenjutsu-yellow.svg)

## Introduction
Ninjagoat is an attempt at writing a simple, lightweight, modular, reactive, convention-based, eventsource ready MVVM framework. Oh, and we are writing it in [Typescript](https://www.typescriptlang.org/), so we expect that you will use that, too! If this is not the case don't worry, you can use Ninjagoat anyway, but you will lose part of the fun.

Ninjagoat is currently being developed internally for being used in our single page frontend applications, which require live updates of data coming from a server, and are composed of multiple modules. Besides being developed with [Event Sourcing](http://geteventstore.com) in mind, it can be used also in conventional scenarios.

This is a work in progress, so if you will expect lots of changes you won't get disappointed.

## Installation
You can find Ninjagoat on npm:

```sh
npm install ninjagoat --save
```

If you are using Typescript you will have to add support for decorators in the `tsconfig.json` file, as we are using [InversifyJS](https://github.com/inversify/InversifyJS) as our IoC container.

```
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```

As Ninjagoat is written in Typescript you can find the type definitions here:

```ts
/// <reference path="node_modules/inversify/type_definitions/ninjagoat/ninjagoat.d.ts" />
```

## Architecture
At the core of Ninjagoat there is the [ViewModel](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93viewmodel). Every ViewModel in Ninjagoat has the responsibility of triggering a request to re-render the view it has been associated with whenever something changes. If you are used to wonderful systems that will automagically change your view whenever something changes with just the power of unicorns, [rainbows](https://www.youtube.com/watch?v=QH2-TGUlwu4) or convoluted digest loops then you might get disappointed. YOU are in charge of changing things, because YOU know best.

### Isn't this old school? Having to trigger a render every time?
Ninjagoat currently uses [React](https://facebook.github.io/react/) as its view engine. This means that you just need to notify that something changed, the view engine will do the rest. Not a big deal, right? In order to do that you will have to implement an interface notifying such changes. As we are all huuuuuuge fans of the excellent [RxJs](https://github.com/Reactive-Extensions/RxJS) the way you will have to do this is by implementing an Observable in your ViewModel.

### This looks quite scary, I'm not sure I understood
Don't worry about that for now, we'll get back to it at a later time. The good news is that you can just extend the `ObservableViewModel<T>` class and you are pretty much done. This class will require you to provide just one method: `setData` that will be called by the system whenever there is some new data available for your model.

```ts
@ViewModel('Hello')
class HelloViewModel extends ObservableViewModel<string> {
  public greetings: string;
  
  protected onData(data: string) {
    this.greetings = data;
}
```
Notice that we put the `@ViewModel` decorator on top of our class. This will tell the system that this is a viewmodel it can use, and that its name is `Hello`.

### What is this `onData` thing? Where is my data coming from?
Ninjagoat is based on the assumption that your ViewModels will receive data from an external source. This might be the backend, a service in your application or even another ViewModel. The way Ninjagoat handles this is by having a dependency with an `Observable<T>` for every ViewModel. This is the guy responsible for sending the data to our system. In order to send a string to our `HelloViewModel` you will have to do the following:

```ts
let hello = new HelloViewModel(Observable.just("Hello, world!"));
```

### Wait, what did I just see?
We are assuming that you have some familiarity with Rx here. If this is not the case, you can either take a look at the [ReactiveX](http://reactivex.io) website or download the free chapter of [Grokking Rx](https://www.manning.com/books/grokking-rx) for an introduction to Rx and the concepts it conveys (disclaimer: one of the author of Ninjagoat is also a co-author of the book).
To make a long story short, an Observable is like a `Promise` that can pass multiple values over time. `Observable.just` is the equivalent of `Promise.resolve`.

### Why `Observables` and not `Promises` then?
Ninjagoat aims at creating ViewModels that can be updated multiple times during their lifetime. Instead of generating their own `Promise` by asking for data on the backend, they rely on somebody else to *push* them data coming from a backend whenever such data changes. Due to this passing a `Promise` would not work, as it will just send us a single model. `Observable`, on the other hand, can send us data multiple times, specifically anytime the backend has something new for us.

### What about the view?
To be continued...
