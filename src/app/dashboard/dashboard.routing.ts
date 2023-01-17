import { Routes } from '@angular/router';
import { AddcategoryComponent } from './category/addcategory/addcategory.component';
import { CategoryComponent } from './category/category.component';
import { AdsComponent } from './ads/ads.component';
import { AddAdsComponent } from './ads/add-ads/add-ads.component';
import { AdminsComponent } from './admins/admins.component';
import { AddAdminComponent } from './admins/add-admin/add-admin.component';
import { SubCategoriesComponent } from './sub-categories/sub-categories.component';
import { AddSubComponent } from './sub-categories/add-sub/add-sub.component';
import { ProductsComponent } from './products/products.component';
import { AddProductComponent } from './products/add-product/add-product.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { OrdersComponent } from './orders/orders.component';
import { AddPromoComponent } from './promocodes/add-promo/add-promo.component';
import { PromocodesComponent } from './promocodes/promocodes.component';
import { AddOrderComponent } from './orders/add-order/add-order.component';
import { ConfigComponent } from './config/config.component';
import { ClientsComponent } from './clients/clients.component';
import { AddCityComponent } from './city/add-city/add-city.component';
import { CityComponent } from './city/city.component';
import { NewOrderComponent } from './orders/new-order/new-order.component';



export const DashboardRoutes: Routes = [
   {
      path: '',
      redirectTo: 'home',
      pathMatch: 'full'
   },
   {
      path: '',
      children: [
         {
         path: 'home',
         component: HomeComponent
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
         path: 'sub',
         component: SubCategoriesComponent
         },
         {
         path: 'addsub',
         component: AddSubComponent
         },
         {
         path: 'addsub/:id',
         component: AddSubComponent
         },
         {
         path: 'admins',
         component: AdminsComponent
         },
         {
         path: 'addadmin',
         component: AddAdminComponent
         },
         {
         path: 'addadmin/:id',
         component: AddAdminComponent
         },
         {
         path: 'products',
         component: ProductsComponent
         },
         {
         path: 'addproduct',
         component: AddProductComponent
         },
         {
         path: 'addproduct/:id',
         component: AddProductComponent
         } ,
         {
         path: 'profile',
         component: ProfileComponent
         },        
         {
         path: 'addpromo',
         component: AddPromoComponent
         },
         {
         path: 'addpromo/:id',
         component: AddPromoComponent
         } ,
         {
         path: 'promocode',
         component: PromocodesComponent
         },        
         {
         path: 'orders',
         component: OrdersComponent
         },   
         {
         path: 'addorder',
         component: NewOrderComponent
         },   
         {
         path: 'addorder/:id',
         component: AddOrderComponent
         },
         {
         path: 'config',
         component: ConfigComponent
         },
         {
         path: 'client',
         component: ClientsComponent
         },
         {
         path: 'addcity',
         component: AddCityComponent
         },
         {
         path: 'addcity/:id',
         component: AddCityComponent
         } ,
         {
         path: 'city',
         component: CityComponent
         }
         ]
   }
];

