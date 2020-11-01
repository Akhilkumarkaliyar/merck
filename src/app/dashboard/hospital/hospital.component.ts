import { Component, OnInit } from '@angular/core';
import { AppService } from '../../shared/services/service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';

@Component({
    selector: 'app-hospital',
    templateUrl: './hospital.component.html',
    styleUrls: ['./hospital.component.scss']
})

export class HospitalComponent implements OnInit {
    hospitaldata: any;
    constructor(private appservice: AppService, private route: Router, private cookieservice: CookieService) { }

    ngOnInit() {
        if (!this.cookieservice.get("loginuserMerck")) {
            this.route.navigate(['/auth']);
        }
        this.getHospital();
    }

    getHospital() {
        this.appservice.hospital()
            .subscribe(
                data => {
                    if (data.status == '1') {
                        this.hospitaldata = data.data;
                    }
                }
            );
    }
    goToCreateUser(id) {
        // alert();
        this.route.navigate(['/create-hospital', id]);
    }
    goToaddhospital(id) {
        // alert();
        this.route.navigate(['/create-hospital', id]);
    }

}
