import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-private-profile-component',
  templateUrl: './private-profile-component.component.html',
  styleUrls: ['./private-profile-component.component.scss']
})
export class PrivateProfileComponentComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute
  ) { }
  
  profile: any
  socialShareItems = [
    { icon: 'fa fa-facebook', color: '#405a93', label: 'fb', name: 'Facebook' },
    { icon: 'fa fa-twitter', color: '#49a1eb', label: 'tw', name: 'Twitter' },
    { icon: 'fa fa-linkedin', color: '#0077b5', label: 'in', name: 'Linkedin' },
    { icon: 'fa fa-reddit', color: '#ff4500', label: 'rd', name: 'Reddit' },
    { icon: 'fa fa-pinterest', color: '#cb2027', label: 'pn', name: 'Pinterest' },
  ]
  env = environment;
  ngOnInit(): void {
    this.activatedRoute.data.subscribe((profile) => { this.profile = profile.profile; console.log(this.profile)})
  }

}
