import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';  
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';

// Pages
import { GeneralComponent } from './general/general.component';
import { SocialComponent } from './social/social.component';
import { VideoComponent } from './video/video.component';
import { AboutMeComponent } from './about-me/about-me.component';


import { ModalModule } from 'ngx-bootstrap/modal';
import { ImageCropperModule } from 'ngx-image-cropper';
import { QuillModule } from 'ngx-quill';
import { RoundProgressModule } from 'angular-svg-round-progressbar';

const DETAILS_ROUTE = [
    {
        path: '',
        redirectTo: 'general',
        pathMatch: 'full'
    },
    {
        path: 'general',
        component: GeneralComponent
    },
    {
        path: 'about_me',
        component: AboutMeComponent
    },
    {
        path: 'social_links',
        component: SocialComponent
    },
    {
        path: 'video_pitch',
        component: VideoComponent
    }
];

@NgModule({
    declarations: [
        GeneralComponent,
        SocialComponent,
        VideoComponent,
        AboutMeComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ModalModule.forRoot(), 
        QuillModule.forRoot({
            modules: {
                toolbar: [
                    ['bold', 'italic', 'underline', 'strike'],
                    ['blockquote', 'code-block'],
                    [{ 'header': 1 }, { 'header': 2 }],
                    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                    [{ 'script': 'sub' }, { 'script': 'super' }],
                    [{ 'indent': '-1' }, { 'indent': '+1' }],
                    [{ 'direction': 'rtl' }],

                    [{ 'size': ['small', false, 'large', 'huge'] }],
                    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

                    [{ 'color': [] }, { 'background': [] }],
                    [{ 'font': [] }],
                    [{ 'align': [] }],

                    ['clean'],

                    ['link', 'video']
                ]
            }
        }),
        ImageCropperModule, 
        RoundProgressModule,
        TypeaheadModule,
        RouterModule.forChild(DETAILS_ROUTE)
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DetailsModule {
}
