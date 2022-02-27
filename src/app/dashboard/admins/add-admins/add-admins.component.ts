import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'app/service/auth-service/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminsService } from '../admins.service';

@Component({
  selector: 'ms-add-admins',
  templateUrl: './add-admins.component.html',
  styleUrls: ['./add-admins.component.scss']
})
export class AddAdminsComponent implements OnInit {

  id;
  updateFlag: boolean = false;
  result: any;
  admin: any;
  email: any;
  role: any;
  name: any;
  phone: any;
  password: any;
  newPassword = '';
  results;
  AdminRole = JSON.parse(localStorage.getItem("adminRole"));
  constructor(private adminService: AdminsService,
    private spinner: NgxSpinnerService,
    public authService: AuthService,
    private modalService: NgbModal,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params.id
      if(this.id != undefined){
        this.updateFlag = true
        this.spinner.show()
      }
      this.adminService.GetId(this.id).
      then( response => { this.admin = response;
        setTimeout(() => {
          this.spinner.hide();
        }, this.admin  );
        this.role = this.admin.role;
        this.name = this.admin.user.name;
        this.email = this.admin.user.email;
        this.phone = this.admin.user.phone;
        this.password = this.admin.user.password;
      });
    })
  }
  
  revoke(){
    this.spinner.show()
    this.authService.RevokePassword(this.newPassword,this.id).
    then( response => { this.results = response;
      });    
      this.modalService.dismissAll(); 
      setTimeout(() => {
       this.spinner.hide();
     }, this.results);
  }
  
  openSm(changePassword){
    this.modalService.open(changePassword, { size: 'sm' });
  }
  Add(value){
    this.spinner.show()
    if(this.updateFlag === false){
    this.adminService.Add(value).
       then( response => { this.result = response;
         });
    }else{
      let password
      if(this.newPassword === ''){
        password = this.password
      }else{
        password = this.newPassword
      }
      this.adminService.Update(value,this.id, password).
      then( response => { this.result = response;
        });
        }           
        setTimeout(() => {
          this.spinner.hide();
        }, this.result);
  } 
}
