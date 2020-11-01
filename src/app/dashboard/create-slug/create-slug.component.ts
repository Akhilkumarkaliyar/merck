import { Component, OnInit } from '@angular/core';
import {AppService} from '../../shared/services/service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {ActivatedRoute ,Router} from '@angular/router';
import {ToasterService} from '../../shared/services/toaster.service';
import { LoaderService } from 'app/shared/services/loader.service';
import { CookieService } from 'ngx-cookie';
@Component({
    selector: 'app-slug',
    templateUrl: './create-slug.component.html',
    styleUrls: ['./create-slug.component.scss']
})

export class CreateSlugComponent implements OnInit{
    showbutton: boolean;
    id: any;
    SlugForm: FormGroup;
    showErrorMsg: string;
    constructor(private appservice: AppService,private router: Router, private route: ActivatedRoute, private toasterservice: ToasterService, private loaderservice: LoaderService, private cookieservice: CookieService  ){}
    ngOnInit(){
        if(!this.cookieservice.get("loginuserMerck")){
            this.router.navigate(['/auth']);
        }
        this.id = this.route.snapshot.paramMap.get('id');
        if(this.id){
            this.getslug();
            this.showbutton = true;
            console.log(this.id);
            this.SlugForm = new FormGroup({
                slug_name_en: new FormControl("", [Validators.required]),
                slug_name_ar: new FormControl("", [Validators.required]),
               });
        }
    }
    getslug(){
        this.appservice.SlugDetail(this.id)
          .subscribe(
              data=>{
                  console.log(data);
                  if(data.status=='1')
                  {
                      this.showErrorMsg = "";
                      this.SlugForm = new FormGroup({
                        slug_name_en: new FormControl(data.data[0].slug_name_en, [Validators.required]),
                        slug_name_ar: new FormControl(data.data[0].slug_name_ar, [Validators.required]),
                      });
                      
                  }else{
                      this.showbutton = false;
                  }
              }
          );
    }
    createslug(){
        if(this.SlugForm.invalid){
            return;
        }    
        if(this.SlugForm.valid){
            this.loaderservice.display(true);
            this.appservice.addslug(this.SlugForm.value)
            .subscribe(
            data=>{
                console.log(data);
                if(data.status=='1')
                {
                    this.toasterservice.Success(data.message);   
                    this.router.navigate(['/slug']);                
                }else if(data.status=='2'){
                    this.toasterservice.Error(data.message);
                    this.router.navigate(['/slug']);  
                }else{
                    this.toasterservice.Error(data.message);
                }
            }
        );
            //console.log(this.UserForm.value);
        }
    }
    editslug(){
        if(this.SlugForm.invalid){
            return;
        }    
        if(this.SlugForm.valid){
            this.loaderservice.display(true);
            this.appservice.editslug(this.SlugForm.value,this.id)
            .subscribe(
                data=>{
                    console.log(data);
                    if(data.status=='1')
                    {
                        this.toasterservice.Success(data.message);   
                        this.router.navigate(['/slug']);                
                    }else if(data.status=='2'){
                        this.toasterservice.Error(data.message);
                        this.router.navigate(['/slug']);  
                    }else{
                        this.toasterservice.Error(data.message);
                    }
                }
            );
        }
    }
    Gotolist(){
        this.router.navigate(['/slug']);
    }

}


