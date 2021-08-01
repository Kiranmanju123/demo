import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
let headers = new HttpHeaders();

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) {
    // headers = headers.set('Content-Type', 'application/json;');
    headers=headers.set("Authorization" , "Bearer "+localStorage.getItem("token"));
   }

  login(data) {
    return this.http.post(`${environment.ip}login`,data)
  }

  register(data) {
    return this.http.post(`${environment.ip}register`,data)
  }

  getAdress() {
    return this.http.get(`${environment.ip}address`,{headers:headers})
   }

  addAdress(data) {
    return this.http.post(`${environment.ip}address`,data,{headers:headers})
   }

   getAdressbyId(id) {
    return this.http.get(`${environment.ip}address/${id}`,{headers:headers})
   }

   deleteAdress(id) {
    return this.http.delete(`${environment.ip}address/${id}`,{headers:headers})
   }

   updateAdress(id,data) {
    return this.http.post(`${environment.ip}address/${id}`,data,{headers:headers})
   }



 
}
