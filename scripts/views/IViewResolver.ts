import View from "./View";
import IViewModel from "../viewmodels/IViewModel";

interface IViewResolver {
    resolve<T extends IViewModel<T>>(area: string, viewmodelId?: string): View<T>;
}

export default IViewResolver;
