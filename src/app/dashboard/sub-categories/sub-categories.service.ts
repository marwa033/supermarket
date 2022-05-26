import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SharedData } from 'app/Shared/sharedClass';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class SubCategoriesService {
  token = JSON.parse(localStorage.getItem("headerToken"));
  result;
  getfilterResult: any;
  active: any;
  lang="en";
  constructor(private toastr : ToastrService,
    private router: Router,) { }


    async Get(lang) {
      this.lang = lang;
      const request = new Request(`${SharedData.BASE_URL}components/subCategories`,
      { method: 'GET',
      });
            request.headers.delete('Content-Type');
            request.headers.append('Content-Type', 'application/json');
           request.headers.append('x-auth-token', this.token);
              request.headers.append('lang', lang);
            const response = await fetch( request);
      const responsedata = await response.json();
      this.result = responsedata;
      return this.result;
    }
  
  async Add(value) {
    const data = {name:{ en: value.enname , ar: value.arname}, categoryId: value.categoryId};  
    const bodyobj = JSON.stringify(data);
    const request = new Request(`${SharedData.BASE_URL}components/subCategories`, {
      method: 'POST',
      body: bodyobj
  });
  request.headers.delete('Content-Type');
  request.headers.append('Content-Type', 'application/json');
 request.headers.append('x-auth-token', this.token);
            request.headers.append('lang', 'ar');
  
  const response = await fetch( request);
  const getAdd = await response.json();
  let message = getAdd.message;
  if (message) {
    this.toastr.error(message);
  
  }
   else{
    this.toastr.success('Successfully Added');
    this.router.navigate(['./dashboard/sub']);
  }
  this.result = getAdd;
  return this.result
}


  
async Update(value,id) {
  const data = {name:{ en: value.enname , ar: value.arname},
  categoryId:value.categoryId,
   _id: id};  
  const bodyobj = JSON.stringify(data);
  const request = new Request(`${SharedData.BASE_URL}components/subCategories`, {
    method: 'PUT',
    body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');
request.headers.append('x-auth-token', this.token);

const response = await fetch( request);
const getAdd = await response.json();
let message = getAdd.message;
if (message) {
  this.toastr.error(message);

}
 else{
  this.toastr.success('Successfully Updated');
  this.router.navigate(['./dashboard/sub']);
}
this.result = getAdd;
return this.result
}


async Activation(element) {
  const data = {_id:element._id};
const bodyobj = JSON.stringify(data);
const request = new Request(`${SharedData.BASE_URL}components/subCategories/changeState`,
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


async GetId(id) {
    
  const request = new Request(`${SharedData.BASE_URL}components/subCategories/`+id,
  { method: 'GET',
  });
        request.headers.delete('Content-Type');
        request.headers.append('Content-Type', 'application/json');
       request.headers.append('x-auth-token', this.token);
            request.headers.append('lang', this.lang);
        const response = await fetch( request);
  const responsedata = await response.json();
  this.result = responsedata;
  return this.result;
}


async GetFilter(value) {
  console.log('*')
  if(value.status === ""){
    value.status = undefined
  }
  if(value.featured === ""){
    value.featured = undefined
  }
  if(value.featured != undefined && value.status === undefined){

    var newRequest = new Request(`${SharedData.BASE_URL}components/subCategories?featured=`+value.featured,
    { method: 'GET',}
    )
  }else if(value.status != undefined && value.featured === undefined){

    var newRequest = new Request(`${SharedData.BASE_URL}components/subCategories?state=` +value.status,
    { method: 'GET',}
    )
  }else if(value.status != undefined && value.featured != undefined){
    var newRequest = new Request(`${SharedData.BASE_URL}components/subCategories?state=` +value.status+'&featured='+value.featured,
    { method: 'GET',}
    )
  }else{
    var newRequest = new Request(`${SharedData.BASE_URL}components/subCategories`,
    { method: 'GET',}
    )
  }
  const request = newRequest;
        request.headers.delete('Content-Type');
        request.headers.append('Content-Type', 'application/json');
       request.headers.append('x-auth-token', this.token);
            request.headers.append('lang', this.lang);
        const response = await fetch( request);
  const responsefilter = await response.json();
  this.result = responsefilter;
  return this.result;
}
}
