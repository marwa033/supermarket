import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/service/auth-service/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'ms-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
home;
analytics;
  constructor(public authService: AuthService,
    private spinner: NgxSpinnerService,) { }

ngOnInit() {
  this.spinner.show()
this.authService.Home().
then( responseAds => { this.home = responseAds;
  console.log(this.home.admins.supers.active)
  setTimeout(() => {
    this.spinner.hide();
 }, this.home);
//  this.analytics =[
//    {value: this.home.admins.supers.active , name:'Active Super Admins' },
//    {value: this.home.admins.supers.inActive , name:'InActive Super Admins' },
//    {value: this.home.admins.supers.all , name:'All Super Admins' },
//    {value: this.home.admins.contributers.active , name:'Active Contributers Admins' },
//    {value: this.home.admins.contributers.inActive , name:'InActive Contributers Admins' },
//    {value: this.home.admins.contributers.all , name:'All Contributers Admins' },
//    {value: this.home.admins.editors.active , name:'Active Editors Admins' },
//    {value: this.home.admins.editors.inActive , name:'InActive Editors Admins' },
//    {value: this.home.admins.editors.all , name:'All Editors Admins' },
//    {value: this.home.clients.active , name:'Active Clients' },
//    {value: this.home.clients.inActive , name:'InActive Clients' },
//    {value: this.home.clients.all , name:'All Clients' },
//    {value: this.home.ads.active , name:'Active Ads' },
//    {value: this.home.ads.inActive , name:'InActive Ads' },
//    {value: this.home.ads.all , name:'All Ads' },
//    {value: this.home.categories.active , name:'Active Categories' },
//    {value: this.home.categories.inActive , name:'InActive Categories' },
//    {value: this.home.categories.all , name:'All Categories' },
//    {value: this.home.subCategories.active , name:'Active SubCategories' },
//    {value: this.home.subCategories.inActive , name:'InActive SubCategories' },
//    {value: this.home.subCategories.all , name:'All SubCategories' },
//    {value: this.home.products.active , name:'Active Products' },
//    {value: this.home.products.inActive , name:'InActive Products' },
//    {value: this.home.products.all , name:'All Products' },
//    {value: this.home.promocodes.active , name:'Active Promocodes' },
//    {value: this.home.promocodes.inActive , name:'InActive Promocodes' },
//    {value: this.home.promocodes.all , name:'All Promocodes' },
//    {value: this.home.cart.inCart , name:'InCart' },
//    {value: this.home.cart.ordered , name:'InActive ordered' },
//    {value: this.home.orders.canceled , name:'Canceled Orders' },
//    {value: this.home.orders.pending , name:'Pending Orders' },
//    {value: this.home.orders.processing , name:'Processing Orders' },
//    {value: this.home.orders.carried , name:'Carried Orders' },
//    {value: this.home.orders.completed , name:'Completed Orders' },
//    {value: this.home.orders.all , name:'All Orders' },

//   ]
 
});

}
}