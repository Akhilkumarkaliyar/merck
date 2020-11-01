import { Component, OnInit } from '@angular/core';
import {AppService} from '../../shared/services/service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {ActivatedRoute ,Router} from '@angular/router';
import {ToasterService} from '../../shared/services/toaster.service';
import { LoaderService } from 'app/shared/services/loader.service';
import { getBootstrapListener } from '@angular/router/src/router_module';
import { CookieService } from 'ngx-cookie';
@Component({
    selector: 'app-auth',
    templateUrl: './create-hospital.component.html',
    styleUrls: ['./create-hospital.component.scss']
})

export class CreateHospitalComponent implements OnInit{
    id: string;
    showbutton: boolean;
    HospitalForm: FormGroup;
    showErrorMsg: string;
    constructor(private appservice: AppService,private router: Router, private route: ActivatedRoute, private toasterservice: ToasterService, private loaderservice: LoaderService, private cookieservice: CookieService ){}

    ngOnInit(){
        if(!this.cookieservice.get("loginuserMerck")){
            this.router.navigate(['/auth']);
        }
        this.id = this.route.snapshot.paramMap.get('id');
        if(this.id){
            this.gethospital();
            this.showbutton = true;
            console.log(this.id);
            this.HospitalForm = new FormGroup({
                name_en: new FormControl("", [Validators.required]),
                name_ar: new FormControl("", [Validators.required]),
               });
        }
    }
    gethospital(){
      this.appservice.HospitalDetail(this.id)
        .subscribe(
            data=>{
                console.log(data);
                if(data.status=='1')
                {
                    this.showErrorMsg = "";
                    this.HospitalForm = new FormGroup({
                        name_en: new FormControl(data.data[0].name_en, [Validators.required]),
                        name_ar: new FormControl(data.data[0].name_ar, [Validators.required]),
                    });
                    
                }else{
                    this.showbutton = false;
                }
            }
        );
    }
    createhospital(){
        if(this.HospitalForm.invalid){
            return;
        }    
        if(this.HospitalForm.valid){
            this.loaderservice.display(true);
            this.appservice.addhospital(this.HospitalForm.value)
            .subscribe(
            data=>{
                console.log(data);
                if(data.status=='1')
                {
                    this.toasterservice.Success(data.message);   
                    this.router.navigate(['/hospital']);                
                }else if(data.status=='2'){
                    this.toasterservice.Error(data.message);
                    this.router.navigate(['/hospital']);  
                }else{
                    this.toasterservice.Error(data.message);
                }
            }
        );
            //console.log(this.UserForm.value);
        }
    }
    edithospital(){
        if(this.HospitalForm.invalid){
            return;
        }    
        if(this.HospitalForm.valid){
            this.loaderservice.display(true);
            this.appservice.edithospital(this.HospitalForm.value,this.id)
            .subscribe(
                data=>{
                    console.log(data);
                    if(data.status=='1')
                    {
                        this.toasterservice.Success(data.message);   
                        this.router.navigate(['/hospital']);                
                    }else if(data.status=='2'){
                        this.toasterservice.Error(data.message);
                        this.router.navigate(['/hospital']);  
                    }else{
                        this.toasterservice.Error(data.message);
                    }
                }
            );
        }
    }
    Gotolist(){
        this.router.navigate(['/hospital']);
    }
}


