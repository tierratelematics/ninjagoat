import ModelPhase from "../constants/ModelPhase";
import Immutable from "./ImmutableDecorator";

class ModelState<T> {
    constructor(public phase:ModelPhase, public model?:T, public failure?:any) {

    }

    static Loading<T>():ModelState<T> {
        return new LoadingState();
    }

    static Ready<T>(model:T):ModelState<T> {
        return new ReadyState(model);
    }

    static Failed<T>(failure:any):ModelState<T> {
        return new FailedState(failure);
    }
}

@Immutable
class LoadingState extends ModelState<any> {

    constructor() {
        super(ModelPhase.Loading);
    }
}

@Immutable
class ReadyState<T> extends ModelState<T> {

    constructor(public model:T) {
        super(ModelPhase.Ready, model);
    }
}

@Immutable
class FailedState extends ModelState<any> {

    constructor(public failure:any) {
        super(ModelPhase.Failed, null, failure);
    }
}

export default ModelState