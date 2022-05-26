import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SharedData } from 'app/Shared/sharedClass';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  token = JSON.parse(localStorage.getItem("headerToken"));
  filterResult: any;
  active: any;
  results
  lang="en";
  ads: any;
  constructor(private toastr : ToastrService,
    private router: Router,) { }
    
  async Get(lang) {
    this.lang = lang;
    const request = new Request(`${SharedData.BASE_URL}components/products`,
    { method: 'GET',
    });
          request.headers.delete('Content-Type');
          request.headers.append('Content-Type', 'application/json');
         request.headers.append('x-auth-token', this.token);
            request.headers.append('lang', lang);
          const response = await fetch( request);
    const responsedata = await response.json();
    this.results = responsedata;
    return this.results;
  }

  
async Activation(element) {
  const data = {_id:element._id};
const bodyobj = JSON.stringify(data);
const request = new Request(`${SharedData.BASE_URL}components/products/changeState`,
{
method: 'PUT',
body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');
request.headers.append('x-auth-token', this.token);
        const response = await fetch( request);
  const result = await response.json();
    this.toastr.info('Change State');
  this.active = result;
  return this.active;
}

async GetFilter(value) {
  console.log('*')
  if(value.status === ""){
    value.status = undefined
  }
  const request =  new Request(`${SharedData.BASE_URL}components/products?state=` +value.status,
  { method: 'GET',}
  );
        request.headers.delete('Content-Type');
        request.headers.append('Content-Type', 'application/json');
       request.headers.append('x-auth-token', this.token);
            request.headers.append('lang', this.lang);
        const response = await fetch( request);
  const responsecategoryfilter = await response.json();
  this.filterResult = responsecategoryfilter;
  return this.filterResult;
}
async GetId(id) {
    
  const request = new Request(`${SharedData.BASE_URL}components/products/`+id,
  { method: 'GET',
  });
        request.headers.delete('Content-Type');
        request.headers.append('Content-Type', 'application/json');
       request.headers.append('x-auth-token', this.token);
            request.headers.append('lang', this.lang);
        const response = await fetch( request);
  const responsedata = await response.json();
  this.results = responsedata;
  return this.results;
}
async Add(value) {
  
  if(value.featured === undefined){
    value.featured = false
  }
  const data = {priceAfterDiscount: value.discount, price:value.price,
    image:value.imageSrc,name:{ en: value.enname , ar: value.arname}, 
    featured: value.featured,subCategoryId:value.subCategoryId};  
  const bodyobj = JSON.stringify(data);
  const request = new Request(`${SharedData.BASE_URL}components/products`, {
    method: 'POST',
    body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');
request.headers.append('x-auth-token', this.token);
          request.headers.append('lang', this.lang);

const response = await fetch( request);
const addNew = await response.json();
let message = addNew.message;
if (message) {
  this.toastr.error(message);

}
 else{
  this.toastr.success('Successfully Added');
  this.router.navigate(['./dashboard/products']);
}
this.ads = addNew;
return this.ads
}



async Update(value,id) {
  
  if(value.featured === undefined){
    value.featured = false
  }
const data = {priceAfterDiscount: value.discount, price:value.price,
 image:value.imageSrc,name:{ en: value.enname , ar: value.arname}, featured: value.featured,subCategoryId:value.subCategoryId,
 _id: id};  
const bodyobj = JSON.stringify(data);
const request = new Request(`${SharedData.BASE_URL}components/products`, {
  method: 'PUT',
  body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');
request.headers.append('x-auth-token', this.token);

const response = await fetch( request);
const addNew = await response.json();
let message = addNew.message;
if (message) {
this.toastr.error(message);

}
else{
this.toastr.success('Successfully Updated');
this.router.navigate(['./dashboard/products']);
}
this.ads = addNew;
return this.ads
}
}
