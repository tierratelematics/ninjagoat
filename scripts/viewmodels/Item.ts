import ItemState from "../constants/ItemState";

class Item<T> {
    constructor(public state:ItemState, public data?:T, public rejection?:any) {

    }

    static Loading<T>():Item<T> {
        return new Item<T>(ItemState.Loading);
    }

    static Data<T>(data:T):Item<T> {
        return new Item(ItemState.Data, data);
    }

    static Error<T>(rejection:any):Item<T> {
        return new Item(ItemState.Error, null, rejection);
    }
}

export default Item