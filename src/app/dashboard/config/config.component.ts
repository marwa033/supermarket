import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'app/service/auth-service/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'ms-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnInit {
  deliveryFee;
  config;
  invitationPoints;
  createdAt;
  updatedAt;
  maxOrderFreeShipping;
  Update;
  id;
  
  constructor(private route: ActivatedRoute,
              private spinner: NgxSpinnerService,
              public authService: AuthService,) { }

  ngOnInit() {    
    this.get()
  }
  get(){
    this.spinner.show()
    this.authService.Config().
    then( response => { this.config = response;
      this.deliveryFee = this.config.deliveryFee;
      this.invitationPoints = this.config.invitationPoints;
      this.createdAt = this.config.createdAt;
      this.updatedAt = this.config.updatedAt;
      this.maxOrderFreeShipping = this.config.maxOrderFreeShipping;
      this.id = this.config._id;
      
      setTimeout(() => {
        this.spinner.hide();
     }, this.config);
  });
  }
  editRow(){
        // $(".get").hide();
        // $(".update").show();
  document.getElementsByTagName("input")[0].removeAttribute("readonly");
  document.getElementsByTagName("input")[1].removeAttribute("readonly");
  document.getElementsByTagName("input")[2].removeAttribute("readonly");
  document.getElementById("btn").style.display = "flex";
  }
  Add(value){
    this.spinner.show()
    this.authService.updateConfig(value).
    then( response => { this.Update = response;
      setTimeout(() => {
        this.spinner.hide();
        this.get()
     }, this.Update);
     document.getElementsByTagName("input")[0].setAttribute("readonly","readonly");
     document.getElementsByTagName("input")[1].setAttribute("readonly","readonly");
     document.getElementsByTagName("input")[2].setAttribute("readonly","readonly");
     document.getElementById("btn").style.display = "none";
      });
  }

}
