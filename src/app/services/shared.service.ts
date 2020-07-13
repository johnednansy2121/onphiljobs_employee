import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  mobileSidebarActive = false;

  isloggedin = false;
  currentTheme = '';
  public country = ''
  public state = ''
  public city = ''
  public isDisabled = false;
  constructor() { }

}
