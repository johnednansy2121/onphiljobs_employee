import { Component, OnInit, TemplateRef } from '@angular/core';
import { PortfolioService } from '../../../../services/portfolio.service';
import { SpinnerService } from '../../../../utilities/spinner/spinner.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../../../environments/environment';
import { Lightbox } from 'ngx-lightbox';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-list-portfolio',
  templateUrl: './list-portfolio.component.html',
  styleUrls: ['./list-portfolio.component.scss']
})
export class ListPortfolioComponent implements OnInit {
  env = environment;
  portfolios = []
  pageTitle: string = 'Portfolio';
  pageSubTitle: string = 'Add examples of your work you would like to highlight.';

  private albums = [];
  portfolioLabelTitle: string = 'More Portfolio items to add?';
  portfolioLabelSubTitle: string = 'You may add more of your Portfolio Items, just click the button below';

  currentTheme: string = '';
  constructor(
    private spinnerSrv: SpinnerService,
    public portfolioServ: PortfolioService,
    private toastSrv: ToastrService,
    private lightbox: Lightbox
  ) { }

  ngOnInit(): void {
  }

  open(index: number): void {
    // open lightbox
    this.lightbox.open(this.albums, index);
  }

  close(): void {
    // close lightbox programmatically
    this.lightbox.close();
  }

  remove(id: string) {
    this.spinnerSrv.show('Deleting portfolio record.')
    this.portfolioServ.removePortfolio(id)
      .finally(() => {
        this.spinnerSrv.hide()
      })
  }

  drop(event: CdkDragDrop<string[]>) {
    this.spinnerSrv.show('Reordering Items')
    this.portfolioServ.swapOrder(event.previousIndex, event.currentIndex)
      .finally(() => this.spinnerSrv.hide())
  }

  markAsProtectedUnprotected(id: string) {
    this.spinnerSrv.show('Marking as Protected/Unprotected . . .')
    this.portfolioServ.protectRoute(id)
      .finally(() => this.spinnerSrv.hide())
  }
}
