import { Component, OnInit } from '@angular/core';
import {AppService} from '../../shared/services/service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {ActivatedRoute ,Router} from '@angular/router';
import {ToasterService} from '../../shared/services/toaster.service';
import { LoaderService } from 'app/shared/services/loader.service';
import { CookieService } from 'ngx-cookie';

@Component({
    selector: 'app-slug',
    templateUrl: './create-slugdata.component.html',
    styleUrls: ['./create-slugdata.component.scss']
})

export class CreateSlugDataComponent implements OnInit{
    showbutton: boolean;
    id: any;
    SlugdataForm: FormGroup;
    showErrorMsg: string;
    Sluglist: any;
    public editorValue: string = '';
    file: any;
    fileName: any;
    name: any;
    descen: any;
   constructor(private appservice: AppService,private router: Router, private route: ActivatedRoute, private toasterservice: ToasterService, private loaderservice: LoaderService, private cookieservice: CookieService  ){}
    
    ngOnInit(){
        if(!this.cookieservice.get("loginuserMerck")){
            this.router.navigate(['/auth']);
        }
        this.id = this.route.snapshot.paramMap.get('id');
        if(this.id){
            this.getslugdata();
            this.getSlugs();
            this.showbutton = true;
            console.log(this.id);
            this.SlugdataForm = new FormGroup({
                slug_id: new FormControl("", [Validators.required]),
                title_en: new FormControl("", [Validators.required]),
                title_ar: new FormControl("", [Validators.required]),
                description_en: new FormControl("", [Validators.required]),
                description_ar: new FormControl("", [Validators.required]),
            });
        }
    }
    getSlugs() {
        this.appservice.slug()
            .subscribe(
                data => {
                    if(data.status=='1'){
                        this.Sluglist = data.data;
                    }
                }
            );
    }
    getslugdata(){
        this.appservice.SlugDataid(this.id)
          .subscribe(
              data=>{
                  console.log(data);
                  if(data.status=='1')
                  {
                      this.showErrorMsg = "";
                      this.descen=data.data[0];
                      this.SlugdataForm = new FormGroup({
                        slug_id: new FormControl(data.data[0].slug_id, [Validators.required]),
                        title_en: new FormControl(data.data[0].title_en, [Validators.required]),
                        title_ar: new FormControl(data.data[0].title_ar, [Validators.required]),
                        description_en: new FormControl(data.data[0].description_en, [Validators.required]),
                        description_ar: new FormControl(data.data[0].description_ar, [Validators.required]),
                        image: new FormControl(data.data[0].image, [Validators.required]),
                      });
                      
                  }else{
                      this.showbutton = false;
                  }
              }
          );
    }

    filechange(e){
        this.file = e.target.files[0];
        console.log(this.file);
        this.fileName = e.target.files[0];
        this.name = e.target.files[0].name;
    }
    createslugdata(image){
        if(this.SlugdataForm.invalid){
            return;
        }    
        if(this.SlugdataForm.valid){
            console.log(this.SlugdataForm);
            this.loaderservice.display(true);
            this.appservice.addslugdata( this.SlugdataForm.value, this.fileName)
            .subscribe(
            data=>{
                console.log(data);
                if(data.status=='1')
                {
                    this.toasterservice.Success(data.message);   
                    this.router.navigate(['/slugdata']);                
                }else if(data.status=='2'){
                    this.toasterservice.Error(data.message);
                    this.router.navigate(['/slugdata']);  
                }else{
                    this.toasterservice.Error(data.message);
                }
            }
        );
            //console.log(this.UserForm.value);
        }
    }
    editslugdata(){
        if(this.SlugdataForm.invalid){
            return;
        }    
        if(this.SlugdataForm.valid){
            this.loaderservice.display(true);
            this.appservice.editslugdata(this.SlugdataForm.value,this.id,this.fileName)
            .subscribe(
                data=>{
                    console.log(data);
                    if(data.status=='1')
                    {
                        this.toasterservice.Success(data.message);   
                        this.router.navigate(['/slugdata']);                
                    }else if(data.status=='2'){
                        this.toasterservice.Error(data.message);
                        this.router.navigate(['/slugdata']);  
                    }else{
                        this.toasterservice.Error(data.message);
                    }
                }
            );
        }
    }
    Gotolist(){
        this.router.navigate(['/slugdata']);
    }

}


