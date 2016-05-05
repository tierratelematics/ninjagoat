interface INavigationManager {
    navigate(area: string, viewmodelId?: string, parameters?: {[index:string]:any}): void;
}

export default INavigationManager;
