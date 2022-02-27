import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SharedData } from '../../Shared/sharedClass';

@Injectable({
  providedIn: 'root'
})
export class SizeService {
  token = JSON.parse(localStorage.getItem("headerToken"));
  getSizeResult;
  size;
  getfilterSizeResult: any;
  active: any;
  sizeResult: any;

  constructor(private toastr : ToastrService,
    private router: Router,) { }

    async GetSize() {
      const request = new Request(`${SharedData.BASE_URL}components/sizes`,
      { method: 'GET',
      });
            request.headers.delete('Content-Type');
            request.headers.append('Content-Type', 'application/json');
           request.headers.append('x-auth-token', this.token);
              request.headers.append('lang', 'ar');
            const response = await fetch( request);
      const responsedata = await response.json();
      this.getSizeResult = responsedata;
      return this.getSizeResult;
    }

      
  async Add(value) {
    const data = {name: value.sizename,};  
    const bodyobj = JSON.stringify(data);
    const request = new Request(`${SharedData.BASE_URL}components/sizes`, {
      method: 'POST',
      body: bodyobj
  });
  request.headers.delete('Content-Type');
  request.headers.append('Content-Type', 'application/json');
 request.headers.append('x-auth-token', this.token);
            request.headers.append('lang', 'ar');
  
  const response = await fetch( request);
  const getAddSize = await response.json();
  let message = getAddSize.message;
  if (message) {
    this.toastr.error(message);
  
  }
   else{
    this.toastr.success('Successfully Added');
    this.router.navigate(['./dashboard/size']);
  }
  this.size = getAddSize;
  return this.size
}


async Update(value,id) {
  const data = {name: value.sizename,
   _id: id};  
  const bodyobj = JSON.stringify(data);
  const request = new Request(`${SharedData.BASE_URL}components/sizes`, {
    method: 'PUT',
    body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');
request.headers.append('x-auth-token', this.token);

const response = await fetch( request);
const getAddSize = await response.json();
let message = getAddSize.message;
if (message) {
  this.toastr.error(message);

}
 else{
  this.toastr.success('Successfully Updated');
  this.router.navigate(['./dashboard/size']);
}
this.size = getAddSize;
return this.size
}


async sizeActivation(element) {
  const data = {_id:element._id};
const bodyobj = JSON.stringify(data);
const request = new Request(`${SharedData.BASE_URL}components/sizes/changeState`,
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
  this.active = result;
  return this.active;
}


async GetSizeId(id) {
    
  const request = new Request(`${SharedData.BASE_URL}components/sizes/`+id,
  { method: 'GET',
  });
        request.headers.delete('Content-Type');
        request.headers.append('Content-Type', 'application/json');
       request.headers.append('x-auth-token', this.token);
            request.headers.append('lang', 'ar');
        const response = await fetch( request);
  const responsedata = await response.json();
  this.size = responsedata;
  return this.size;
}

async GetFilterSize(value) {
  console.log('*')
  if(value.status === ""){
    value.status = undefined
  }
  const request = new Request(`${SharedData.BASE_URL}components/sizes?state=` +value.status,
  { method: 'GET',}
  )
        request.headers.delete('Content-Type');
        request.headers.append('Content-Type', 'application/json');
       request.headers.append('x-auth-token', this.token);
            request.headers.append('lang', 'ar');
        const response = await fetch( request);
  const responseSizefilter = await response.json();
  this.getfilterSizeResult = responseSizefilter;
  return this.getfilterSizeResult;
}
}
