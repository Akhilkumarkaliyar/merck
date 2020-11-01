import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

import { DashboardRoutingModule } from "./dashboard-routing.module";
import { ChartistModule } from 'ng-chartist';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatchHeightModule } from "../shared/directives/match-height.directive";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { Dashboard1Component } from "./dashboard1/dashboard1.component";
//import { Dashboard2Component } from "./dashboard2/dashboard2.component";
import {AppuserComponent} from './appuser/appuser.component';
import {CreateUserComponent} from './create-user/create-user.component';
import {HospitalComponent} from './hospital/hospital.component';
import {CreateHospitalComponent} from './create-hospital/create-hospital.component';
import {SlugComponent} from './slug/slug.component';
import {CreateSlugComponent} from './create-slug/create-slug.component';
import {SlugdataComponent} from './slugdata/slugdata.component';
import {CreateSlugDataComponent} from './create-slugdata/create-slugdata.component';
import { CKEditorModule } from 'ngx-ckeditor';


@NgModule({
    imports: [
        CommonModule,
        DashboardRoutingModule,
        ChartistModule,
        NgbModule,
        MatchHeightModule,
        ReactiveFormsModule, 
        FormsModule,
        CKEditorModule
    ],
    exports: [],
    declarations: [
        Dashboard1Component,
        AppuserComponent,
        CreateUserComponent,
        HospitalComponent,
        CreateHospitalComponent,
        SlugComponent,
        CreateSlugComponent,
        SlugdataComponent,
        CreateSlugDataComponent
    ],
    providers: [],
})
export class DashboardModule { }
