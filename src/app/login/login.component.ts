import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
phoneno;
password;
load=false;

  constructor(private auth:AuthService,private router:Router) { }

  ngOnInit() {
  }

  loginbtn() {
    this.load = true
    let data = {
      "phone":this.phoneno,
      "password":this.password
    }

    this.auth.login(data).subscribe((res)=> {
      this.load=false;
      console.log(res)
      if(res['status']=="SUCCESS"){
       localStorage.setItem("token",res['data']['authToken']) 
        this.router.navigate(["/me"]);
      }
      if(res['status']=="FAILURE"){
        alert("Error! Please Check your crenditials")
      }
    },(err)=> {
      alert("Something Went wrong")
      this.load=false;
      console.log("error")
     
    })
   }
  
}



// {
// 	"phone":"9876543210",
// 	"password":"123456789"
// }