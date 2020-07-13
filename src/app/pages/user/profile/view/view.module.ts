import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";

// Pages
import { OverviewComponent } from "../overview/overview.component";
import { ExperienceComponent } from "../experience/experience.component";
import {AchievementsComponent} from "../achievements/achievements.component";
import { ReviewsComponent } from "../reviews/reviews.component";
import { SkillsComponent } from "../skills/skills.component";
import { ProjectsComponent } from "../projects/projects.component";
import { PortfolioComponent } from "../portfolio/portfolio.component";
import { EducationComponent } from "../education/education.component";
import { DashboardComponent } from "../dashboard/dashboard.component";
import { EditComponent } from "../edit/edit.component";
import { ChartComponent } from "../chart_components/chart/chart.component";
import { GraphComponent } from "../chart_components/graph/graph.component";

import { ProgressbarModule } from 'ngx-bootstrap/progressbar'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { RoundProgressModule } from 'angular-svg-round-progressbar';

const PROFILE_ROUTE = [
    
    {
        path: '',
        redirectTo: 'details',
        pathMatch: 'full'
    },
    {
        path: 'details',
        component: OverviewComponent
    },
    {
        path: 'achievements',
        component: AchievementsComponent
    },
    {
        path: 'experience',
        component: ExperienceComponent
    },
    {
        path: 'skills',
        component: SkillsComponent
    },
    {
        path: 'projects',
        component: ProjectsComponent
    },
    {
        path: 'portfolio',
        component: PortfolioComponent
    },
    {
        path: 'education',
        component: EducationComponent
    },
    {
        path: 'reviews',
        component: ReviewsComponent
    }
    
];

@NgModule({
    declarations: [
        OverviewComponent,
        ExperienceComponent,
        AchievementsComponent,
        SkillsComponent,
        ProjectsComponent,
        PortfolioComponent,
        EducationComponent,
        DashboardComponent,
        ChartComponent,
        GraphComponent,
        EditComponent,
        ReviewsComponent,
    ],
    imports: [
        CommonModule,
        Ng2GoogleChartsModule,
        ProgressbarModule.forRoot(),
        FormsModule,
        ReactiveFormsModule, RoundProgressModule,
        RouterModule.forChild(PROFILE_ROUTE)
    ],

    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ViewModule {
}
