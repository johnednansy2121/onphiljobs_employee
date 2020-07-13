import {Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {Subject} from "rxjs";
import {TaskService} from "../../../../services/task.service";
import {SpinnerService} from "../../../../utilities/spinner/spinner.service";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  post: any
  @ViewChild('addconfirm') tasksAddConfirmTemplateRef: TemplateRef<any>
  modalRef: BsModalRef
  test: Subject<any> = new Subject<any>()

  constructor(
      private elementRef: ElementRef,
      private actRoute:ActivatedRoute,
      public sanitizer:DomSanitizer,
      private modalService: BsModalService,
      private tasksService: TaskService,
      private spinnerSvc:SpinnerService,
      private router: Router
  ) {
  }

  ngOnInit() {
    this.post = this.actRoute.snapshot.data.post;
    console.log(this.post);
  }

  hasCommand = false;
  commandJson = null;

  // angularScope = this;
  anchors = [];
  public ngAfterViewInit() {
    // Solution for catching click events on anchors using querySelectorAll:
    this.anchors = this.elementRef.nativeElement.querySelectorAll('cfg');
    this.anchors.forEach((anchor: HTMLAnchorElement) => {
      console.log(anchor)
      console.log(anchor.attributes["command"].value)
      this.commandJson = JSON.parse(anchor.attributes["command"].value)
      console.log(this.commandJson)

      setTimeout(() => {
        this.hasCommand = true;
        anchor.remove();
      }, 50)
    })
  }

  testpopfunction (){

    switch (this.commandJson.event) {
      case "addtasks":
        this.modalRef = this.modalService.show(this.tasksAddConfirmTemplateRef)
        let mysub = this.test.subscribe((result) => {
          if(result){
            this.spinnerSvc.show("Creating tasks for you")
            this.tasksService.processAndInjectTasks(this.commandJson.tasks).then(res => {
              this.spinnerSvc.hide()
              this.router.navigateByUrl('/tasks')
            })
          }
          mysub.unsubscribe()
        })
        break;

      case "otherfeature":
        // this.dosomething(incomingdata)
        break;

      default:
        alert("ERROR: Action token not valid")
        break;
    }

  }

  public dismissModal(result){
    this.modalRef.hide();
    this.test.next(result)
  }

}
