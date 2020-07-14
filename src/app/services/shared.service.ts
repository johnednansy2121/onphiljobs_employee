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
  
  public lat = -26.233449
  public lng = 133.848693
  public radius = 2226130*0.000621371192;
  public isDisabled = false;
  constructor() { }
}
