//Angular Core Libaries
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DragDropModule } from '@angular/cdk/drag-drop'

//3rd Party Libraries
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { TooltipModule } from 'ng2-tooltip-directive';
import { ImageCropperModule } from 'ngx-image-cropper'
import { NgxSocialShareModule } from 'ngx-social-share';
import { NgcCookieConsentModule, NgcCookieConsentConfig } from 'ngx-cookieconsent';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input'
import { AgmCoreModule } from '@agm/core';
import 'hammerjs';

import { StoreModule } from '@ngrx/store'

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};

const cookieConfig:NgcCookieConsentConfig = {
  cookie: {
    domain: environment.domain // or 'your.domain.com' // it is mandatory to set a domain, for cookies to work properly (see https://goo.gl/S2Hy2A)
  },
  palette: {
    popup: {
      background: '#000',
    },
    button: {
      background: '#32c787'
    }
  },
  theme: 'classic',
  type: 'opt-out',
  position: "bottom-right"
};

// Bootstrap imports
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { TabsModule } from "ngx-bootstrap/tabs";

// 3rd party libraries
import { QuillModule } from 'ngx-quill';
import { CrystalLightboxModule } from '@crystalui/angular-lightbox';
import { LightboxModule } from 'ngx-lightbox'; 
import { SelectDropDownModule } from 'ngx-select-dropdown'
import { MatPaginatorModule } from "@angular/material/paginator";
import { NgxSelectModule } from 'ngx-select-ex';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatTabsModule } from '@angular/material/tabs'

