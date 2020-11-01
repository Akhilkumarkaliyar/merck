import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Dashboard1Component } from "./dashboard1/dashboard1.component";
import {AppuserComponent} from './appuser/appuser.component';
import {CreateUserComponent} from './create-user/create-user.component';
import {HospitalComponent} from './hospital/hospital.component';
import {CreateHospitalComponent} from './create-hospital/create-hospital.component';
import {SlugComponent } from './slug/slug.component';
import {CreateSlugComponent} from './create-slug/create-slug.component';
import {SlugdataComponent} from './slugdata/slugdata.component';
import {CreateSlugDataComponent} from './create-slugdata/create-slugdata.component';


const routes: Routes = [
  {
    path: '',
    children: [
     
      {
        path: 'dashboard',
        component: Dashboard1Component,
        data: {
          title: 'Dashboard'
        }
      },
      {
        path: 'appuser',
        component: AppuserComponent,
        data: {
          title: 'App user'
        }
      },
      {
        path: 'create-user/:id',
        component: CreateUserComponent,
        data: {
          title: 'Create User'
        }
      },
      {
        path: 'hospital',
        component: HospitalComponent,
        data: {
          title: 'Hospital list'
        }
      },
      {
        path: 'create-hospital/:id',
        component: CreateHospitalComponent,
        data: {
          title: 'Add Hospital'
        }
      },
      {
        path:'slug',
        component : SlugComponent,
        data :{
          title : 'Slug List'
        }
      },
      {
        path:'create-slug/:id',
        component : CreateSlugComponent,
        data :{
          title : 'Add Slug'
        }
      },
      {
        path:'slugdata',
        component : SlugdataComponent,
        data :{
          title : 'Slug data list'
        }
      },
      {
        path:'create-slugdata/:id',
        component : CreateSlugDataComponent,
        data :{
          title : 'Add Slug Data'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule { }
