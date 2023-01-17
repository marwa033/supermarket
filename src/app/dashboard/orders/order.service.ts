import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SharedData } from 'app/Shared/sharedClass';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
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
    const request = new Request(`${SharedData.BASE_URL}components/orders`,
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

  
async Activation(element,state) {
  const data = {ids:element,state:state};
const bodyobj = JSON.stringify(data);
const request = new Request(`${SharedData.BASE_URL}components/orders/admin/changeState`,
{
method: 'PUT',
body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');
request.headers.append('x-auth-token', this.token);
        const response = await fetch( request);
  const result = await response.json();
  if(result.message){
    this.toastr.error(result.message);
  }else{
    this.toastr.info('Change State');
  }
  this.active = result;
  return this.active;
}
async Cancel(element){
  const data = {ids:element};
const bodyobj = JSON.stringify(data);
const request = new Request(`${SharedData.BASE_URL}components/orders/admin/cancel`,
{
method: 'PUT',
body: bodyobj
});
request.headers.delete('Content-Type');
request.headers.append('Content-Type', 'application/json');
request.headers.append('x-auth-token', this.token);
        const response = await fetch( request);
  const result = await response.json();
  if(result.message){
    this.toastr.error(result.message);
  }else{
    this.toastr.warning('Canceled!');
  }
  this.active = result;
  return this.active;
}

async GetFilter(value) {
  console.log('*')
  if(value.status === ""){
    value.status = undefined
  }
  if(value.from === null){
    value.from = undefined
  }
  if(value.to === null){
    value.to = undefined
  }
  if(value.paymentMethod === null){
    value.paymentMethod = undefined
  }
  if(value.clientId === null){
    value.clientId = undefined
  }
  if(value.orderId === null){
    value.orderId = undefined
  }
  if(value.clientName === null){
    value.clientName = undefined
  }
  if(value.status != undefined && value.from === undefined && value.to === undefined && 
    value.paymentMethod === undefined && value.clientId === undefined && value.orderId === undefined && value.clientName == undefined && value.clientPhone == undefined){
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?state=` +value.status,
    { method: 'GET',}
    );
  }else if(value.status === undefined && value.from === undefined && value.to === undefined && 
    value.paymentMethod === undefined && value.clientId === undefined && value.orderId === undefined && value.clientName != undefined && value.clientPhone == undefined) {
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?clientName=` +value.clientName,
    { method: 'GET',}
    );
  }else if(value.status != undefined && value.from != undefined && value.to === undefined && 
    value.paymentMethod === undefined && value.clientId === undefined && value.orderId === undefined && value.clientName == undefined && value.clientPhone == undefined) {
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?state=` +value.status +'&from='+value.from,
    { method: 'GET',}
    );
  }else if(value.status === undefined && value.from != undefined && value.to === undefined && 
    value.paymentMethod === undefined && value.clientId === undefined && value.orderId === undefined && value.clientName == undefined && value.clientPhone == undefined){
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?from=`+value.from,
    { method: 'GET',}
    );
  }else if(value.status === undefined && value.from === undefined && value.to != undefined && 
    value.paymentMethod === undefined && value.clientId === undefined && value.orderId === undefined && value.clientName == undefined && value.clientPhone == undefined){
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?to=`+value.to,
    { method: 'GET',}
    );
  }else if(value.status != undefined && value.from === undefined && value.to != undefined && 
    value.paymentMethod === undefined && value.clientId === undefined && value.orderId === undefined && value.clientName == undefined && value.clientPhone == undefined){
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?state=` +value.status +'&to='+value.to,
    { method: 'GET',}
    );
  }else if(value.status === undefined && value.from != undefined && value.to != undefined && 
    value.paymentMethod === undefined && value.clientId === undefined && value.orderId === undefined && value.clientName == undefined && value.clientPhone == undefined){
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?from=` +value.from +'&to='+value.to,
    { method: 'GET',}
    );
  }else if(value.status === undefined && value.from != undefined && value.to != undefined && 
    value.paymentMethod != undefined && value.clientId === undefined && value.orderId === undefined && value.clientName == undefined && value.clientPhone == undefined){
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?from=` +value.from +'&to='+value.to + '&paymentMethod=' + value.paymentMethod,
    { method: 'GET',}
    );
  }else if(value.status === undefined && value.from != undefined && value.to != undefined && 
    value.paymentMethod === undefined && value.clientId == undefined && value.orderId === undefined && value.clientName == undefined && value.clientPhone == undefined){
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?from=` +value.from +'&to='+value.to,
    { method: 'GET',}
    );
  }else if(value.status != undefined && value.from != undefined && value.to != undefined && 
    value.paymentMethod === undefined && value.clientId == undefined && value.orderId === undefined 
    && value.clientName == undefined && value.clientPhone == undefined){
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?from=` +value.from +'&to='+value.to
    + '&state=' + value.status,
    { method: 'GET',}
    );
  }else if(value.status != undefined && value.from != undefined && value.to != undefined && 
    value.paymentMethod != undefined && value.clientId === undefined && value.orderId === undefined && value.clientName == undefined && value.clientPhone == undefined){
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?from=` +value.from +'&to='+value.to +
     '&paymentMethod=' + value.paymentMethod
    + '&state=' + value.status,
    { method: 'GET',}
    );
  }else if(value.status != undefined && value.from === undefined && value.to != undefined && 
    value.paymentMethod != undefined && value.clientId === undefined && value.orderId === undefined && value.clientName == undefined && value.clientPhone == undefined){
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?to=` +value.to + '&paymentMethod=' + value.paymentMethod
    + '&state=' + value.status,
    { method: 'GET',}
    );
  }else if(value.status != undefined && value.from != undefined && value.to === undefined && 
    value.paymentMethod != undefined && value.clientId === undefined && value.orderId === undefined && value.clientName == undefined && value.clientPhone == undefined){
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?from=` +value.from + '&paymentMethod=' + value.paymentMethod
    + '&state=' + value.status,
    { method: 'GET',}
    );
  }else if(value.status != undefined && value.from === undefined && value.to === undefined && 
    value.paymentMethod != undefined && value.clientId === undefined && value.orderId === undefined && value.clientName == undefined && value.clientPhone == undefined){
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?paymentMethod=` + value.paymentMethod
    + '&state=' + value.status,
    { method: 'GET',}
    );
  }else if(value.status === undefined && value.from === undefined && value.to === undefined && 
    value.paymentMethod != undefined && value.clientId != undefined && value.orderId === undefined && value.clientName == undefined && value.clientPhone == undefined){
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?paymentMethod=` + value.paymentMethod
    + '&clientId=' + value.clientId,
    { method: 'GET',}
    );
  }else if(value.status != undefined && value.from === undefined && value.to != undefined && 
    value.paymentMethod === undefined && value.clientId != undefined && value.orderId === undefined && value.clientName == undefined && value.clientPhone == undefined){
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?to=` +value.to + '&clientId=' + value.clientId
    + '&state=' + value.status,
    { method: 'GET',}
    );
  }else if(value.status != undefined && value.from != undefined && value.to === undefined && 
    value.paymentMethod === undefined && value.clientId != undefined && value.orderId === undefined && value.clientName == undefined && value.clientPhone == undefined){
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?from=` +value.from + '&clientId=' + value.clientId
    + '&state=' + value.status,
    { method: 'GET',}
    );
  }else if(value.status != undefined && value.from === undefined && value.to === undefined && 
    value.paymentMethod === undefined && value.clientId != undefined && value.orderId === undefined && value.clientName == undefined && value.clientPhone == undefined){
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?clientId=` + value.clientId
    + '&state=' + value.status,
    { method: 'GET',}
    );
  }else if(value.status === undefined && value.from != undefined && value.to === undefined && 
    value.paymentMethod === undefined && value.clientId != undefined && value.orderId === undefined && value.clientName == undefined && value.clientPhone == undefined){
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?clientId=` + value.clientId
    + '&from=' + value.from,
    { method: 'GET',}
    );
  }else if(value.status === undefined && value.from === undefined && value.to != undefined && 
    value.paymentMethod === undefined && value.clientId != undefined && value.orderId === undefined && value.clientName == undefined && value.clientPhone == undefined){
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?clientId=` + value.clientId
    + '&to=' + value.to,
    { method: 'GET',}
    );
  }else if(value.status === undefined && value.from != undefined && value.to === undefined && 
    value.paymentMethod != undefined && value.clientId != undefined && value.orderId === undefined && value.clientName == undefined && value.clientPhone == undefined){
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?paymentMethod=` + value.paymentMethod
    + '&from=' + value.from,
    { method: 'GET',}
    );
  }else if(value.status === undefined && value.from === undefined && value.to != undefined && 
    value.paymentMethod != undefined && value.clientId === undefined && value.orderId === undefined && value.clientName == undefined && value.clientPhone == undefined){
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?paymentMethod=` + value.paymentMethod
    + '&to=' + value.to,
    { method: 'GET',}
    );
  }else if(value.status === undefined && value.from === undefined && value.to != undefined && 
    value.paymentMethod != undefined && value.clientId != undefined && value.orderId === undefined && value.clientName == undefined && value.clientPhone == undefined){
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?paymentMethod=` + value.paymentMethod
    + '&to=' + value.to + '&clientId=' + value.clientId,
    { method: 'GET',}
    );
  }else if(value.status === undefined && value.from != undefined && value.to === undefined && 
    value.paymentMethod != undefined && value.clientId != undefined && value.orderId === undefined && value.clientName == undefined && value.clientPhone == undefined){
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?paymentMethod=` + value.paymentMethod
    + '&from=' + value.from + '&clientId=' + value.clientId,
    { method: 'GET',}
    );
  }else if(value.status != undefined && value.from === undefined && value.to === undefined && 
    value.paymentMethod != undefined && value.clientId != undefined && value.orderId === undefined && value.clientName == undefined && value.clientPhone == undefined){
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?paymentMethod=` + value.paymentMethod
    + '&state=' + value.status + '&clientId=' + value.clientId,
    { method: 'GET',}
    );
  }else if(value.status === undefined && value.from === undefined && value.to === undefined && 
    value.paymentMethod === undefined && value.clientId != undefined && value.orderId === undefined && value.clientName == undefined && value.clientPhone == undefined){
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?clientId=` + value.clientId,
    { method: 'GET',}
    );
  }else if(value.status === undefined && value.from === undefined && value.to === undefined && 
    value.paymentMethod != undefined && value.clientId === undefined && value.orderId === undefined && value.clientName == undefined && value.clientPhone == undefined){
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?paymentMethod=` + value.paymentMethod,
    { method: 'GET',}
    );
  }else if(value.status === undefined && value.from === undefined && value.to === undefined && 
    value.paymentMethod === undefined && value.clientId === undefined && value.orderId != undefined && value.clientName == undefined && value.clientPhone == undefined){
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?orderId=` + value.orderId,
    { method: 'GET',}
    );
  }else if(value.status === undefined && value.from === undefined && value.to === undefined && 
    value.paymentMethod === undefined && value.clientId != undefined && value.orderId != undefined && value.clientName == undefined && value.clientPhone == undefined){
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?orderId=` + value.orderId + '&clientId='+ value.clientId,
    { method: 'GET',}
    );
  }else if(value.status === undefined && value.from === undefined && value.to === undefined && 
    value.paymentMethod != undefined && value.clientId === undefined && value.orderId != undefined && value.clientName == undefined && value.clientPhone == undefined){
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?orderId=` + value.orderId  + '&paymentMethod='+ value.paymentMethod,
    { method: 'GET',}
    );
  }else if(value.status === undefined && value.from === undefined && value.to != undefined && 
    value.paymentMethod === undefined && value.clientId === undefined && value.orderId != undefined && value.clientName == undefined && value.clientPhone == undefined){
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?orderId=` + value.orderId  + '&to='+ value.to,
    { method: 'GET',}
    );
  }else if(value.status === undefined && value.from != undefined && value.to === undefined && 
    value.paymentMethod === undefined && value.clientId === undefined && value.orderId != undefined && value.clientName == undefined && value.clientPhone == undefined){
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?orderId=` + value.orderId  + '&from='+ value.from,
    { method: 'GET',}
    );
  }else if(value.status != undefined && value.from === undefined && value.to === undefined && 
    value.paymentMethod === undefined && value.clientId === undefined && value.orderId != undefined && value.clientName == undefined && value.clientPhone == undefined){
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?orderId=` + value.orderId  + '&state='+ value.status,
    { method: 'GET',}
    );
  }else if(value.status != undefined && value.from != undefined && value.to === undefined && 
    value.paymentMethod === undefined && value.clientId === undefined && value.orderId != undefined && value.clientName == undefined && value.clientPhone == undefined){
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?orderId=` + value.orderId  + '&state='+ value.status
    +'&from='+value.from,
    { method: 'GET',}
    );
  }else if(value.status != undefined && value.from === undefined && value.to != undefined && 
    value.paymentMethod === undefined && value.clientId === undefined && value.orderId != undefined && value.clientName == undefined && value.clientPhone == undefined){
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?orderId=` + value.orderId  + '&state='+ value.status
    +'&to='+value.to,
    { method: 'GET',}
    );
  }else if(value.status != undefined && value.from === undefined && value.to === undefined && 
    value.paymentMethod != undefined && value.clientId === undefined && value.orderId != undefined && value.clientName == undefined && value.clientPhone == undefined){
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?orderId=` + value.orderId  + '&state='+ value.status
    +'&paymentMethod='+value.paymentMethod,
    { method: 'GET',}
    );
  }else if(value.status != undefined && value.from === undefined && value.to === undefined && 
    value.paymentMethod === undefined && value.clientId != undefined && value.orderId != undefined && value.clientName == undefined && value.clientPhone == undefined){
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?orderId=` + value.orderId  + '&state='+ value.status
    +'&clientId='+value.clientId,
    { method: 'GET',}
    );
  }else if(value.status === undefined && value.from != undefined && value.to != undefined && 
    value.paymentMethod === undefined && value.clientId === undefined && value.orderId != undefined && value.clientName == undefined && value.clientPhone == undefined){
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?orderId=` + value.orderId  + '&from='+ value.from
    +'&to='+value.to,
    { method: 'GET',}
    );
  }else if(value.status === undefined && value.from != undefined && value.to == undefined && 
    value.paymentMethod != undefined && value.clientId === undefined && value.orderId != undefined && value.clientName == undefined && value.clientPhone == undefined){
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?orderId=` + value.orderId  + '&from='+ value.from
    +'&paymentMethod='+value.paymentMethod,
    { method: 'GET',}
    );
  }else if(value.status === undefined && value.from != undefined && value.to == undefined && 
    value.paymentMethod === undefined && value.clientId != undefined && value.orderId != undefined && value.clientName == undefined && value.clientPhone == undefined){
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?orderId=` + value.orderId  + '&from='+ value.from
    +'&clientId='+value.clientId,
    { method: 'GET',}
    );
  }else if(value.status === undefined && value.from === undefined && value.to != undefined && 
    value.paymentMethod === undefined && value.clientId != undefined && value.orderId != undefined && value.clientName == undefined && value.clientPhone == undefined){
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?orderId=` + value.orderId  + '&to='+ value.to
    +'&clientId='+value.clientId,
    { method: 'GET',}
    );
  }else if(value.status === undefined && value.from === undefined && value.to != undefined && 
    value.paymentMethod != undefined && value.clientId === undefined && value.orderId != undefined && value.clientName == undefined && value.clientPhone == undefined){
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?orderId=` + value.orderId  + '&to='+ value.to
    +'&paymentMethod='+value.paymentMethod,
    { method: 'GET',}
    );
  }else if(value.status === undefined && value.from === undefined && value.to === undefined && 
    value.paymentMethod != undefined && value.clientId != undefined && value.orderId != undefined && value.clientName == undefined && value.clientPhone == undefined){
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?orderId=` + value.orderId  + '&clientId='+ value.clientId
    +'&paymentMethod='+value.paymentMethod,
    { method: 'GET',}
    );
  }else if(value.status != undefined && value.from === undefined && value.to === undefined && 
    value.paymentMethod != undefined && value.clientId != undefined && value.orderId != undefined && value.clientName == undefined && value.clientPhone == undefined){
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?orderId=` + value.orderId  + '&clientId='+ value.clientId
    +'&paymentMethod='+value.paymentMethod + '&state='+value.status,
    { method: 'GET',}
    );
  }else if(value.status != undefined && value.from != undefined && value.to != undefined && 
    value.paymentMethod === undefined && value.clientId === undefined && value.orderId != undefined && value.clientName == undefined && value.clientPhone == undefined){
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?orderId=` + value.orderId  + '&from='+ value.from
    +'&to='+value.to + '&state='+value.status,
    { method: 'GET',}
    );
  }else if(value.status != undefined && value.from === undefined && value.to != undefined && 
    value.paymentMethod === undefined && value.clientId != undefined && value.orderId != undefined && value.clientName == undefined && value.clientPhone == undefined){
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?orderId=` + value.orderId  + '&clientId='+ value.clientId
    +'&to='+value.to + '&state='+value.status,
    { method: 'GET',}
    );
  }else if(value.status === undefined && value.from != undefined && value.to != undefined && 
    value.paymentMethod === undefined && value.clientId != undefined && value.orderId != undefined && value.clientName == undefined && value.clientPhone == undefined){
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?orderId=` + value.orderId  + '&clientId='+ value.clientId
    +'&to='+value.to + '&from='+value.from,
    { method: 'GET',}
    );
  }else if(value.status != undefined && value.from != undefined && value.to === undefined && 
    value.paymentMethod === undefined && value.clientId != undefined && value.orderId != undefined && value.clientName == undefined && value.clientPhone == undefined){
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?orderId=` + value.orderId  + '&clientId='+ value.clientId
    +'&from='+value.from + '&state='+value.status,
    { method: 'GET',}
    );
  }else if(value.status != undefined && value.from != undefined && value.to === undefined && 
    value.paymentMethod != undefined && value.clientId === undefined && value.orderId != undefined && value.clientName == undefined && value.clientPhone == undefined){
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?orderId=` + value.orderId  + '&paymentMethod='+ value.paymentMethod
    +'&from='+value.from + '&state='+value.status,
    { method: 'GET',}
    );
  }else if(value.status != undefined && value.from == undefined && value.to != undefined && 
    value.paymentMethod != undefined && value.clientId === undefined && value.orderId != undefined && value.clientName == undefined && value.clientPhone == undefined){
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?orderId=` + value.orderId  + '&paymentMethod='+ value.paymentMethod
    +'&to='+value.to + '&state='+value.status,
    { method: 'GET',}
    );
  }else if(value.status === undefined && value.from == undefined && value.to != undefined && 
    value.paymentMethod != undefined && value.clientId != undefined && value.orderId != undefined && value.clientName == undefined && value.clientPhone == undefined){
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?orderId=` + value.orderId  + '&paymentMethod='+ value.paymentMethod
    +'&to='+value.to + '&clientId='+value.clientId,
    { method: 'GET',}
    );
  }else if(value.status === undefined && value.from != undefined && value.to != undefined && 
    value.paymentMethod != undefined && value.clientId === undefined && value.orderId != undefined && value.clientName == undefined && value.clientPhone == undefined){
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?orderId=` + value.orderId  + '&paymentMethod='+ value.paymentMethod
    +'&to='+value.to + '&from='+value.from,
    { method: 'GET',}
    );
  }else if(value.status === undefined && value.from != undefined && value.to === undefined && 
    value.paymentMethod != undefined && value.clientId != undefined && value.orderId != undefined && value.clientName == undefined && value.clientPhone == undefined){
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?orderId=` + value.orderId  + '&paymentMethod='+ value.paymentMethod
    +'&from='+value.from + '&clientId='+value.clientId,
    { method: 'GET',}
    );
  }else if(value.status != undefined && value.from != undefined && value.to != undefined && 
    value.paymentMethod != undefined && value.clientId === undefined && value.orderId != undefined && value.clientName == undefined && value.clientPhone == undefined){
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?orderId=` + value.orderId  + '&paymentMethod='+ value.paymentMethod
    +'&from='+value.from + '&state='+value.status + '&to='+value.to,
    { method: 'GET',}
    );
  }else if(value.status != undefined && value.from != undefined && value.to != undefined && 
    value.paymentMethod === undefined && value.clientId != undefined && value.orderId != undefined && value.clientName == undefined && value.clientPhone == undefined){
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?orderId=` + value.orderId  + '&state='+ value.status
    +'&from='+value.from + '&clientId='+value.clientId + '&to='+value.to,
    { method: 'GET',}
    );
  }else if(value.status != undefined && value.from === undefined && value.to != undefined && 
    value.paymentMethod != undefined && value.clientId != undefined && value.orderId != undefined && value.clientName == undefined && value.clientPhone == undefined){
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?orderId=` + value.orderId  + '&state='+ value.status
    +'&paymentMethod='+value.paymentMethod + '&clientId='+value.clientId + '&to='+value.to,
    { method: 'GET',}
    );
  }else if(value.status != undefined && value.from != undefined && value.to === undefined && 
    value.paymentMethod != undefined && value.clientId != undefined && value.orderId != undefined && value.clientName == undefined && value.clientPhone == undefined){
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?orderId=` + value.orderId  + '&state='+ value.status
    +'&paymentMethod='+value.paymentMethod + '&clientId='+value.clientId + '&from='+value.from,
    { method: 'GET',}
    );
  }else if(value.status === undefined && value.from != undefined && value.to != undefined && 
    value.paymentMethod != undefined && value.clientId != undefined && value.orderId != undefined && value.clientName == undefined && value.clientPhone == undefined){
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?orderId=` + value.orderId  + '&paymentMethod='+ value.paymentMethod
    +'&from='+value.from + '&clientId='+value.clientId + '&to='+value.to ,
    { method: 'GET',}
    );
  }else if(value.status === undefined && value.from == undefined && value.to == undefined && 
    value.paymentMethod == undefined && value.clientId == undefined && value.orderId != undefined && value.clientName != undefined && value.clientPhone == undefined){
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?orderId=` + value.orderId +'&clientName=' + value.clientName ,
    { method: 'GET',}
    );
  }else if(value.status === undefined && value.from == undefined && value.to == undefined && 
    value.paymentMethod == undefined && value.clientId != undefined && value.orderId == undefined && value.clientName != undefined && value.clientPhone == undefined){
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?clientId=` + value.clientId +'&clientName=' + value.clientName ,
    { method: 'GET',}
    );
  }else if(value.status === undefined && value.from == undefined && value.to == undefined && 
    value.paymentMethod != undefined && value.clientId == undefined && value.orderId == undefined && value.clientName != undefined && value.clientPhone == undefined){
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?paymentMethod=` + value.paymentMethod +'&clientName=' + value.clientName ,
    { method: 'GET',}
    );
  }else if(value.status != undefined && value.from == undefined && value.to == undefined && 
    value.paymentMethod == undefined && value.clientId == undefined && value.orderId == undefined && value.clientName != undefined && value.clientPhone == undefined){
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?state=` + value.status +'&clientName=' + value.clientName ,
    { method: 'GET',}
    );
  }else if(value.status == undefined && value.from != undefined && value.to == undefined && 
    value.paymentMethod == undefined && value.clientId == undefined && value.orderId == undefined && value.clientName != undefined && value.clientPhone == undefined){
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?from=` + value.from +'&clientName=' + value.clientName ,
    { method: 'GET',}
    );
  }else if(value.status == undefined && value.from == undefined && value.to != undefined && 
    value.paymentMethod == undefined && value.clientId == undefined && value.orderId == undefined && value.clientName != undefined && value.clientPhone == undefined){
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?to=` + value.to +'&clientName=' + value.clientName ,
    { method: 'GET',}
    );
  }else if(value.status != undefined && value.from == undefined && value.to != undefined && 
    value.paymentMethod == undefined && value.clientId == undefined && value.orderId == undefined && value.clientName != undefined && value.clientPhone == undefined){
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?to=` + value.to +'&clientName=' + value.clientName
    +'&state='+value.status ,
    { method: 'GET',}
    );
  }else if(value.status != undefined && value.from != undefined && value.to == undefined && 
    value.paymentMethod == undefined && value.clientId == undefined && value.orderId == undefined && value.clientName != undefined && value.clientPhone == undefined){
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?from=` + value.from +'&clientName=' + value.clientName
    +'&state='+value.status ,
    { method: 'GET',}
    );
  }else if(value.status != undefined && value.from == undefined && value.to == undefined && 
    value.paymentMethod != undefined && value.clientId == undefined && value.orderId == undefined && value.clientName != undefined && value.clientPhone == undefined){
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?paymentMethod=` + value.paymentMethod +'&clientName=' + value.clientName
    +'&state='+value.status ,
    { method: 'GET',}
    );
  }else if(value.status != undefined && value.from == undefined && value.to == undefined && 
    value.paymentMethod == undefined && value.clientId != undefined && value.orderId == undefined && value.clientName != undefined && value.clientPhone == undefined){
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?clientId=` + value.clientId +'&clientName=' + value.clientName
    +'&state='+value.status ,
    { method: 'GET',}
    );
  }else if(value.status != undefined && value.from == undefined && value.to == undefined && 
    value.paymentMethod == undefined && value.clientId == undefined && value.orderId != undefined && value.clientName != undefined && value.clientPhone == undefined){
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?orderId=` + value.orderId +'&clientName=' + value.clientName
    +'&state='+value.status ,
    { method: 'GET',}
    );
  }else if(value.status == undefined && value.from != undefined && value.to != undefined && 
    value.paymentMethod == undefined && value.clientId == undefined && value.orderId == undefined && value.clientName != undefined && value.clientPhone == undefined){
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?to=` + value.to +'&clientName=' + value.clientName
    +'&from='+value.from ,
    { method: 'GET',}
    );
  }else if(value.status == undefined && value.from != undefined && value.to == undefined && 
    value.paymentMethod == undefined && value.clientId == undefined && value.orderId != undefined && value.clientName != undefined && value.clientPhone == undefined){
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?orderId=` + value.orderId +'&clientName=' + value.clientName
    +'&from='+value.from ,
    { method: 'GET',}
    );
  }else if(value.status == undefined && value.from != undefined && value.to == undefined && 
    value.paymentMethod == undefined && value.clientId != undefined && value.orderId == undefined && value.clientName != undefined && value.clientPhone == undefined){
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?clientId=` + value.clientId +'&clientName=' + value.clientName
    +'&from='+value.from ,
    { method: 'GET',}
    );
  }else if(value.status == undefined && value.from != undefined && value.to == undefined && 
    value.paymentMethod != undefined && value.clientId == undefined && value.orderId == undefined && value.clientName != undefined && value.clientPhone == undefined){
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?paymentMethod=` + value.paymentMethod +'&clientName=' + value.clientName
    +'&from='+value.from ,
    { method: 'GET',}
    );
  }else if(value.status == undefined && value.from == undefined && value.to != undefined && 
    value.paymentMethod == undefined && value.clientId != undefined && value.orderId == undefined && value.clientName != undefined && value.clientPhone == undefined){
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?clientId=` + value.clientId +'&clientName=' + value.clientName
    +'&to='+value.to ,
    { method: 'GET',}
    );
  }else if(value.status == undefined && value.from == undefined && value.to != undefined && 
    value.paymentMethod != undefined && value.clientId == undefined && value.orderId == undefined && value.clientName != undefined && value.clientPhone == undefined){
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?paymentMethod=` + value.paymentMethod +'&clientName=' + value.clientName
    +'&to='+value.to ,
    { method: 'GET',}
    );
  }else if(value.status == undefined && value.from == undefined && value.to != undefined && 
    value.paymentMethod == undefined && value.clientId == undefined && value.orderId != undefined && value.clientName != undefined && value.clientPhone == undefined){
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?orderId=` + value.orderId +'&clientName=' + value.clientName
    +'&to='+value.to ,
    { method: 'GET',}
    );
  }else if(value.status == undefined && value.from == undefined && value.to == undefined && 
    value.paymentMethod != undefined && value.clientId == undefined && value.orderId != undefined && value.clientName != undefined && value.clientPhone == undefined){
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?orderId=` + value.orderId +'&clientName=' + value.clientName
    +'&paymentMethod='+value.paymentMethod ,
    { method: 'GET',}
    );
  }else if(value.status == undefined && value.from == undefined && value.to == undefined && 
    value.paymentMethod != undefined && value.clientId != undefined && value.orderId == undefined && value.clientName != undefined && value.clientPhone == undefined){
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?clientId=` + value.clientId +'&clientName=' + value.clientName
    +'&paymentMethod='+value.paymentMethod ,
    { method: 'GET',}
    );
  }else if(value.status == undefined && value.from == undefined && value.to == undefined && 
    value.paymentMethod != undefined && value.clientId != undefined && value.orderId != undefined && value.clientName != undefined && value.clientPhone == undefined){
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?clientId=` + value.clientId +'&clientName=' + value.clientName
    +'&orderId='+value.orderId +'&paymentMethod='+value.paymentMethod ,
    { method: 'GET',}
    );
  }else if(value.status == undefined && value.from == undefined && value.to != undefined && 
    value.paymentMethod == undefined && value.clientId != undefined && value.orderId != undefined && value.clientName != undefined && value.clientPhone == undefined){
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?clientId=` + value.clientId +'&clientName=' + value.clientName
    +'&orderId='+value.orderId +'&to='+value.to ,
    { method: 'GET',}
    );
  }else if(value.status == undefined && value.from != undefined && value.to == undefined && 
    value.paymentMethod == undefined && value.clientId != undefined && value.orderId != undefined && value.clientName != undefined && value.clientPhone == undefined){
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?clientId=` + value.clientId +'&clientName=' + value.clientName
    +'&orderId='+value.orderId +'&from='+value.from ,
    { method: 'GET',}
    );
  }else if(value.status != undefined && value.from == undefined && value.to == undefined && 
    value.paymentMethod == undefined && value.clientId != undefined && value.orderId != undefined && value.clientName != undefined && value.clientPhone == undefined){
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?clientId=` + value.clientId +'&clientName=' + value.clientName
    +'&orderId='+value.orderId +'&state='+value.status ,
    { method: 'GET',}
    );
  }else if(value.status != undefined && value.from == undefined && value.to == undefined && 
    value.paymentMethod != undefined && value.clientId == undefined && value.orderId != undefined && value.clientName != undefined && value.clientPhone == undefined){
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?paymentMethod=` + value.paymentMethod +'&clientName=' + value.clientName
    +'&orderId='+value.orderId +'&state='+value.status ,
    { method: 'GET',}
    );
  }else if(value.status == undefined && value.from != undefined && value.to == undefined && 
    value.paymentMethod != undefined && value.clientId == undefined && value.orderId != undefined && value.clientName != undefined && value.clientPhone == undefined){
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?paymentMethod=` + value.paymentMethod +'&clientName=' + value.clientName
    +'&orderId='+value.orderId +'&from='+value.from ,
    { method: 'GET',}
    );
  }else if(value.status == undefined && value.from == undefined && value.to != undefined && 
    value.paymentMethod != undefined && value.clientId == undefined && value.orderId != undefined && value.clientName != undefined && value.clientPhone == undefined){
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?paymentMethod=` + value.paymentMethod +'&clientName=' + value.clientName
    +'&orderId='+value.orderId +'&to='+value.to ,
    { method: 'GET',}
    );
  }else if(value.status != undefined && value.from == undefined && value.to != undefined && 
    value.paymentMethod == undefined && value.clientId == undefined && value.orderId != undefined && value.clientName != undefined && value.clientPhone == undefined){
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?state=` + value.status +'&clientName=' + value.clientName
    +'&orderId='+value.orderId +'&to='+value.to ,
    { method: 'GET',}
    );
  }else if(value.status != undefined && value.from != undefined && value.to == undefined && 
    value.paymentMethod == undefined && value.clientId == undefined && value.orderId != undefined && value.clientName != undefined && value.clientPhone == undefined){
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?state=` + value.status +'&clientName=' + value.clientName
    +'&orderId='+value.orderId +'&from='+value.from ,
    { method: 'GET',}
    );
  }else if(value.status != undefined && value.from != undefined && value.to != undefined && 
    value.paymentMethod == undefined && value.clientId == undefined && value.orderId == undefined && value.clientName != undefined && value.clientPhone == undefined){
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?state=` + value.status +'&clientName=' + value.clientName
    +'&to='+value.to +'&from='+value.from ,
    { method: 'GET',}
    );
  }else if(value.status == undefined && value.from == undefined && value.to != undefined && 
    value.paymentMethod != undefined && value.clientId != undefined && value.orderId == undefined && value.clientName != undefined && value.clientPhone == undefined){
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?clientId=` + value.clientId +'&clientName=' + value.clientName
    +'&to='+value.to +'&paymentMethod='+value.paymentMethod ,
    { method: 'GET',}
    );
  }else if(value.status != undefined && value.from != undefined && value.to != undefined && 
    value.paymentMethod == undefined && value.clientId == undefined && value.orderId != undefined && value.clientName != undefined && value.clientPhone == undefined){
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?orderId=` + value.orderId +'&clientName=' + value.clientName
    +'&to='+value.to +'&state='+value.status +'&from='+value.from ,
    { method: 'GET',}
    );
  }else if(value.status == undefined && value.from != undefined && value.to != undefined && 
    value.paymentMethod == undefined && value.clientId == undefined && value.orderId != undefined && value.clientName != undefined && value.clientPhone == undefined){
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?orderId=` + value.orderId +'&clientName=' + value.clientName
    +'&to='+value.to +'&from='+value.from ,
    { method: 'GET',}
    );
  }else if(value.status != undefined && value.from != undefined && value.to != undefined && 
    value.paymentMethod != undefined && value.clientId == undefined && value.orderId == undefined && value.clientName != undefined && value.clientPhone == undefined){
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?paymentMethod=` + value.paymentMethod +'&clientName=' + value.clientName
    +'&to='+value.to +'&state='+value.status +'&from='+value.from ,
    { method: 'GET',}
    );
  }else if(value.status != undefined && value.from != undefined && value.to == undefined && 
    value.paymentMethod != undefined && value.clientId == undefined && value.orderId == undefined && value.clientName != undefined && value.clientPhone == undefined){
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?paymentMethod=` + value.paymentMethod +'&clientName=' + value.clientName
     +'&state='+value.status +'&from='+value.from ,
    { method: 'GET',}
    );
  }else if(value.status != undefined && value.from == undefined && value.to != undefined && 
    value.paymentMethod != undefined && value.clientId == undefined && value.orderId == undefined && value.clientName != undefined && value.clientPhone == undefined){
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?paymentMethod=` + value.paymentMethod +'&clientName=' + value.clientName
     +'&state='+value.status +'&to='+value.to ,
    { method: 'GET',}
    );
  }else if(value.status != undefined && value.from != undefined && value.to != undefined && 
    value.paymentMethod != undefined && value.clientId == undefined && value.orderId != undefined && value.clientName != undefined && value.clientPhone == undefined){
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?paymentMethod=` + value.paymentMethod +'&clientName=' + value.clientName
     +'&state='+value.status +'&from='+value.from +'&to='+value.to +'&orderId='+value.orderId ,
    { method: 'GET',}
    );
  }
  
  
  
  else if(value.status == undefined && value.from == undefined && value.to == undefined && 
    value.paymentMethod == undefined && value.clientId == undefined && value.orderId == undefined 
    && value.clientName == undefined && value.clientPhone != undefined){
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?clientPhone=` + value.clientPhone ,
    { method: 'GET',}
    );
  }else if(value.status == undefined && value.from == undefined && value.to == undefined && 
    value.paymentMethod == undefined && value.clientId == undefined && value.orderId == undefined 
    && value.clientName != undefined && value.clientPhone != undefined){
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?clientPhone=` + value.clientPhone +'&clientName=' + value.clientName,
    { method: 'GET',}
    );
  }else if(value.status == undefined && value.from == undefined && value.to == undefined && 
    value.paymentMethod == undefined && value.clientId == undefined && value.orderId != undefined 
    && value.clientName == undefined && value.clientPhone != undefined){
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?clientPhone=` + value.clientPhone 
    +'&orderId=' + value.orderId,
    { method: 'GET',}
    );
  }else if(value.status == undefined && value.from == undefined && value.to == undefined && 
    value.paymentMethod == undefined && value.clientId != undefined && value.orderId == undefined 
    && value.clientName == undefined && value.clientPhone != undefined){
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?clientPhone=` + value.clientPhone 
    +'&clientId=' + value.clientId,
    { method: 'GET',}
    );
  }else if(value.status == undefined && value.from == undefined && value.to == undefined && 
    value.paymentMethod != undefined && value.clientId == undefined && value.orderId == undefined 
    && value.clientName == undefined && value.clientPhone != undefined){
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?clientPhone=` + value.clientPhone 
    +'&paymentMethod=' + value.paymentMethod,
    { method: 'GET',}
    );
  }else if(value.status != undefined && value.from == undefined && value.to == undefined && 
    value.paymentMethod == undefined && value.clientId == undefined && value.orderId == undefined 
    && value.clientName == undefined && value.clientPhone != undefined){
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?clientPhone=` + value.clientPhone 
    +'&state=' + value.status,
    { method: 'GET',}
    );
  }else if(value.status == undefined && value.from != undefined && value.to == undefined && 
    value.paymentMethod == undefined && value.clientId == undefined && value.orderId == undefined 
    && value.clientName == undefined && value.clientPhone != undefined){
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?clientPhone=` + value.clientPhone 
    +'&from=' + value.from,
    { method: 'GET',}
    );
  }else if(value.status == undefined && value.from == undefined && value.to != undefined && 
    value.paymentMethod == undefined && value.clientId == undefined && value.orderId == undefined 
    && value.clientName == undefined && value.clientPhone != undefined){
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?clientPhone=` + value.clientPhone 
    +'&to=' + value.to,
    { method: 'GET',}
    );
  }else if(value.status == undefined && value.from != undefined && value.to != undefined && 
    value.paymentMethod == undefined && value.clientId == undefined && value.orderId == undefined 
    && value.clientName == undefined && value.clientPhone != undefined){
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?clientPhone=` + value.clientPhone 
    +'&to=' + value.to +'&from=' + value.from,
    { method: 'GET',}
    );
  }else if(value.status != undefined && value.from == undefined && value.to != undefined && 
    value.paymentMethod == undefined && value.clientId == undefined && value.orderId == undefined 
    && value.clientName == undefined && value.clientPhone != undefined){
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?clientPhone=` + value.clientPhone 
    +'&to=' + value.to +'&states=' + value.status,
    { method: 'GET',}
    );
  }else if(value.status != undefined && value.from != undefined && value.to != undefined && 
    value.paymentMethod == undefined && value.clientId == undefined && value.orderId == undefined 
    && value.clientName == undefined && value.clientPhone != undefined){
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?clientPhone=` + value.clientPhone 
    +'&to=' + value.to +'&states=' + value.status +'&from=' + value.from,
    { method: 'GET',}
    );
  }else if(value.status != undefined && value.from == undefined && value.to == undefined && 
    value.paymentMethod == undefined && value.clientId == undefined && value.orderId == undefined 
    && value.clientName != undefined && value.clientPhone != undefined){
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?clientPhone=` + value.clientPhone 
    +'&clientName=' + value.clientName +'&states=' + value.status,
    { method: 'GET',}
    );
  }else if(value.status != undefined && value.from != undefined && value.to == undefined && 
    value.paymentMethod == undefined && value.clientId == undefined && value.orderId == undefined 
    && value.clientName == undefined && value.clientPhone != undefined){
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?clientPhone=` + value.clientPhone 
    +'&from=' + value.from +'&states=' + value.status,
    { method: 'GET',}
    );
  }else if(value.status != undefined && value.from == undefined && value.to == undefined && 
    value.paymentMethod != undefined && value.clientId == undefined && value.orderId == undefined 
    && value.clientName == undefined && value.clientPhone != undefined){
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?clientPhone=` + value.clientPhone 
    +'&paymentMethod=' + value.paymentMethod +'&states=' + value.status,
    { method: 'GET',}
    );
  }else if(value.status != undefined && value.from == undefined && value.to == undefined && 
    value.paymentMethod == undefined && value.clientId == undefined && value.orderId != undefined 
    && value.clientName == undefined && value.clientPhone != undefined){
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?clientPhone=` + value.clientPhone 
    +'&orderId=' + value.orderId +'&states=' + value.status,
    { method: 'GET',}
    );
  }else if(value.status != undefined && value.from == undefined && value.to == undefined && 
    value.paymentMethod == undefined && value.clientId != undefined && value.orderId == undefined 
    && value.clientName == undefined && value.clientPhone != undefined){
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?clientPhone=` + value.clientPhone 
    +'&clientId=' + value.clientId +'&states=' + value.status,
    { method: 'GET',}
    );
  }else if(value.status == undefined && value.from == undefined && value.to == undefined && 
    value.paymentMethod != undefined && value.clientId == undefined && value.orderId == undefined 
    && value.clientName != undefined && value.clientPhone != undefined){
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?clientPhone=` + value.clientPhone 
    +'&clientName=' + value.clientName +'&paymentMethod=' + value.paymentMethod,
    { method: 'GET',}
    );
  }else if(value.status == undefined && value.from != undefined && value.to == undefined && 
    value.paymentMethod == undefined && value.clientId == undefined && value.orderId == undefined 
    && value.clientName != undefined && value.clientPhone != undefined){
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?clientPhone=` + value.clientPhone 
    +'&clientName=' + value.clientName +'&from=' + value.from,
    { method: 'GET',}
    );
  }else if(value.status == undefined && value.from == undefined && value.to != undefined && 
    value.paymentMethod == undefined && value.clientId == undefined && value.orderId == undefined 
    && value.clientName != undefined && value.clientPhone != undefined){
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?clientPhone=` + value.clientPhone 
    +'&clientName=' + value.clientName +'&to=' + value.to,
    { method: 'GET',}
    );
  }else if(value.status == undefined && value.from == undefined && value.to == undefined && 
    value.paymentMethod == undefined && value.clientId == undefined && value.orderId != undefined 
    && value.clientName != undefined && value.clientPhone != undefined){
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?clientPhone=` + value.clientPhone 
    +'&clientName=' + value.clientName +'&OrderId=' + value.OrderId,
    { method: 'GET',}
    );
  }else if(value.status == undefined && value.from == undefined && value.to == undefined && 
    value.paymentMethod != undefined && value.clientId == undefined && value.orderId != undefined 
    && value.clientName == undefined && value.clientPhone != undefined){
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?clientPhone=` + value.clientPhone 
    +'&paymentMethod=' + value.paymentMethod +'&OrderId=' + value.OrderId,
    { method: 'GET',}
    );
  }else if(value.status == undefined && value.from != undefined && value.to == undefined && 
    value.paymentMethod != undefined && value.clientId == undefined && value.orderId == undefined 
    && value.clientName == undefined && value.clientPhone != undefined){
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?clientPhone=` + value.clientPhone 
    +'&paymentMethod=' + value.paymentMethod +'&from=' + value.from,
    { method: 'GET',}
    );
  }else if(value.status == undefined && value.from == undefined && value.to != undefined && 
    value.paymentMethod != undefined && value.clientId == undefined && value.orderId == undefined 
    && value.clientName == undefined && value.clientPhone != undefined){
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?clientPhone=` + value.clientPhone 
    +'&paymentMethod=' + value.paymentMethod +'&to=' + value.to,
    { method: 'GET',}
    );
  }else if(value.status == undefined && value.from == undefined && value.to == undefined && 
    value.paymentMethod != undefined && value.clientId != undefined && value.orderId == undefined 
    && value.clientName == undefined && value.clientPhone != undefined){
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?clientPhone=` + value.clientPhone 
    +'&paymentMethod=' + value.paymentMethod +'&clientId=' + value.clientId,
    { method: 'GET',}
    );
  }else if(value.status == undefined && value.from != undefined && value.to != undefined && 
    value.paymentMethod != undefined && value.clientId == undefined && value.orderId == undefined 
    && value.clientName == undefined && value.clientPhone != undefined){
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?clientPhone=` + value.clientPhone 
    +'&paymentMethod=' + value.paymentMethod +'&from=' + value.from +'&to=' + value.to,
    { method: 'GET',}
    );
  }else if(value.status == undefined && value.from != undefined && value.to != undefined && 
    value.paymentMethod == undefined && value.clientId == undefined && value.orderId == undefined 
    && value.clientName != undefined && value.clientPhone != undefined){
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?clientPhone=` + value.clientPhone 
    +'&clientName=' + value.clientName +'&from=' + value.from +'&to=' + value.to,
    { method: 'GET',}
    );
  }else if(value.status != undefined && value.from != undefined && value.to != undefined && 
    value.paymentMethod != undefined && value.clientId == undefined && value.orderId == undefined 
    && value.clientName == undefined && value.clientPhone != undefined){
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?clientPhone=` + value.clientPhone 
    +'&paymentMethod=' + value.paymentMethod +'&from=' + value.from +'&to=' + value.to  +'&states=' + value.status,
    { method: 'GET',}
    );
  }else if(value.status != undefined && value.from != undefined && value.to != undefined && 
    value.paymentMethod != undefined && value.clientId == undefined && value.orderId != undefined 
    && value.clientName == undefined && value.clientPhone != undefined){
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?clientPhone=` + value.clientPhone 
    +'&paymentMethod=' + value.paymentMethod +'&from=' + value.from +'&to=' + value.to  +'&states=' + value.status
    +'&orderId=' + value.orderId,
    { method: 'GET',}
    );
  }else if(value.status != undefined && value.from != undefined && value.to != undefined && 
    value.paymentMethod != undefined && value.clientId == undefined && value.orderId != undefined 
    && value.clientName != undefined && value.clientPhone != undefined){
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?clientPhone=` + value.clientPhone 
    +'&paymentMethod=' + value.paymentMethod +'&from=' + value.from +'&to=' + value.to  +'&states=' + value.status
    +'&clientName=' + value.clientName,
    { method: 'GET',}
    );
  }else if(value.status != undefined && value.from != undefined && value.to != undefined && 
    value.paymentMethod == undefined && value.clientId == undefined && value.orderId == undefined 
    && value.clientName != undefined && value.clientPhone != undefined){
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?clientPhone=` + value.clientPhone 
    +'&from=' + value.from +'&to=' + value.to  +'&states=' + value.status +'&clientName=' + value.clientName,
    { method: 'GET',}
    );
  }else if(value.status != undefined && value.from != undefined && value.to == undefined && 
    value.paymentMethod == undefined && value.clientId == undefined && value.orderId == undefined 
    && value.clientName != undefined && value.clientPhone != undefined){
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?clientPhone=` + value.clientPhone 
    +'&from=' + value.from +'&states=' + value.status +'&clientName=' + value.clientName,
    { method: 'GET',}
    );
  }else if(value.status != undefined && value.from == undefined && value.to != undefined && 
    value.paymentMethod == undefined && value.clientId == undefined && value.orderId == undefined 
    && value.clientName != undefined && value.clientPhone != undefined){
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?clientPhone=` + value.clientPhone 
    +'&to=' + value.to +'&states=' + value.status +'&clientName=' + value.clientName,
    { method: 'GET',}
    );
  }else if(value.status != undefined && value.from == undefined && value.to == undefined && 
    value.paymentMethod != undefined && value.clientId == undefined && value.orderId == undefined 
    && value.clientName != undefined && value.clientPhone != undefined){
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?clientPhone=` + value.clientPhone 
    +'&paymentMethod=' + value.paymentMethod +'&states=' + value.status +'&clientName=' + value.clientName,
    { method: 'GET',}
    );
  }else if(value.status == undefined && value.from == undefined && value.to == undefined && 
    value.paymentMethod != undefined && value.clientId == undefined && value.orderId != undefined 
    && value.clientName != undefined && value.clientPhone != undefined){
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?clientPhone=` + value.clientPhone 
    +'&paymentMethod=' + value.paymentMethod +'&orderId=' + value.orderId +'&clientName=' + value.clientName,
    { method: 'GET',}
    );
  }else if(value.status != undefined && value.from == undefined && value.to != undefined && 
    value.paymentMethod != undefined && value.clientId == undefined && value.orderId == undefined 
    && value.clientName != undefined && value.clientPhone != undefined){
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?clientPhone=` + value.clientPhone 
    +'&paymentMethod=' + value.paymentMethod +'&states=' + value.status +'&clientName=' + value.clientName
    +'&to=' + value.to,
    { method: 'GET',}
    );
  }else if(value.status != undefined && value.from != undefined && value.to == undefined && 
    value.paymentMethod != undefined && value.clientId == undefined && value.orderId == undefined 
    && value.clientName != undefined && value.clientPhone != undefined){
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?clientPhone=` + value.clientPhone 
    +'&paymentMethod=' + value.paymentMethod +'&states=' + value.status +'&clientName=' + value.clientName
    +'&from=' + value.from,
    { method: 'GET',}
    );
  }else if(value.status != undefined && value.from != undefined && value.to != undefined && 
    value.paymentMethod != undefined && value.clientId == undefined && value.orderId == undefined 
    && value.clientName != undefined && value.clientPhone != undefined){
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?clientPhone=` + value.clientPhone 
    +'&paymentMethod=' + value.paymentMethod +'&states=' + value.status +'&clientName=' + value.clientName
    +'&from=' + value.from+'&to=' + value.to,
    { method: 'GET',}
    );
  }else{
    var newRequest = new Request(`${SharedData.BASE_URL}components/orders?state=` +value.status +'&to='+value.to +'&from='+value.from
    +'&paymentMethod='+value.paymentMethod +'&clientId='+value.clientId + '&orderId=' + value.orderId +'&clientName=' + value.clientName
    +'&clientPhone=' + value.clientPhone,
    { method: 'GET',}
    );
  }
  const request = newRequest
        request.headers.delete('Content-Type');
        request.headers.append('Content-Type', 'application/json');
       request.headers.append('x-auth-token', this.token);
            request.headers.append('lang', this.lang);
        const response = await fetch( request);

  const responsecategoryfilter = await response.json();
  if(responsecategoryfilter.message){
    this.toastr.error(responsecategoryfilter.message)
  }
  console.log(responsecategoryfilter)
  this.filterResult = responsecategoryfilter;
  return this.filterResult;
}
async GetId(id) {
    
  const request = new Request(`${SharedData.BASE_URL}components/orders/`+id,
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
}
