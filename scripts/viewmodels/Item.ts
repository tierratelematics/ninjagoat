import ItemState from "../constants/ItemState";

class Item<T> {
    constructor(public state:ItemState, public data:T) {

    }

    static Loading<T>(data:T):Item<T> {
        return new Item(ItemState.Loading, data);
    }

    static Data<T>(data:T):Item<T>  {
        return new Item(ItemState.Data, data);
    }

    static Error<T>(data:T):Item<T>  {
        return new Item(ItemState.Error, data);
    }
}

export default Item