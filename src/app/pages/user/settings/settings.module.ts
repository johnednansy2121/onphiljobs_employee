import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";

// Pggages
import { ProgressbarModule } from 'ngx-bootstrap/progressbar'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { TwofactorSettingsComponent } from './twofactor-settings/twofactor-settings.component'
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input'
import { TooltipModule } from 'ng2-tooltip-directive';

const PROFILE_ROUTE = [
    
    {
        path: '',
        redirectTo: 'change-password',
        pathMatch: 'full'
    },
    {
        path: 'change-password',
        component: ChangePasswordComponent
    },
    {
        path: '2-fa',
        component: TwofactorSettingsComponent
    }
];

@NgModule({
    declarations: [
        ChangePasswordComponent,
        TwofactorSettingsComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        Ng2GoogleChartsModule,
        TooltipModule,
        ProgressbarModule.forRoot(),
        ReactiveFormsModule, 
        RoundProgressModule,
        RouterModule.forChild(PROFILE_ROUTE),
        NgxIntlTelInputModule
    ],

    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SettingsModule {
}
