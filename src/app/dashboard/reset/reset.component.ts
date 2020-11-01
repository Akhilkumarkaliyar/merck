import { Component, OnInit } from '@angular/core';
import { AppService } from '../../shared/services/service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterService } from '../../shared/services/toaster.service';
import { LoaderService } from 'app/shared/services/loader.service';
import { getBootstrapListener } from '@angular/router/src/router_module';

@Component({
    selector: 'app-reset',
    templateUrl: './reset.component.html',
    styleUrls: ['./reset.component.scss']
})

export class ResetComponent implements OnInit {

    id: string;
    ResetForm: FormGroup;
    showErrorMsg: string;
    constructor(private appservice: AppService,private router: Router, private route: ActivatedRoute, private toasterservice: ToasterService, private loaderservice: LoaderService){}
    ngOnInit(){
        this.id = this.route.snapshot.paramMap.get('id');
        if(this.id){
            console.log(this.id);
            this.ResetForm = new FormGroup({
               // password: new FormControl("", [Validators.required]),
                password: new FormControl('', Validators.compose([
                    Validators.minLength(10),
                    Validators.required,
                    Validators.pattern('(?=^.{10,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$') //this is for the letters (both uppercase and lowercase) and numbers validation
                 ])),
                cpassword: new FormControl("", [Validators.required]),
               });
        }
    }
    resetpassword(){
        if(this.ResetForm.invalid){
            return;
        }    
        if(this.ResetForm.valid){
            this.loaderservice.display(true);
            this.appservice.resetpassword(this.ResetForm.value,this.id)
            .subscribe(
                data=>{
                    console.log(data);
                    if(data.status=='1')
                    {
                        this.toasterservice.Success(data.message);   
                        this.router.navigate(['/auth']);                
                    }else if(data.status=='2'){
                        this.toasterservice.Error(data.message);
                        this.router.navigate(['/reset/',this.id]);  
                    }else{
                        this.toasterservice.Error(data.message);
                    }
                }
            );
        }
    }
    Gotolist(){
        this.router.navigate(['/auth']);
    }

}