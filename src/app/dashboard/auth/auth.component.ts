import { Component, OnInit } from '@angular/core';
import { AppService } from '../../shared/services/service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss']
})

export class AuthComponent implements OnInit{

constructor(private appservice: AppService, private route: Router, private cookieservice: CookieService){}

loginForm: FormGroup;
showErrorMsg: string;
loginData: any;

ngOnInit(){
this.loginForm = new FormGroup({
    email: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required]),
    recaptcha: new FormControl("6LeXeKIUAAAAAIaHWfuz6ZAczyN9hzUQf6gqlNWh",[Validators.required])
  });
}

onSubmit(){
    if(this.loginForm.invalid){
        return;
    }
    if(this.loginForm.valid){
        this.appservice.userLogin(this.loginForm.value.email, this.loginForm.value.password)
        .subscribe(
            data=>{
                if(data.status =="1"){
                    this.showErrorMsg = "";
                    this.loginData = data.data;
                    this.cookieservice.put("loginuserMerck",JSON.stringify(this.loginData));
                    this.loginForm.reset();
                    this.route.navigate(['/dashboard']);
                }
                else{
                    this.showErrorMsg = data.message;
                }
            },
            error=>{
                console.log(error);
            }
        );
    }
}

}
