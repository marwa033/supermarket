import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SharedData } from '../../Shared/sharedClass';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  token = JSON.parse(localStorage.getItem("headerToken"));
  getCategoryResult;
  category;
  getfilterCategorytResult: any;
  active: any;
  categoryresult: any;
  lang="en";
  constructor(private toastr : ToastrService,
    private router: Router,) { }
  
  async GetCategories(lang) {
    this.lang = lang;
    const request = new Request(`${SharedData.BASE_URL}components/categories`,
    { method: 'GET',
    });
          request.headers.delete('Content-Type');
          request.headers.append('Content-Type', 'application/json');
         request.headers.append('x-auth-token', this.token);
            request.headers.append('lang', lang);
          const response = await fetch( request);
    const responsedata = await response.json();
    this.getCategoryResult = responsedata;
    return this.getCategoryResult;
  }
  async GetActive() {
    const request = new Request(`${SharedData.BASE_URL}components/categories?state=active`,
    { method: 'GET',
    });
          request.headers.delete('Content-Type');
          request.headers.append('Content-Type', 'application/json');
         request.headers.append('x-auth-token', this.token);
            request.headers.append('lang', this.lang);
          const response = await fetch( request);
    const responsedata = await response.json();
    this.getCategoryResult = responsedata;
    return this.getCategoryResult;
  }

  
  async Add(value) {
    if(value.featured === undefined){
      value.featured = false
    }
    const data = {name:{ en: value.enname , ar: value.arname}, featured: value.featured,
     image:value.imageSrc};  
    const bodyobj = JSON.stringify(data);
    const request = new Request(`${SharedData.BASE_URL}components/categories`, {
      method: 'POST',
      body: bodyobj
  });
  request.headers.delete('Content-Type');
  request.headers.append('Content-Type', 'application/json');
 request.headers.append('x-auth-token', this.token);
            request.headers.append('lang', 'ar');
  
  const response = await fetch( request);
  const getAddCategory = await response.json();
  let message = getAddCategory.message;
  if (message) {
    this.toastr.error(message);
  
  }
   else{
    this.toastr.success('Successfully Added');
    this.router.navigate(['./dashboard/category']);
  }
  this.category = getAddCategory;
  return this.category
}


  
async Update(value,id) {
  
  if(value.featured === undefined){
    value.featured = false
  }
  const data = {name:{ en: value.enname , ar: value.arname}, featured: value.featured,
   image:value.imageSrc,
   _id: id};  
  const bodyobj = JSON.stringify(data);
  const request = new Request(`${SharedData.BASE_URL}components/categories`, {
    method: 'PUT',
    body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');
request.headers.append('x-auth-token', this.token);

const response = await fetch( request);
const getAddCategory = await response.json();
let message = getAddCategory.message;
if (message) {
  this.toastr.error(message);

}
 else{
  this.toastr.success('Successfully Updated');
  this.router.navigate(['./dashboard/category']);
}
this.category = getAddCategory;
return this.category
}


async categoryActivation(element) {
  const data = {ids:element};
const bodyobj = JSON.stringify(data);
const request = new Request(`${SharedData.BASE_URL}components/categories/changeState`,
{
method: 'PUT',
body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');
request.headers.append('x-auth-token', this.token);
// console.log(log);
        const response = await fetch( request);
  const result = await response.json();
    this.toastr.info('Change State');
    // this.router.navigate([`dashboard/category`])
  this.active = result;
  return this.active;
}


async GetCategoryId(id) {
    
  const request = new Request(`${SharedData.BASE_URL}components/categories/`+id,
  { method: 'GET',
  });
        request.headers.delete('Content-Type');
        request.headers.append('Content-Type', 'application/json');
       request.headers.append('x-auth-token', this.token);
            request.headers.append('lang', this.lang);
        const response = await fetch( request);
  const responsedata = await response.json();
  this.categoryresult = responsedata;
  return this.categoryresult;
}





async GetFilterCategory(value) {
  console.log('*')
  if(value.status === ""){
    value.status = undefined
  }
  if(value.featured === ""){
    value.featured = undefined
  }
  if(value.featured != undefined && value.status === undefined){

    var newRequest = new Request(`${SharedData.BASE_URL}components/categories?featured=`+value.featured,
    { method: 'GET',}
    )
  }else if(value.status != undefined && value.featured === undefined){

    var newRequest = new Request(`${SharedData.BASE_URL}components/categories?state=` +value.status,
    { method: 'GET',}
    )
  }else{
    var newRequest = new Request(`${SharedData.BASE_URL}components/categories?state=` +value.status+'&featured='+value.featured,
    { method: 'GET',}
    )
  }
  const request = newRequest;
        request.headers.delete('Content-Type');
        request.headers.append('Content-Type', 'application/json');
       request.headers.append('x-auth-token', this.token);
            request.headers.append('lang', this.lang);
        const response = await fetch( request);
  const responsecategoryfilter = await response.json();
  this.getfilterCategorytResult = responsecategoryfilter;
  return this.getfilterCategorytResult;
}
}