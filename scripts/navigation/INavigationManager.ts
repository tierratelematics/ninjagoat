import Dictionary from "../util/Dictionary";

interface INavigationManager {
    navigate(area: string, viewmodelId?: string, parameters?: Dictionary<any>): void;
}

export default INavigationManager;
