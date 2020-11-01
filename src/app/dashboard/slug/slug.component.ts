import { Component, OnInit } from '@angular/core';
import { AppService } from '../../shared/services/service';
import { ActivatedRoute,Router } from '@angular/router';
import {ToasterService} from '../../shared/services/toaster.service';
import { LoaderService } from 'app/shared/services/loader.service';
import { CookieService } from 'ngx-cookie';
@Component({
    selector: 'app-slug',
    templateUrl: './slug.component.html',
    styleUrls: ['./slug.component.scss']
})

export class SlugComponent implements OnInit {
    Slugdata: any;
    constructor(private appservice: AppService,private router: Router, private route: ActivatedRoute, private toasterservice: ToasterService, private loaderservice: LoaderService, private cookieservice: CookieService  ){}

    ngOnInit() {
        if(!this.cookieservice.get("loginuserMerck")){
            this.router.navigate(['/auth']);
        }
        this.getSlug();
    }

    getSlug() {
        this.appservice.slug()
            .subscribe(
                data => {
                    if(data.status=='1'){
                        this.Slugdata = data.data;
                    }
                }
            );
    }
    goToCreateSlug(id) {
        this.router.navigate(['/create-slug', id]);
    }
    goToaddslug(id) {
        this.router.navigate(['/create-slug', id]);
    }
    deleteSlug(id){
        this.appservice.deleteslug(id)
            .subscribe(
                data => {
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
