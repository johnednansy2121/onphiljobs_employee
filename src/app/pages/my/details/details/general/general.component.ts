import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { ProfileService } from 'src/app/services/profile.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ImageTransform, ImageCroppedEvent } from 'ngx-image-cropper';
import { base64ToBlob } from 'base64-blob';
import { ToastrService } from 'ngx-toastr';
import { FileService } from 'src/app/services/file.service';
import { UtilityService } from 'src/app/services/util.service';
import { SpinnerService } from 'src/app/utilities/spinner/spinner.service';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnInit {

  imageChangedEvent: any = ''
  croppedImage: any = ''
  modalRef: BsModalRef
  canvasRotation = 0
  transform: ImageTransform = {}
  profileImage = ''
  selectedCountry = ''
  countries  = []
  constructor(
    public profileService: ProfileService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private fileService: FileService,
    private utilSrv: UtilityService,
    private spinnerSrv: SpinnerService) { }

  ngOnInit(): void {
    this.utilSrv.getCountries()
      .then((result: any) => {
        const { model } = result
        this.countries = model
      })
    this.setProfileImage();
    this.selectedCountry = this.profileService.detailsForm.value.location.country
  }
  ngAfterViewInit() {
    this.modalService.onHide.subscribe(() => {
      this.imageChangedEvent = '';
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template)
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  imageLoaded() {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }

  rotateLeft() {
    this.canvasRotation--;
    this.flipAfterRotate();
  }

  rotateRight() {
    this.canvasRotation++;
    this.flipAfterRotate();
  }

  private flipAfterRotate() {
    const flippedH = this.transform.flipH;
    const flippedV = this.transform.flipV;
    this.transform = {
      ...this.transform,
      flipH: flippedV,
      flipV: flippedH
    };
  }


  flipHorizontal() {
    this.transform = {
      ...this.transform,
      flipH: !this.transform.flipH
    };
  }

  flipVertical() {
    this.transform = {
      ...this.transform,
      flipV: !this.transform.flipV
    };
  }

  uploadPhoto() {
    base64ToBlob(this.croppedImage)
      .then(blob => {
        this.fileService.uploadDisplayPhoto(blob).subscribe(
          (result: any) => {
            const { model } = result
            console.log(model)
            this.profileService.profileImage = model
            this.modalRef.hide()
          },
          (error) => {
            this.toastr.error(error)
          }
        )
      })
      .catch(error => this.toastr.error(error.error.message))
  }

  reset() {
    this.setProfileImage();
    this.imageChangedEvent = ''
  }
  

  setProfileImage() {
    this.profileService.profileImage = this.profileService.detailsForm.value.displayPicture;
  }

  countrySelected() {
    this.profileService.detailsForm.patchValue({ 'location': { 'country': this.selectedCountry } })
  }


  getLength(type: any) {
    console.log()
    const data = this.profileService.detailsForm.controls[type].value;
    return data.length;
  }
}