//Our Generations
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './layout/dashboard/dashboard.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { HeaderComponent } from './layout/header/header.component';
import { LogoComponent } from './layout/header/logo/logo.component';
import { PageLoaderComponent } from './layout/page-loader/page-loader.component';
import { TestComponent } from './pages/test/test.component';
import { NavigationTriggerComponent } from './layout/header/navigation-trigger/navigation-trigger.component';
import { UserComponent } from './layout/sidebar/user/user.component';
import { LoginComponent } from './auth/login/login.component';
import { HttpclientInterceptor } from "./interceptors/httpclient.interceptor";
import { SignupComponent } from './auth/signup/signup.component';
import { ForgotpasswordComponent } from './auth/forgotpassword/forgotpassword.component';
import { VerifyComponent } from './auth/verify/verify.component';
import { CreateComponent } from './pages/user/profile/create/create.component';
import { ViewComponent } from './pages/user/profile/view/view.component';
import { ListComponent } from './pages/diary/list/list.component';
import { AddComponent } from './pages/diary/add/add.component';
import { SocialPagesModule } from './pages/user/profile/social_pages/social-pages.module';
import { EducationlistComponent } from './pages/my/education/educationlist/educationlist.component';
import { AddeducationComponent } from './pages/my/education/addeducation/addeducation.component';
import { UpdateeducationComponent } from './pages/my/education/updateeducation/updateeducation.component';
import { ListskillComponent } from './pages/my/skills/listskill/listskill.component';
import { AddskillsComponent } from './pages/my/skills/addskills/addskills.component';
import { SpinnerComponent } from './utilities/spinner/spinner.component';
import { ListexperienceComponent } from './pages/my/experience/listexperience/listexperience.component';
import { AddexperienceComponent } from './pages/my/experience/addexperience/addexperience.component';
import { ListachievementsComponent } from './pages/my/achievements/listachievements/listachievements.component';
import { AddachievementsComponent } from './pages/my/achievements/addachievements/addachievements.component';
import { DetailsComponent } from './pages/my/details/details/details.component';
import { EditDetailsComponent } from './pages/my/details/edit-details/edit-details.component';
import { HeaderPublicComponent } from './layout/header-public/header-public.component';
import { ListPortfolioComponent } from './pages/my/portfolio/list-portfolio/list-portfolio.component';
import { AddPortfolioComponent } from './pages/my/portfolio/add-portfolio/add-portfolio.component';
import { UpdateexperienceComponent } from './pages/my/experience/updateexperience/updateexperience.component';
import { ReviewListComponent } from './pages/my/reviews/review-list/review-list.component';
import { UpdateskillsComponent } from './pages/my/skills/updateskills/updateskills.component';
import { ListTaskComponent } from './pages/task/list-task/list-task.component';
import { AddTaskComponent } from './pages/task/add-task/add-task.component';
import { UpdateachievementComponent } from './pages/my/achievements/updateachievement/updateachievement.component';
import { UpdateportfolioComponent } from './pages/my/portfolio/updateportfolio/updateportfolio.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { BlogComponent } from "./pages/home/blog/blog.component";
import { JumbotronComponent } from './utilities/jumbotron/jumbotron.component';
import { ViewComponent as BlogViewComponent } from './pages/home/blog/view/view.component';
import { FllairTextFunctionsPipe } from './pages/home/blog/view/pipes/fllairtextfunctions.pipe';
import { UpdateComponent } from './pages/diary/update/update.component';
import { SubscribePremiumComponent } from './pages/home/premium/subscribe-premium/subscribe-premium.component';
import { PaymentPremiumComponent } from './pages/home/premium/payment-premium/payment-premium.component';
import { ChangepasswordComponent } from './auth/changepassword/changepassword.component';
import { AddPaymentComponent } from './pages/home/premium/add-payment/add-payment.component'
import {environment} from "../environments/environment";
import { EditTaskComponent } from './pages/task/edit-task/edit-task.component';
import { LeftpanelComponent } from './auth/includes/leftpanel/leftpanel.component';
import { ImporterComponent } from './tools/resume/importer/importer.component';
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { SettingsComponent } from './pages/user/settings/settings.component';
import { JobListComponent } from './pages/job/job-list/job-list.component';
import { ViewJobComponent } from './pages/job/view-job/view-job.component';
import { reducer } from './reducers/profile.reducer';
import { ManageVacanciesComponent } from './pages/job/manage-vacancies/manage-vacancies.component';
import { PrivateProfileComponentComponent } from './pages/profile/private-profile-component/private-profile-component.component';
import { DetailsPrivateProfileComponentComponent } from './pages/profile/components/details-private-profile-component/details-private-profile-component.component';
import { ExperiencePrivateProfileViewComponent } from './pages/profile/components/experience-private-profile-view/experience-private-profile-view.component';
import { SkillPrivateProfileViewComponent } from './pages/profile/components/skill-private-profile-view/skill-private-profile-view.component';
import { EducationPrivateProfileViewComponent } from './pages/profile/components/education-private-profile-view/education-private-profile-view.component';
import { AchievementsPrivateProfileViewComponent } from './pages/profile/components/achievements-private-profile-view/achievements-private-profile-view.component';
import { PortfoliosPrivateProfileViewComponent } from './pages/profile/components/portfolios-private-profile-view/portfolios-private-profile-view.component';
import { ReviewPrivateProfileViewComponent } from './pages/profile/components/review-private-profile-view/review-private-profile-view.component';
import { MapsComponent } from './utilities/maps/maps.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SidebarComponent,
    HeaderComponent,
    LogoComponent,
    PageLoaderComponent,
    TestComponent,
    NavigationTriggerComponent,
    UserComponent,
    LoginComponent,
    SignupComponent,
    ForgotpasswordComponent,
    VerifyComponent,
    CreateComponent,
    ViewComponent,
    ListComponent,
    AddComponent,
    EducationlistComponent,
    AddeducationComponent,
    UpdateeducationComponent,
    ListskillComponent,
    AddskillsComponent,
    SpinnerComponent,
    ListexperienceComponent,
    AddexperienceComponent,
    ListachievementsComponent,
    AddachievementsComponent,
    DetailsComponent,
    EditDetailsComponent,
    HeaderPublicComponent,
    ListPortfolioComponent,
    AddPortfolioComponent,
    UpdateexperienceComponent,
    ReviewListComponent,
    UpdateskillsComponent,
    ListTaskComponent,
    AddTaskComponent,
    UpdateachievementComponent,
    UpdateportfolioComponent,
    CalendarComponent,
    BlogComponent,
    JumbotronComponent,
    MapsComponent,
    BlogViewComponent,
    FllairTextFunctionsPipe,
    UpdateComponent,
    SubscribePremiumComponent,
    PaymentPremiumComponent,
    ChangepasswordComponent,
    AddPaymentComponent,
    EditTaskComponent,
    LeftpanelComponent,
    ImporterComponent,
    SettingsComponent,
    JobListComponent,
    ViewJobComponent,
    ManageVacanciesComponent,
    PrivateProfileComponentComponent,
    DetailsPrivateProfileComponentComponent,
    ExperiencePrivateProfileViewComponent,
    SkillPrivateProfileViewComponent,
    EducationPrivateProfileViewComponent,
    AchievementsPrivateProfileViewComponent,
    PortfoliosPrivateProfileViewComponent,
    ReviewPrivateProfileViewComponent,
    MapsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    PerfectScrollbarModule,
    NgxSpinnerModule,
    TooltipModule,
    MatPaginatorModule,
    NgSelectModule,
    SocialPagesModule, SelectDropDownModule,
    RoundProgressModule,
    NgxSelectModule,
    BsDropdownModule.forRoot(),
    ButtonsModule.forRoot(),
    ToastrModule.forRoot(),
    ModalModule.forRoot(),
    ProgressbarModule.forRoot(),
    BsDatepickerModule.forRoot(),
    MatTabsModule,
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
    TypeaheadModule.forRoot(),
    LightboxModule,
    NgxSocialShareModule,
    CrystalLightboxModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    NgcCookieConsentModule.forRoot(cookieConfig),
    DragDropModule,
    TabsModule.forRoot(),
    NgxIntlTelInputModule,
    StoreModule.forRoot({
      profile: reducer
    }),
    AgmCoreModule.forRoot({
      // please get your own API key here:
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en
      apiKey: 'AIzaSyBX9oGSWibe9Wl0XFtT8KWUmx_ib84hp9A'
    })
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpclientInterceptor,
      multi: true
    }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor() {
      console.log(environment.domain)
  }
}
