import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './layout/dashboard/dashboard.component';
import { TestComponent } from './pages/test/test.component';
import { LoginComponent } from "./auth/login/login.component";

import { LoggedinGuard } from "./guards/loggedin.guard";
import { HasSessionGuard } from "./guards/hassession.guard";
import { SignupComponent } from "./auth/signup/signup.component";
import { ForgotpasswordComponent } from "./auth/forgotpassword/forgotpassword.component";
import { VerifyComponent } from "./auth/verify/verify.component";
import { HasProfileGuard }  from "./guards/hasprofile.guard";
import { CreateComponent } from './pages/user/profile/create/create.component'
import { ViewComponent as ViewProfileComponent } from './pages/user/profile/view/view.component'
import { ViewComponent as ViewPublicProfileComponent } from './pages/public/profile/view/view.component'
import { ListComponent as DiaryListComponent } from './pages/diary/list/list.component'
import { AddComponent as AddDiaryComponent } from './pages/diary/add/add.component'
import { EducationlistComponent } from './pages/my/education/educationlist/educationlist.component'
import { AddeducationComponent } from './pages/my/education/addeducation/addeducation.component'
import { UpdateeducationComponent } from './pages/my/education/updateeducation/updateeducation.component'
import { ListskillComponent } from './pages/my/skills/listskill/listskill.component'
import { AddskillsComponent } from './pages/my/skills/addskills/addskills.component'
import { EducationDataResolver } from "./pages/my/education/resolvers/educationdata.resolver";
import { EducationUpdateResolver } from "./pages/my/education/updateeducation/resolvers/educationupdate.resolver";
import { ListexperienceComponent } from './pages/my/experience/listexperience/listexperience.component'
import { AddexperienceComponent } from './pages/my/experience/addexperience/addexperience.component'
import { ListachievementsComponent } from './pages/my/achievements/listachievements/listachievements.component'
import { AddachievementsComponent } from './pages/my/achievements/addachievements/addachievements.component'
import { DetailsComponent } from './pages/my/details/details/details.component'
import { EditDetailsComponent } from './pages/my/details/edit-details/edit-details.component'
import { GetPublicProfileResolver } from "./pages/user/profile/resolvers/getpublicprofile.resolver";
import { ListPortfolioComponent } from './pages/my/portfolio/list-portfolio/list-portfolio.component'
import { AddPortfolioComponent } from './pages/my/portfolio/add-portfolio/add-portfolio.component'
import { UpdateexperienceComponent } from './pages/my/experience/updateexperience/updateexperience.component';
import { ExperienceUpdateResolver } from "./pages/my/experience/updateexperience/resolvers/experienceupdate.resolver";
import { ReviewListComponent } from './pages/my/reviews/review-list/review-list.component'
import { UpdateskillsComponent } from './pages/my/skills/updateskills/updateskills.component';
import { SkillsUpdateResolver } from "./pages/my/skills/updateskills/resolvers/skillsupdate.resolver";
import {SkillsDataResolver } from "./pages/my/skills/resolvers/skillsdata.resolver";
import {GetPublicSkillsResolver} from "./pages/user/profile/resolvers/getpublicskills.resolver";
import {GetPublicAchievementsResolver} from "./pages/user/profile/resolvers/getpublicachievements.resolver";
import {GetPublicEducationResolver} from "./pages/user/profile/resolvers/getpubliceducation.resolver";
import {GetPublicExperienceResolver} from "./pages/user/profile/resolvers/getpublicexperience.resolver";
import {GetPublicPortfolioResolver} from "./pages/user/profile/resolvers/getpublicportfolio.resolver";
import {GetPublicReviewsResolver} from "./pages/user/profile/resolvers/getpublicreviews.resolver";
import { ListTaskComponent } from './pages/task/list-task/list-task.component'
import { EditTaskComponent } from './pages/task/edit-task/edit-task.component'
import { TaskUpdateResolver } from './pages/task/edit-task/resolvers/taskupdate.resolver'
import { AddTaskComponent } from './pages/task/add-task/add-task.component'
import { UpdateachievementComponent } from './pages/my/achievements/updateachievement/updateachievement.component';
import { AchievementUpdateResolver } from "./pages/my/achievements/updateachievement/resolvers/achievementupdate.resolver";
import { TaskDataResolver } from './pages/task/resolvers/taskdata.resolver'
import { UpdateportfolioComponent } from './pages/my/portfolio/updateportfolio/updateportfolio.component';
import { PortfolioUpdateResolver } from "./pages/my/portfolio/updateportfolio/resolvers/portfolioupdate.resolver";
import { CalendarComponent } from './pages/calendar/calendar.component'
import { CalendarDataResolver } from './pages/calendar/calendar.resolver'
import {BlogComponent} from "./pages/home/blog/blog.component";
import {BlogDataResolver} from "./pages/home/blog/resolvers/blogdata.resolver";
import { ViewComponent as BlogViewComponent } from "./pages/home/blog/view/view.component";
import {BlogPostDataResolver} from "./pages/home/blog/view/resolvers/blogpostdata.resolver";
import {  AcheivementDataResolver } from './pages/my/achievements/resolver/achievement.resolver'
import { ExperienceDataResolver } from './pages/my/experience/resolver/experience.resolver'
import { PortfolioDataResolver } from './pages/my/portfolio/resolver/portfolio.resolver'
import { DiaryDataResolver } from './pages/diary/resolvers/diarydata.resolver'
import { UpdateComponent } from "./pages/diary/update/update.component";
import { DiaryUpdateResolver } from './pages/diary/update/resolvers/diaryupdate.resolver'
import { SubscribePremiumComponent } from './pages/home/premium/subscribe-premium/subscribe-premium.component'
import { PlanDataResolver } from './pages/home/premium/resolver/plan.resolver'
import { PaymentPremiumComponent } from './pages/home/premium/payment-premium/payment-premium.component'
import { PaymentMethodResolver } from './pages/home/premium/resolver/paymentmethod.resolver'
import { DetailsDataResolver } from './pages/my/details/details/resolver/details.resolver';
import { ReviewDataResolver } from './pages/my/reviews/resolver/review.resolver'
import { ChangepasswordComponent } from './auth/changepassword/changepassword.component'
import { AddPaymentComponent } from './pages/home/premium/add-payment/add-payment.component'
import { ProfileDataResolver } from './pages/home/premium/resolver/profile.resolver'
import { ProfileDataResolver as UserPremiumResolver } from './layout/sidebar/resolver/user.resolver'
import { ImporterComponent } from './tools/resume/importer/importer.component'
import { SettingsComponent } from './pages/user/settings/settings.component';
import { JobListComponent } from './pages/job/job-list/job-list.component';
import { ViewJobComponent } from './pages/job/view-job/view-job.component';
import { ApplicationsComponent } from "./pages/job/manage/applications/applications.component";
import { ApplicationsDataResolver } from "./pages/job/manage/applications/resolver/applications.resolver";
import { JobDataResolver } from './pages/job/job-list/resolver/job.resolver'
import { ViewJobResolver } from './pages/job/view-job/resolver/viewjob.resolver'
import { PrivateProfileComponentComponent } from './pages/profile/private-profile-component/private-profile-component.component'
import { PrivateProfileResolver } from './pages/profile/resolvers/private.profile.resolver'

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [
      HasProfileGuard,
      HasSessionGuard,
    ],
    children: [
      {
        path: '',
        redirectTo: 'blog/news',
        pathMatch: 'full'
      },
      {
        path: 'blog/:category',
        component: BlogComponent,
        resolve: { posts: BlogDataResolver }
      },
      {
        path: 'blog/:category/:id',
        component: BlogViewComponent,
        resolve: { post: BlogPostDataResolver }
      },
      {
        path: 'tools/resume/importer',
        component: ImporterComponent,
        loadChildren: () => import('./tools/resume/importer/importer.module').then(m => m.ImporterModule)
      },
      {
        path: 'profile/view/:username',
        component: ViewProfileComponent,
        resolve: {
          userProfile: GetPublicProfileResolver,
          userSkills: GetPublicSkillsResolver,
          userAchievements: GetPublicAchievementsResolver,
          userEducation: GetPublicEducationResolver,
          userExperience: GetPublicExperienceResolver,
          userPortfolio: GetPublicPortfolioResolver,
          userReviews: GetPublicReviewsResolver
        },
        loadChildren: () => import('./pages/user/profile/view/view.module').then(m => m.ViewModule)
      },
      {
        path: 'public/profile/:username',
        component: ViewPublicProfileComponent
      },
      {
        path: 'settings',
        component: SettingsComponent,
        resolve: { userData: ProfileDataResolver },
        loadChildren: () => import('./pages/user/settings/settings.module').then(m => m.SettingsModule)
      },
      {
        path: 'diary',
        component: DiaryListComponent,
        resolve: { diaryData: DiaryDataResolver }
      },
      {
        path: 'diary/create',
        component: AddDiaryComponent
      },
      {
        path: 'diary/update/:id',
        component: UpdateComponent,
        resolve: { diaryData: DiaryUpdateResolver }
      },
      {
        path: 'my/education',
        component: EducationlistComponent,
        resolve: {educationData: EducationDataResolver}
      },
      {
        path: 'my/education/add',
        component: AddeducationComponent
      },
      {
        path: 'my/education/update/:id',
        component: UpdateeducationComponent,
        resolve: {educationData: EducationUpdateResolver}
      },
      {
        path: 'my/skills/update/:id',
        component: UpdateskillsComponent,
        resolve: { skillsData: SkillsUpdateResolver }
      },
      {
        path: 'my/skills/insertMany',
        component: AddskillsComponent
      },
      {
        path: 'my/skills',
        component: ListskillComponent,
        resolve: { skillData: SkillsDataResolver }
      },
      {
        path: 'my/experiences',
        component: ListexperienceComponent,
        resolve: { experienceData: ExperienceDataResolver}
      },
      {
        path: 'my/experiences/insertMany',
        component: AddexperienceComponent
      },
      {
        path: 'my/experiences/update/:id',
        component: UpdateexperienceComponent,
        resolve: { experienceData: ExperienceUpdateResolver }
      },
      {
        path: 'my/achievements',
        component: ListachievementsComponent,
        resolve: { achievementData: AcheivementDataResolver }
      },
      {
        path: 'my/achievements/insertMany',
        component: AddachievementsComponent
      },
      {
        path: 'my/achievements/update/:id',
        component: UpdateachievementComponent,
        resolve: { achievementData: AchievementUpdateResolver }
      },
      {
        path: 'my/details',
        component: DetailsComponent,
        resolve: { detailsData: DetailsDataResolver },
        loadChildren: () => import('./pages/my/details/details/details.module').then(m => m.DetailsModule)
      },
      {
        path: 'my/details/edit',
        component: EditDetailsComponent
      },
      {
        path: 'my/portfolio',
        component: ListPortfolioComponent,
        resolve: { portfolioData: PortfolioDataResolver }
      },
      {
        path: 'my/portfolio/add',
        component: AddPortfolioComponent
      },
      {
        path: 'my/portfolio/update/:id',
        component: UpdateportfolioComponent,
        resolve: { portfolioData: PortfolioUpdateResolver }
      },
      {
        path: 'my/reviews',
        component: ReviewListComponent,
        resolve: { reviewData: ReviewDataResolver }
      },
      {
        path: 'jobs/search',
        component: JobListComponent,
        resolve: { jobData: JobDataResolver }
      },
      {
        path: 'jobs/view/:id',
        component: ViewJobComponent,
        resolve: { jobViewData: ViewJobResolver }
      },
      {
        path: 'jobs/manage/applications',
        component: ApplicationsComponent,
        resolve: { applicationsData: ApplicationsDataResolver }
      },
      {
        path: 'tasks',
        component: ListTaskComponent,
        resolve: { taskData: TaskDataResolver }
      },
      {
        path: 'tasks/create',
        component: AddTaskComponent,
        resolve: { taskData: TaskDataResolver }
      },
      {
        path: 'tasks/update/:id',
        component: EditTaskComponent,
        resolve: { taskData: TaskUpdateResolver }
      },
      {
        path: 'calendar',
        component: CalendarComponent,
        resolve: { calendarData: CalendarDataResolver }
      },
      {
        path: 'premium',
        component: SubscribePremiumComponent,
        resolve: { planData: PlanDataResolver }
      },
      {
        path: 'premium/payment/:planId',
        component: PaymentPremiumComponent,
        resolve: { planData: PlanDataResolver, paymentMethodData: PaymentMethodResolver, profileData: ProfileDataResolver }
      },
      {
        path: 'premium/add-payment',
        component: AddPaymentComponent,
        resolve: { paymentMethodData: PaymentMethodResolver }
      }
    ],
    resolve: { taskData: TaskDataResolver, userPremium: UserPremiumResolver }
  },
  {
    path: 'auth/login',
    component: LoginComponent
  },
  {
    path: 'auth/signup',
    component: SignupComponent
  },
  {
    path: 'auth/forgot/changepassword',
    component: ChangepasswordComponent
  },
  {
    path: 'auth/forgot',
    component: ForgotpasswordComponent
  },
  {
    path: 'auth/verify/:verificationid',
    component: VerifyComponent
  },
  {
    path: 'profile/create',
    component: CreateComponent,
    canActivate: [
      LoggedinGuard
    ]
  },
  {//public profile links (reuses internal profile pages)
    path: 'u/:username',
    component: ViewProfileComponent,
    data: {publicView: true},
    resolve: {
      userProfile: GetPublicProfileResolver,
      userSkills: GetPublicSkillsResolver,
      userAchievements: GetPublicAchievementsResolver,
      userEducation: GetPublicEducationResolver,
      userExperience: GetPublicExperienceResolver,
      userPortfolio: GetPublicPortfolioResolver,
      userReviews: GetPublicReviewsResolver
    },    loadChildren: () => import('./pages/user/profile/view/view.module').then(m => m.ViewModule)
  },
  {
    path: 'u/:username/private/:code',
    component: PrivateProfileComponentComponent,
    resolve: {
      profile: PrivateProfileResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
