import IAlertService from "./IAlertService";
import IConfirmationService from "./IConfirmationService";
import ICustomDialogService from "./ICustomDialogService";

interface IDialogService extends IAlertService, IConfirmationService, ICustomDialogService {

}

export default IDialogService