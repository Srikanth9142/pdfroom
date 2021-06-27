import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
/**
 * @description: Service to display Notifications in the form of Toastr
 */
export class NotificationService {

  constructor(private toastrService:ToastrService) { }

  /**
   * @description Util to display toastr Error to user
   * 
   * @param errorMessage: ErrorMessage to display
   */
  notifyErrorMessageToUser(errorMessage: string):any {
    this.toastrService.error(errorMessage, "Error",{
      timeOut: 4000,
      progressBar: true,
      progressAnimation: "decreasing",
      positionClass: "toast-top-right",
      closeButton: true
    });
  }

  /**
   * @description Util to display toastr Warning to User
   * 
   * @params warningMsg: Warning Message to display to User
   */
  notifyWarningMessageToUser(warningMsg: string):any{
    this.toastrService.warning(warningMsg, "Warning",{
      timeOut: 4000,
      progressBar: true,
      progressAnimation: "decreasing",
      positionClass: "toast-top-right",
      closeButton: true
    });
  }

  /**
   * @description: Util to display toastr Success Message to user
   * 
   * @param successMessage: Message to display
   */
  notifySuccessMessageToUser(successMessage: string):any{
    this.toastrService.success(successMessage, "Success",{
      timeOut: 3000,
      progressBar: true,
      progressAnimation: "decreasing",
      positionClass: "toast-top-right",
      closeButton: true
    });
  }

  /**
   * @description: Util to display toastr Info Message to user
   * 
   * @param successMessage: Message to display
   */
  notifyInfoMessageToUser(infoMessage: string):any{
    this.toastrService.info(infoMessage, "Info",{
      timeOut: 3000,
      progressBar: true,
      progressAnimation: "decreasing",
      positionClass: "toast-top-right",
      closeButton: true
    });
  }

}
