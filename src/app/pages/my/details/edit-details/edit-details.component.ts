import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ImageTransform, ImageCroppedEvent } from 'ngx-image-cropper';
import { ProfileService } from '../../../../services/profile.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FileService } from '../../../../services/file.service';
import { base64ToBlob } from 'base64-blob';

@Component({
  selector: 'app-edit-details',
  templateUrl: './edit-details.component.html',
  styleUrls: ['./edit-details.component.scss']
})
export class EditDetailsComponent implements OnInit {
  editProfileForm: FormGroup
  profile = {
    displayPicture: null
  }
  modalRef: BsModalRef
  imageChangedEvent: any = ''
  croppedImage: any = ''
  canvasRotation = 0
  transform: ImageTransform = {}

  constructor(
    private formBuilder: FormBuilder,
    private profileService: ProfileService,
    private router: Router,
    private toasterService: ToastrService,
    private modalService: BsModalService,
    private fileService: FileService
  ) { }

  ngOnInit(): void {
    this.editProfileForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      aboutMe: ['', [Validators.required]],
      videoUrl: [''],
      instagram: [''],
      facebook: [''],
      linkedin: [''],
      twitter: ['']
    })
    this.profileService.getProfile().subscribe(
      (data: any) => {
        const { model } = data
        this.profile = { ...model }
        this.mapToFormGroup(model)
      },
      (error) => {
        this.toasterService.error(error.error.message)
        this.router.navigateByUrl('/profile')
      }
    )
  }

  public mapToFormGroup(data) {
    this.editProfileForm.setValue({
      firstName: data.firstName,
      lastName: data.lastName,
      aboutMe: data.aboutMe,
      videoUrl: data.videoUrl,
      twitter: data.socialLinks.twitter,
      facebook: data.socialLinks.facebook,
      instagram: data.socialLinks.instagram,
      linkedin: data.socialLinks.linkedin
    })
  }

  public submit() {
    // this.profileService.editProfile(this.editProfileForm, this.profile).subscribe(
    //   (data: any) => {
    //     this.toasterService.success(data.message)
    //     this.router.navigateByUrl('/my/details')
    //   },
    //   (error) => {
    //     this.toasterService.error(error.message)
    //   }
    // )
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

  uploadImage() {
    base64ToBlob(this.croppedImage)
      .then(blob => {
        this.fileService.uploadDisplayPhoto(blob).subscribe(
          (result: any) => {
            let { model } = result
            this.profile.displayPicture = model
            this.modalRef.hide()
            this.croppedImage = ''
            this.imageChangedEvent = ''
          },
          (error) => {
            this.toasterService.error(error.message)
          }
        )
      })
      .catch(error => this.toasterService.error(error.message))
  }

}
