import View from "../views/View";
import IViewModel from "../viewmodels/IViewModel";

interface IContextFactory {
    contextFor<T extends IViewModel<any>>(uri: string, parameters?: any): { view: View<T>, viewmodel: T };
}

export default IContextFactory;
