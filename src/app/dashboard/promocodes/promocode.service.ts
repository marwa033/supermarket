import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SharedData } from 'app/Shared/sharedClass';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class PromocodeService {
  token = JSON.parse(localStorage.getItem("headerToken"));
  filterResult: any;
  active: any;
  results
  lang="en";
  promo: any;
  constructor(private toastr : ToastrService,
    private router: Router,) { }
    
  async Get(lang) {
    this.lang = lang;
    const request = new Request(`${SharedData.BASE_URL}payments/promocodes`,
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
    const data = {ids:element};
  const bodyobj = JSON.stringify(data);
  const request = new Request(`${SharedData.BASE_URL}payments/promocodes/changeState`,
  {
  method: 'PUT',
  body: bodyobj
  });
  request.headers.delete('Content-Type');
  request.headers.append('Content-Type', 'application/json');
  request.headers.append('x-auth-token', this.token);
          const response = await fetch( request);
    // const result = await response.json();
      this.toastr.info('Change State');
    // this.active = result;
    // return this.active;
  }

async GetFilter(value) {
  console.log('*')
  if(value.status === ""){
    value.status = undefined
  }
  const request =  new Request(`${SharedData.BASE_URL}payments/promocodes?state=` +value.status,
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
    
  const request = new Request(`${SharedData.BASE_URL}payments/promocodes/`+id,
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
  const data = {code: value.code,startDate:value.startDate,daysPeriod:value.days,
    totalUsage:value.total,maxNumberOfUses:value.max,amount:value.amount,type:value.type,
  for:value.for,minOrder:value.minOrder,maxOrder:value.maxOrder};  
  const bodyobj = JSON.stringify(data);
  const request = new Request(`${SharedData.BASE_URL}payments/promocodes`, {
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
  this.router.navigate(['./dashboard/promocode']);
}
this.promo = addNew;
return this.promo
}



async Update(value,id) {
  const data = {code: value.code,startDate:value.startDate,daysPeriod:value.days,
    totalUsage:value.total,maxNumberOfUses:value.max,amount:value.amount,type:value.type,
  for:value.for,minOrder:value.minOrder,maxOrder:value.maxOrder,_id:id}; 
const bodyobj = JSON.stringify(data);
const request = new Request(`${SharedData.BASE_URL}payments/promocodes`, {
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
this.router.navigate(['./dashboard/promocode']);
}
this.promo = addNew;
return this.promo
}
}