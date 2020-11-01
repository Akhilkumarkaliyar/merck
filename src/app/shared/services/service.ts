import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: "root"
})

export class AppService {
    baseurl = "http://localhost:8081/";

    constructor(private http: HttpClient) { }

    users(): Observable<any> {
        return this.http.get<any>(this.baseurl + "alldata");
    }
    logout(): Observable<any> { 
        return this.http.get<any>(this.baseurl + "userout");
    }
    hospital():Observable<any>{
        return this.http.get<any>(this.baseurl + "hospital");
    }
    country():Observable<any>{
        return this.http.get<any>(this.baseurl + "country");
    }
    slug():Observable<any>{
        return this.http.get<any>(this.baseurl + "sluglist");
    }
    slugdata():Observable<any>{
        return this.http.get<any>(this.baseurl + "slugdata");
    }
    adduser(id): Observable<any> {
        //console.log(id);return;
        return this.http.post<any>(
            this.baseurl + "register",
            { fname: id.fname,city: id.city,country : id.country,lname:id.lname,hospital:id.hospital,email:id.email,mobile:id.mobile},
            {
                headers: new HttpHeaders({
                    "Content-Type": "application/json"
                })
            }
        );
    }
    edituser(formdata,id): Observable<any> {
        //console.log(id);return;
        return this.http.post<any>(
            this.baseurl + "edituser",
            { fname: formdata.fname,city: formdata.city,country : formdata.country,lname:formdata.lname,hospital:formdata.hospital,email:formdata.email,mobile:formdata.mobile},
            {
                headers: new HttpHeaders({
                    "Content-Type": "application/json"
                })
            }
        );
    }
    resetpassword(formdata,id): Observable<any> {
        //console.log(id);return;
        return this.http.post<any>(
            this.baseurl + "setpassword",
            { password: formdata.password,cpassword: formdata.cpassword,id:id},
            {
                headers: new HttpHeaders({
                    "Content-Type": "application/json"
                })
            }
        );
    }
    forgotpassword(formdata,id): Observable<any> {
        //console.log(id);return;
        return this.http.post<any>(
            this.baseurl + "setpassword",
            { password: formdata.password,cpassword: formdata.cpassword,id:id},
            {
                headers: new HttpHeaders({
                    "Content-Type": "application/json"
                })
            }
        );
    }
    userDetail(id): Observable<any> {
        return this.http.post<any>(
            this.baseurl + "alldatabyuser",
            { id: id},
            {
                headers: new HttpHeaders({
                    "Content-Type": "application/json"
                })
            }
        );
    }
    addhospital(id): Observable<any> {
        console.log(id);
        return this.http.post<any>(
            this.baseurl + "createhospital",
            { name_en : id.name_ar,name_ar: id.name_ar},
            {
                headers: new HttpHeaders({
                    "Content-Type": "application/json"
                })
            }
        );
    }
    edithospital(formdata,id): Observable<any> {
        //console.log(id.name_ar);return;
        return this.http.post<any>(
            this.baseurl + "updatehospital",
            { name_en : formdata.name_en,name_ar: formdata.name_ar,id:id},
            {
                headers: new HttpHeaders({
                    "Content-Type": "application/json"
                })
            }
        );
    }
    HospitalDetail(id): Observable<any> {
        return this.http.post<any>(
            this.baseurl + "hospitalid",
            { id: id},
            {
                headers: new HttpHeaders({
                    "Content-Type": "application/json"
                })
            }
        );
    }
    SlugDetail(id): Observable<any> {
        return this.http.post<any>(
            this.baseurl + "slugid",
            { id: id},
            {
                headers: new HttpHeaders({
                    "Content-Type": "application/json"
                })
            }
        );
    }
    addslug(id): Observable<any> {
        console.log(id);
        return this.http.post<any>(
            this.baseurl + "createslug",
            { slug_name_en : id.slug_name_en,slug_name_ar: id.slug_name_ar},
            {
                headers: new HttpHeaders({
                    "Content-Type": "application/json"
                })
            }
        );
    }
    editslug(formdata,id): Observable<any> {
        //console.log(id.name_ar);return;
        return this.http.post<any>(
            this.baseurl + "updateslug",
            { slug_name_en : formdata.slug_name_en,slug_name_ar: formdata.slug_name_ar,id:id},
            {
                headers: new HttpHeaders({
                    "Content-Type": "application/json"
                })
            }
        );
    }
    deleteslug(id): Observable<any> {
        return this.http.post<any>(
            this.baseurl + "deleteslug",
            { id:id},
            {
                headers: new HttpHeaders({
                    "Content-Type": "application/json"
                })
            }
        );
    }
    SlugDataid(id): Observable<any> {
        return this.http.post<any>(
            this.baseurl + "slugdataid",
            { id: id},
            {
                headers: new HttpHeaders({
                    "Content-Type": "application/json"
                })
            }
        );
    }
    addslugdata(id, file): Observable<any> {
        const uploaddata = new FormData();
        uploaddata.append("image", file);
        uploaddata.append("slug_id", id.slug_id);
        uploaddata.append("title_en", id.title_en);
        uploaddata.append("title_ar", id.title_ar);
        uploaddata.append("description_en", id.description_en);
        uploaddata.append("description_ar", id.description_ar);
        return this.http.post<any>(
            this.baseurl + "createslugdata",
            uploaddata,
        );
    }
    editslugdata(formdata,id,file): Observable<any> {
        //console.log(formdata);return;
        if(file == undefined){
            file ='';
        }
        const uploaddata = new FormData();
        uploaddata.append("image", file);
        uploaddata.append("slug_id", formdata.slug_id);
        uploaddata.append("title_en", formdata.title_en);
        uploaddata.append("title_ar", formdata.title_ar);
        uploaddata.append("description_en", formdata.description_en);
        uploaddata.append("description_ar", formdata.description_ar);
        uploaddata.append("id", id);
        return this.http.post<any>(
            this.baseurl + "updateslugdata",
            uploaddata
        );
    }
    deleteslugdata(id): Observable<any> {
        return this.http.post<any>(
            this.baseurl + "deleteslugdata",
            { id:id},
            {
                headers: new HttpHeaders({
                    "Content-Type": "application/json"
                })
            }
        );
    }
    userLogin(email, password): Observable<any> {
        return this.http.post<any>(
            this.baseurl + "login",
            { email: email, password: password },
            {
                headers: new HttpHeaders({
                    "Content-Type": "application/json"
                })
            }
        );
    }
}