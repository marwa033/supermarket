import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SharedData } from 'app/Shared/sharedClass';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class CityService {
  token = JSON.parse(localStorage.getItem("headerToken"));
  filterResult: any;
  active: any;
  results
  lang="en";
  city: any;
  constructor(private toastr : ToastrService,
    private router: Router,) { }
    
  async Get(lang) {
    this.lang = lang;
    const request = new Request(`${SharedData.BASE_URL}components/cities`,
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
  const data = {_id:element};
const bodyobj = JSON.stringify(data);
const request = new Request(`${SharedData.BASE_URL}components/cities/changeState`,
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
  if(value.name === ""){
    value.name = undefined
  }
  if(value.featured != undefined && value.status === undefined){

    var newRequest = new Request(`${SharedData.BASE_URL}components/cities?name=`+value.name,
    { method: 'GET',}
    )
  }else if(value.status != undefined && value.featured === undefined){

    var newRequest = new Request(`${SharedData.BASE_URL}components/cities?state=` +value.status,
    { method: 'GET',}
    )
  }else{
    var newRequest = new Request(`${SharedData.BASE_URL}components/cities?state=` +value.status+'&name='+value.name,
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
  this.filterResult = responsecategoryfilter;
  return this.filterResult;
}
async Delete(element) {
  const data = {
    ids:element
  };  
const bodyobj = JSON.stringify(data);
const request = new Request(`${SharedData.BASE_URL}components/cities/delete`,
{
method: 'Put',
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
  this.toastr.success('Successfully Deleted');
  // this.router.navigate(['./dashboard/admins']);
}
}
async GetId(id) {
    
  const request = new Request(`${SharedData.BASE_URL}components/cities/`+id,
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
  const data = {name:{ en: value.enname , ar: value.arname}, shippingFees: value.shippingFees };  
  const bodyobj = JSON.stringify(data);
  const request = new Request(`${SharedData.BASE_URL}components/cities`, {
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
  this.router.navigate(['./dashboard/city']);
}
this.city = addNew;
return this.city
}



async Update(value,id) {
const data = {name:{ en: value.enname , ar: value.arname}, shippingFees: value.shippingFees, _id: id};  
const bodyobj = JSON.stringify(data);
const request = new Request(`${SharedData.BASE_URL}components/cities`, {
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
this.router.navigate(['./dashboard/city']);
}
this.city = addNew;
return this.city
}
}
