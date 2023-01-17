import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SharedData } from 'app/Shared/sharedClass';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  token = JSON.parse(localStorage.getItem("headerToken"));
  filter;
  district;
  get;
  active: any;
  getfilterDistrictResult: any;
  constructor(private toastr : ToastrService,
    private router: Router,) { }

    async Get() {
      const request = new Request(`${SharedData.BASE_URL}auth/clients`,
      { method: 'GET',
      });
            request.headers.delete('Content-Type');
            request.headers.append('Content-Type', 'application/json');
           request.headers.append('x-auth-token', this.token);
              request.headers.append('lang', 'ar');
            const response = await fetch( request);
      const responsedata = await response.json();
      this.get = responsedata;
      return this.get;
    }
  
async GetFilter(value) {
  if(value.from == ''){
    value.from = undefined
  }
  if(value.to == ''){
    value.to = undefined
  }
  if(value.clientName == ''){
    value.clientName = undefined
  }
  if(value.clientPhone == ''){
    value.clientPhone = undefined
  }
  if(value.from != undefined && value.to == undefined && value.clientName == undefined && value.clientPhone == undefined){
    var x = new Request(`${SharedData.BASE_URL}auth/clients?from=`+ value.from,
    { method: 'GET',})
  }else if(value.from == undefined && value.to != undefined && value.clientName == undefined && value.clientPhone == undefined){
    var x = new Request(`${SharedData.BASE_URL}auth/clients?to=`+ value.to,
    { method: 'GET',})
  }else if(value.from == undefined && value.to == undefined && value.clientName != undefined && value.clientPhone == undefined){
    var x = new Request(`${SharedData.BASE_URL}auth/clients?clientName=`+ value.clientName,
    { method: 'GET',})
  }else if(value.from == undefined && value.to == undefined && value.clientName == undefined && value.clientPhone != undefined){
    var x = new Request(`${SharedData.BASE_URL}auth/clients?clientPhone=`+ value.clientPhone,
    { method: 'GET',})
  }else if(value.from == undefined && value.to == undefined && value.clientName != undefined && value.clientPhone != undefined){
    var x = new Request(`${SharedData.BASE_URL}auth/clients?clientName=`+ value.clientName + '&clientPhone=' + value.clientPhone,
    { method: 'GET',})
  }else if(value.from == undefined && value.to != undefined && value.clientName != undefined && value.clientPhone == undefined){
    var x = new Request(`${SharedData.BASE_URL}auth/clients?clientName=`+ value.clientName + '&to=' + value.to,
    { method: 'GET',})
  }else if(value.from != undefined && value.to == undefined && value.clientName != undefined && value.clientPhone == undefined){
    var x = new Request(`${SharedData.BASE_URL}auth/clients?clientName=`+ value.clientName + '&from=' + value.from,
    { method: 'GET',})
  }else if(value.from == undefined && value.to != undefined && value.clientName == undefined && value.clientPhone != undefined){
    var x = new Request(`${SharedData.BASE_URL}auth/clients?clientPhone=`+ value.clientPhone + '&to=' + value.to,
    { method: 'GET',})
  }else if(value.from != undefined && value.to == undefined && value.clientName == undefined && value.clientPhone != undefined){
    var x = new Request(`${SharedData.BASE_URL}auth/clients?clientPhone=`+ value.clientPhone + '&from=' + value.from,
    { method: 'GET',})
  }else if(value.from != undefined && value.to != undefined && value.clientName == undefined && value.clientPhone == undefined){
    var x = new Request(`${SharedData.BASE_URL}auth/clients?from=`+ value.from + '&to=' + value.to,
    { method: 'GET',})
  }else if(value.from != undefined && value.to != undefined && value.clientName != undefined && value.clientPhone == undefined){
    var x = new Request(`${SharedData.BASE_URL}auth/clients?from=`+ value.from + '&to=' + value.to 
    +'&clientName=' + value.clientName,
    { method: 'GET',})
  }else if(value.from != undefined && value.to != undefined && value.clientName == undefined && value.clientPhone != undefined){
    var x = new Request(`${SharedData.BASE_URL}auth/clients?from=`+ value.from + '&to=' + value.to
     +'&clientPhone=' + value.clientPhone,
    { method: 'GET',})
  }else if(value.from != undefined && value.to == undefined && value.clientName != undefined && value.clientPhone != undefined){
    var x = new Request(`${SharedData.BASE_URL}auth/clients?from=`+ value.from + '&clientName=' 
    + value.clientName +'&clientPhone=' + value.clientPhone,
    { method: 'GET',})
  }else if(value.from != undefined && value.to != undefined && value.clientName != undefined && value.clientPhone != undefined){
    var x = new Request(`${SharedData.BASE_URL}auth/clients?to=`+ value.to + '&clientName=' + value.clientName +'&clientPhone=' + value.clientPhone,
    { method: 'GET',})
  }
  const request = x
        request.headers.delete('Content-Type');
        request.headers.append('Content-Type', 'application/json');
       request.headers.append('x-auth-token', this.token);
            request.headers.append('lang', 'ar');
        const response = await fetch( request);
  const responsedistrictfilter = await response.json();
  this.filter = responsedistrictfilter;
  return this.filter;
}
async changeWallet(wallet,id) {
  const data = {_id:id,wallet:wallet};
const bodyobj = JSON.stringify(data);
const request = new Request(`${SharedData.BASE_URL}auth/clients/updateWallet`,
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
    this.toastr.info('Change wallet');
    // this.router.navigate([`dashboard/category`])
  this.active = result;
  return this.active;
}
}
