import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
name
phone
email
password
load=false

  constructor(private auth:AuthService,private router:Router) { }

  ngOnInit() {
  }

register() {
  this.load=true
  let data = {
    "name":this.name,
    "phone":this.phone,
    "email":this.email,
    "password":this.password,
    "active":"1",
    "avatar":"",
    "user_type":"3"
  }

  this.auth.register(data).subscribe((res)=> {
    this.load=false;
    if(res['status']=="SUCCESS"){
      alert("Reisterd Successfully Please login!")
      this.router.navigate([""]);
    }else {
      alert("This email or phone has already registered")
    }


  },(err)=> {
    this.load=false;
    alert("Something went wrong")
  })



}

}
