import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-jumbotron',
  templateUrl: './jumbotron.component.html',
  styleUrls: ['./jumbotron.component.scss']
})
export class JumbotronComponent implements OnInit {

  @Input() title: string = ''
  @Input() message: string = ''
  @Input() details: string = ''
  @Input() routerLink: string = ''
  @Input() routerLinkTitle: string = 'Learn more'

  constructor() { }

  ngOnInit(): void {
  }

}
