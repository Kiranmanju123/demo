import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
addressArray:[]
load=false;
address;
flatno;
landmark;
deleteload=false;
id;
load1=false;
addressres=true;

  constructor(private auth:AuthService,private modalService: NgbModal,private router:Router) { }

  ngOnInit() {
    this.auth.getAdress().subscribe((res)=> {
      this.addressres=false;
      console.log("rendered main componenet")
      this.addressArray = res["data"]["addressList"]
      console.log(this.addressArray)
    })
  }

  open(content) {
    this.modalService.open(content)
  }

  openupdate(content,id) {
    this.modalService.open(content)
    this.id = id
    this.auth.getAdressbyId(this.id).subscribe((res)=> {
      console.log(res);
      (<HTMLInputElement>(document.getElementById('add'))).value=res["data"]["address"];
      (<HTMLInputElement>(document.getElementById('flat_no'))).value=res["data"]["flatno"];
      (<HTMLInputElement>(document.getElementById('land'))).value=res["data"]["landmark"];
    },(err)=> {
      console.log(err)
    })

  }

  addAdress() {
    this.load=true
    let data = {
  "address":this.address,
	"flatno":this.flatno,
	"landmark":this.landmark,
	"address_type":"1",
	"latitude":"87964321313",
	"longitude":"8746133333"
  }
   this.auth.addAdress(data).subscribe((res)=> {
     console.log(res)
     if(res['status']=="FAILURE") {
       alert("All Fields are required!")
       this.load=false
       return
     }
    this.load=false
    alert("Address added successfully!")
    this.auth.getAdress().subscribe((res)=> {
      console.log("rendered main componenet")
      this.addressArray = res["data"]["addressList"]
      console.log(this.addressArray)
    })
    this.modalService.dismissAll()
   },(err)=> {
    this.load=false
     console.log(err)
     alert("Something went wrong")
   })
  }

  delete(id) {
    this.auth.deleteAdress(id).subscribe((res)=> {
      console.log(res)
      alert("Address Deleted")
      this.auth.getAdress().subscribe((res)=> {
        console.log("rendered main componenet")
        this.addressArray = res["data"]["addressList"]
        console.log(this.addressArray)
      })
    },(err)=> {
      alert("Something went wrong !")
    })
  }


  updateTheAddress() {
    let data1 = {
      "address":this.address,
      "flatno":this.flatno,
      "landmark":this.landmark,
      "address_type":"1",
      "latitude":"87964321313",
      "longitude":"8746133333"
      }
    this.load1=true
    this.auth.updateAdress(this.id,data1).subscribe((res)=> {
    this.load1=false
      console.log(res)
      this.auth.getAdress().subscribe((res)=> {
        console.log("rendered main componenet")
        this.addressArray = res["data"]["addressList"]
        console.log(this.addressArray)
      })
      alert("Updated Successfully !!")
      
      this.modalService.dismissAll()
    },(err)=> {
      this.load1=false
      console.log(err)
    })
  }

  logout() {
    localStorage.clear()
    this.router.navigate([""]);
  }

}



