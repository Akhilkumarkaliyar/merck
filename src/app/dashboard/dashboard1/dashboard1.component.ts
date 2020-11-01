import { Component } from '@angular/core';
import * as Chartist from 'chartist';
import { ChartType, ChartEvent } from "ng-chartist";
import {ActivatedRoute ,Router} from '@angular/router';
import {ToasterService} from '../../shared/services/toaster.service';
import { LoaderService } from 'app/shared/services/loader.service';
import { getBootstrapListener } from '@angular/router/src/router_module';
import { CookieService } from 'ngx-cookie';
import {AppService} from '../../shared/services/service';


declare var require: any;

const data: any = require('../../shared/data/chartist.json');

export interface Chart {
    type: ChartType;
    data: Chartist.IChartistData;
    options?: any;
    responsiveOptions?: any;
    events?: ChartEvent;
}

@Component({
    selector: 'app-dashboard1',
    templateUrl: './dashboard1.component.html',
    styleUrls: ['./dashboard1.component.scss']
})

export class Dashboard1Component {

    constructor(private appservice: AppService,private router: Router, private route: ActivatedRoute, private toasterservice: ToasterService, private loaderservice: LoaderService, private cookieservice: CookieService ){}
   
    ngOnInit(){
        if(!this.cookieservice.get("loginuserMerck")){
            this.router.navigate(['/auth']);
        }
    }
    // line chart configuration Starts
    WidgetlineChart: Chart = {
        type: 'Line', data: data['WidgetlineChart'],
        options: {
            axisX: {
                showGrid: true,
                showLabel: false,
                offset: 0,
            },
            axisY: {
                showGrid: false,
                low: 40,
                showLabel: false,
                offset: 0,
            },
            lineSmooth: Chartist.Interpolation.cardinal({
                tension: 0
            }),
            fullWidth: true,
        },
    };
    // Line chart configuration Ends

}
