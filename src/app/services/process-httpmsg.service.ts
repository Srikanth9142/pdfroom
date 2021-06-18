import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ERROR_STATUS_TEXT_FOR_SESSION_EXPIRED } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class ProcessHttpmsgService {

  constructor() { }

  public handleError(error: HttpErrorResponse|any){
    let errMsg = '';
    if(error.statusText == ERROR_STATUS_TEXT_FOR_SESSION_EXPIRED){
      localStorage.removeItem("id_token");
      console.log("removed from local storage");
    }
    if(error.error instanceof(ErrorEvent)){
      console.log("If part exec");
      
      errMsg = error.error.message;
    }else{
      console.log("Else part exec");
      errMsg = `${error.error}`;
    }
    return throwError(errMsg);
  }

}
