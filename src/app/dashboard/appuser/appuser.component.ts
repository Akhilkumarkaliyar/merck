import { Component, ViewChild } from '@angular/core';
import { AppService } from '../../shared/services/service';
import {Router} from '@angular/router';
import { CookieService } from 'ngx-cookie';

@Component({
    selector: 'app-appuser',
    templateUrl: './appuser.component.html',
    styleUrls: ['./appuser.component.scss']
})

export class AppuserComponent {
    userData: any;
  

    constructor(private appservice: AppService, private route: Router, private cookieservice: CookieService){
    }

    ngOnInit(){
    if(!this.cookieservice.get("loginuserMerck")){
        this.route.navigate(['/auth']);
    }
    this.getUsers();
    }

    getUsers(){
        this.appservice.users()
        .subscribe(
            data=>{
                if(data.status=='1'){
                    this.userData = data.data;
                }
            }
        );
        }

        goToCreateUser(id){
           // alert();
          this.route.navigate(['/create-user', id]);
        }


}