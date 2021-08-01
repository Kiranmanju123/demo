import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient,HttpHeaders } from '@angular/common/http';
let headers = new HttpHeaders();

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private http:HttpClient) {
    headers=headers.set("Authorization" , "Bearer " +localStorage.getItem("token"));
   }

   getAdress() {
    return this.http.get(`${environment.ip}address`)
   }


}
