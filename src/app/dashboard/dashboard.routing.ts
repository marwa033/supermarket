import { Routes } from '@angular/router';
import { SaasComponent } from './saas/saas.component';
import { CrmComponent } from './crm/crm.component';
import { AdddistrictComponent } from './district/adddistrict/adddistrict.component';
import { DistrictComponent } from './district/district.component';
import { AddcategoryComponent } from './category/addcategory/addcategory.component';
import { CategoryComponent } from './category/category.component';
import { AddAdsComponent } from './ads/add-ads/add-ads.component';
import { AdsComponent } from './ads/ads.component';
import { AddPromoComponent } from './promocodes/add-promo/add-promo.component';
import { PromocodesComponent } from './promocodes/promocodes.component';
import { AddAdminsComponent } from './admins/add-admins/add-admins.component';
import { AdminsComponent } from './admins/admins.component';
import { ClientsComponent } from './clients/clients.component';
import { ProfileComponent } from './profile/profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AddcolorComponent } from './color/addcolor/addcolor.component';
import { ColorComponent } from './color/color.component';
import { AddsizeComponent } from './size/addsize/addsize.component';
import { SizeComponent } from './size/size.component';



export const DashboardRoutes: Routes = [
   {
      path: '',
      redirectTo: 'category',
      pathMatch: 'full'
   },
   {
      path: '',
      children: [
         {
         path: 'district',
         component: DistrictComponent
         },
         {
         path: 'adddistrict',
         component: AdddistrictComponent
         },
         {
         path: 'adddistrict/:id',
         component: AdddistrictComponent
         },
         {
         path: 'category',
         component: CategoryComponent
         },
         {
         path: 'addcategory',
         component: AddcategoryComponent
         },
         {
         path: 'addcategory/:id',
         component: AddcategoryComponent
         },
         {
         path: 'ads',
         component: AdsComponent
         },
         {
         path: 'addads',
         component: AddAdsComponent
         },
         {
         path: 'addads/:id',
         component: AddAdsComponent
         },
         {
         path: 'promo',
         component: PromocodesComponent
         },
         {
         path: 'addpromo',
         component: AddPromoComponent
         },
         {
         path: 'addpromo/:id',
         component: AddPromoComponent
         },
         {
         path: 'admins',
         component: AdminsComponent
         },
         {
         path: 'addadmin',
         component: AddAdminsComponent
         },
         {
         path: 'addadmin/:id',
         component: AddAdminsComponent
         },
         {
         path: 'clients',
         component: ClientsComponent
         },
         {
         path: 'profile',
         component: ProfileComponent
         },
         {
         path: 'changepassword',
         component: ChangePasswordComponent
         },
         {
         path: 'color',
         component: ColorComponent
         },
         {
         path: 'addcolor',
         component: AddcolorComponent
         },
         {
         path: 'addcolor/:id',
         component: AddcolorComponent
         },
         {
         path: 'size',
         component: SizeComponent
         },
         {
         path: 'addsize',
         component: AddsizeComponent
         },
         {
         path: 'addsize/:id',
         component: AddsizeComponent
         }
         
         ]
   }
];

