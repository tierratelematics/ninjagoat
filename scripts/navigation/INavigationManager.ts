import Dictionary from "../util/Dictionary";

interface INavigationManager {
    navigate(area: string, viewmodelId?: string, parameters?: Dictionary<any>): void;
    replace(area: string, viewmodelId?: string, parameters?: Dictionary<any>): void;
    getNavigationPath(area: string, viewmodelId?: string, parameters?: Dictionary<any>): string;
}

export default INavigationManager;
