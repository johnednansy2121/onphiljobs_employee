import { Component, OnInit, TemplateRef } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { ProfileService } from "../../../../services/profile.service";
import { Router } from "@angular/router";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { ImageCroppedEvent, ImageTransform } from "ngx-image-cropper";
import { FileService } from "../../../../services/file.service";
import { base64ToBlob } from "base64-blob";
import { SpinnerService } from "src/app/utilities/spinner/spinner.service";
import { environment } from '../../../../../environments/environment';

@Component({
  selector: "app-create",
  templateUrl: "./create.component.html",
  styleUrls: ["./create.component.scss"],
})
export class CreateComponent implements OnInit {
  profileForm: FormGroup;
  isStart = false;
  imageChangedEvent: any = "";
  croppedImage: any = "";
  modalRef: BsModalRef;
  canvasRotation = 0;
  transform: ImageTransform = {};
  profileImage = "";

  env = environment;
  constructor(
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private profileService: ProfileService,
    private router: Router,
    private modalService: BsModalService,
    private fileService: FileService,
    private spinnerSrv: SpinnerService
  ) {}

  ngOnInit(): void {
    this.profileForm = this.formBuilder.group({
      firstName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      aboutMe: [""],
      displayPicture: ["", []],
      videoUrl: [""],
      twitter: [""],
      instagram: [""],
      linkedin: [""],
      facebook: [""],
    });
  }

  get f() {
    return this.profileForm.controls;
  }
  get formErrorHandler() {
    return (
      this.f.firstName.errors || this.f.lastName.errors || this.f.aboutMe.errors
    );
  }

  submit() {
    this.spinnerSrv.show("Creating your profile");
    this.profileService
      .createProfile(this.profileForm, this.profileImage)
      .subscribe(
        (data) => {
          this.toastr.success("Successfully created your profile.");
          this.router.navigateByUrl("/blog/get-started");
        },
        (error) => {
          this.toastr.error(error.error.message);
          this.spinnerSrv.hide();
        }
      );
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
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
      flipV: flippedH,
    };
  }

  flipHorizontal() {
    this.transform = {
      ...this.transform,
      flipH: !this.transform.flipH,
    };
  }

  flipVertical() {
    this.transform = {
      ...this.transform,
      flipV: !this.transform.flipV,
    };
  }

  uploadPhoto() {
    base64ToBlob(this.croppedImage)
      .then((blob) => {
        this.fileService.uploadDisplayPhoto(blob).subscribe(
          (result: any) => {
            const { model } = result;
            this.profileImage = model;
            this.modalRef.hide();
          },
          (error) => {
            this.toastr.error(error.error.message);
          }
        );
      })
      .catch((error) => this.toastr.error(error));
  }
}
