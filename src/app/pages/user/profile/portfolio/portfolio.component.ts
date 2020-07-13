import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {

  portfolioItems = []

  constructor(
      private actRoute:ActivatedRoute
  ) { }

  ngOnInit() {
    this.portfolioItems = this.actRoute.parent.snapshot.data.userPortfolio;
  }

}
