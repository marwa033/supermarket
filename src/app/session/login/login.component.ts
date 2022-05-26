import { Component, OnInit ,ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../service/auth-service/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from "ngx-spinner";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
   selector: 'ms-login-session',
   templateUrl:'./login-component.html',
   styleUrls: ['./login-component.scss'],
   encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit{
   email: string='';
   password: string='';
   tries: any;
   profile: any;
   type: boolean= true;

  constructor( public authService: AuthService,
               private spinner: NgxSpinnerService,
               private router : Router,
               private toastr : ToastrService,
               public translate : TranslateService ) { }

   // when email and password is correct, user logged in.
   login(value) {
    this.spinner.show();
      this.authService.login(value).
      then( responsedata => { this.tries = responsedata;
         this.Profile() 
         console.log(this.type)
         setTimeout(() => {
            this.spinner.hide();
          },this.tries);
      });
   }
   Profile(){
      console.log('**')
    this.authService.Profile().
    then( responseAds => { this.profile = responseAds;
      console.log(this.type)
      if(this.profile.userType != 'admin'){
         this.type = false;
         this.toastr.error('Not Admin!');
      }else{
         this.type = true;
         this.toastr.success('Successfully Logged In!');
         this.router.navigate(['/']);
      }
      // this.type = this.profile.userType;

  });
   }
    ngOnInit(){
    }

    

}



