import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";

// Pages
import { ConfirmComponent } from "./confirm/confirm.component";
import { ProcessComponent } from "./process/process.component";
import { SelectComponent } from "./select/select.component";

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar'; 

const PROFILE_ROUTE = [
    
    {
        path: '',
        redirectTo: 'select',
        pathMatch: 'full'
    },
    {
        path: 'confirm',
        component: ConfirmComponent
    },
    {
        path: 'process',
        component: ProcessComponent
    },
    {
        path: 'select',
        component: SelectComponent
    }
];

@NgModule({
    declarations: [
        ConfirmComponent,
        ProcessComponent,
        SelectComponent
    ],
    imports: [
        CommonModule,
        Ng2GoogleChartsModule,
        ProgressbarModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(PROFILE_ROUTE)
    ],

    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ImporterModule {
}
