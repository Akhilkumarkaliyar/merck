import { Component, OnInit } from '@angular/core';
import { AppService } from '../../shared/services/service';
import { Router,ActivatedRoute } from '@angular/router';
import {ToasterService} from '../../shared/services/toaster.service';
import { LoaderService } from 'app/shared/services/loader.service';
import { CookieService } from 'ngx-cookie';
@Component({
    selector: 'app-slugdata',
    templateUrl: './slugdata.component.html',
    styleUrls: ['./slugdata.component.scss']
})

export class SlugdataComponent implements OnInit {
    Slugdata: any;
    constructor(private appservice: AppService,private router: Router, private route: ActivatedRoute, private toasterservice: ToasterService, private loaderservice: LoaderService, private cookieservice: CookieService ){}
    ngOnInit() {
        if(!this.cookieservice.get("loginuserMerck")){
            this.router.navigate(['/auth']);
        }
        this.getSlugdata();
    }

    getSlugdata() {
        this.appservice.slugdata()
            .subscribe(
                data => {
                    if(data.status=='1'){
                        this.Slugdata = data.data;
                    }
                }
            );
    }
    goToCreatedata(id) {
        // alert();
        this.router.navigate(['/create-slugdata',id]);
    }
    deleteSlugdata(id){
        this.appservice.deleteslugdata(id)
            .subscribe(
                data => {
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
