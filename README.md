#Ninjagoat
The not so baaaaaaad MVVM framework.

![](http://www.clker.com/cliparts/m/N/S/T/M/y/ninja-goat-md.png)
![](https://badge.fury.io/js/ninjagoat.svg)
<<<<<<< HEAD
![](https://travis-ci.org/tierratelematics/ninjagoat.svg?branch=develop)
![](https://travis-ci.org/tierratelematics/ninjagoat.svg?branch=master)
![](https://img.shields.io/badge/license-Apache%202.0-blue.svg)
=======
![](https://img.shields.io/badge/license-Apache 2.0-blue.svg)
>>>>>>> f47c6eb84421bbb76299a8d9bb0e62cba4411a35
![](https://img.shields.io/badge/goat-bikenjutsu-yellow.svg)
![](https://travis-ci.org/tierratelematics/ninjagoat.svg?branch=develop)

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

As Ninjagoat is written in Typescript, you can find the type definitions here:

```ts
/// <reference path="node_modules/ninjagoat/dts/ninjagoat.d.ts" />
```

## Ok, I got it. What now?

If you've made it so far, you might be interested in one of these excellent topics:


* [Getting started](gettingstarted.md) - will show you how to get up and running with Ninjagoat, with the classic hello world example.
* [Architecture](architecture.md) - will tell you a bit more about how Ninjagoat does things internally. This might be boring stuff for you, if what you need is just use the library, so feel free to skip it.
* [Roadmap](roadmap.md) - here you will find a few insights about where we want to go and what is planned for future versions
* [Contribute!](contribute.md) - welcome to Duloc [such a perfect town](https://www.youtube.com/watch?v=X81AoBcVnaA), here we have some rules, let us lay them down...

## License

Copyright 2016 Tierra SpA

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

<<<<<<< HEAD
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
=======
### What about the view?
To be continued...
>>>>>>> f47c6eb84421bbb76299a8d9bb0e62cba4411a35
