import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SharedData } from '../../Shared/sharedClass';


@Injectable({
  providedIn: 'root'
})
export class ColorService {
  token = JSON.parse(localStorage.getItem("headerToken"));
  getColorResult;
  category;
  getfilterColorResult: any;
  active: any;
  colorResult: any;
  constructor(private toastr : ToastrService,
    private router: Router,) { }
  
  async GetColor() {
    const request = new Request(`${SharedData.BASE_URL}components/colors`,
    { method: 'GET',
    });
          request.headers.delete('Content-Type');
          request.headers.append('Content-Type', 'application/json');
         request.headers.append('x-auth-token', this.token);
            request.headers.append('lang', 'ar');
          const response = await fetch( request);
    const responsedata = await response.json();
    this.getColorResult = responsedata;
    return this.getColorResult;
  }

  
  async Add(value) {
    const data = {name:{ en: value.enname , ar: value.arname},
     image:value.imageSrc, code: value.code};  
    const bodyobj = JSON.stringify(data);
    const request = new Request(`${SharedData.BASE_URL}components/colors`, {
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
    this.router.navigate(['./dashboard/color']);
  }
  this.category = getAddCategory;
  return this.category
}


async Update(value,id) {
  const data = {name:{ en: value.enname , ar: value.arname},
   image:value.imageSrc, code: value.code,
   _id: id};  
  const bodyobj = JSON.stringify(data);
  const request = new Request(`${SharedData.BASE_URL}components/colors`, {
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
  this.router.navigate(['./dashboard/color']);
}
this.category = getAddCategory;
return this.category
}


async colorActivation(element) {
  const data = {_id:element._id};
const bodyobj = JSON.stringify(data);
const request = new Request(`${SharedData.BASE_URL}components/colors/changeState`,
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


async GetColorId(id) {
    
  const request = new Request(`${SharedData.BASE_URL}components/colors/`+id,
  { method: 'GET',
  });
        request.headers.delete('Content-Type');
        request.headers.append('Content-Type', 'application/json');
       request.headers.append('x-auth-token', this.token);
            request.headers.append('lang', 'ar');
        const response = await fetch( request);
  const responsedata = await response.json();
  this.colorResult = responsedata;
  return this.colorResult;
}


async GetFilterColor(value) {
  console.log('*')
  if(value.status === ""){
    value.status = undefined
  }
  const request = new Request(`${SharedData.BASE_URL}components/colors?state=` +value.status,
  { method: 'GET',}
  )
        request.headers.delete('Content-Type');
        request.headers.append('Content-Type', 'application/json');
       request.headers.append('x-auth-token', this.token);
            request.headers.append('lang', 'ar');
        const response = await fetch( request);
  const responsecategoryfilter = await response.json();
  this.getfilterColorResult = responsecategoryfilter;
  return this.getfilterColorResult;
}
}