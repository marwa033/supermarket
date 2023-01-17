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
    private router: Router,) {
     }
    
  async Get(lang,sort) {
    console.log(lang)
    this.lang = lang;
    const request = new Request(`${SharedData.BASE_URL}components/products?sortByInventory=`+sort,
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
  async GetOnly(lang) {
    console.log(lang)
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
  const data = {ids:element};
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

async GetFilter(value,sort) {
  console.log('*')
  if(value.status === ""){
    value.status = undefined
  }
  if(value.name === ""){
    value.name = undefined
  }
  if(value.subId === ""){
    value.subId = undefined
  }
  if(value.categoryId === ""){
    value.categoryId = undefined
  }
  if(value.featured === ""){
    value.featured = undefined
  }
  if(value.status != undefined && value.name != undefined&& value.subId === undefined && value.categoryId === undefined && value.featured === undefined){
  var newRequest =  new Request(`${SharedData.BASE_URL}components/products?state=` +value.status +'&name='+value.name+'&sortByInventory='+sort,
  { method: 'GET',}
  )
}else if(value.status != undefined && value.subId != undefined && value.name === undefined && value.categoryId === undefined && value.featured === undefined){
  var newRequest =  new Request(`${SharedData.BASE_URL}components/products?state=` +value.status +'&subCategoryId='+value.subId+'&sortByInventory='+sort,
  { method: 'GET',}
  )}
  else if(value.name != undefined && value.subId != undefined && value.status === undefined && value.categoryId === undefined && value.featured === undefined){
    var newRequest =  new Request(`${SharedData.BASE_URL}components/products?name=` +value.name +'&subCategoryId='+value.subId +'&sortByInventory='+sort,
    { method: 'GET',}
    )
  }else if(value.name != undefined && value.status === undefined&& value.subId === undefined && value.categoryId === undefined && value.featured === undefined){
    var newRequest =  new Request(`${SharedData.BASE_URL}components/products?name=` +value.name +'&sortByInventory='+sort,
    { method: 'GET',}
    )
  }else if(value.subId != undefined&& value.name === undefined&& value.status === undefined && value.categoryId === undefined && value.featured === undefined){
    var newRequest =  new Request(`${SharedData.BASE_URL}components/products?subCategoryId=`+value.subId +'&sortByInventory='+sort,
    { method: 'GET',}
    )
  }else if(value.status != undefined&& value.name === undefined&& value.subId === undefined && value.categoryId === undefined && value.featured === undefined){
    var newRequest =  new Request(`${SharedData.BASE_URL}components/products?state=`+value.status +'&sortByInventory='+sort,
    { method: 'GET',}
    )
  }  else if(value.status === undefined&& value.name === undefined&& value.subId === undefined && value.categoryId != undefined && value.featured === undefined){
    var newRequest =  new Request(`${SharedData.BASE_URL}components/products?categoryId=`+value.categoryId +'&sortByInventory='+sort,
    { method: 'GET',}
    )
  }else if(value.status === undefined&& value.name === undefined&& value.subId != undefined && value.categoryId != undefined && value.featured === undefined){
    var newRequest =  new Request(`${SharedData.BASE_URL}components/products?categoryId=`+value.categoryId + '&subCategoryId='+ value.subId +'&sortByInventory='+sort,
    { method: 'GET',}
    )
  }else if(value.status === undefined&& value.name != undefined&& value.subId === undefined && value.categoryId != undefined && value.featured === undefined){
    var newRequest =  new Request(`${SharedData.BASE_URL}components/products?categoryId=`+value.categoryId + '&name='+ value.name +'&sortByInventory='+sort,
    { method: 'GET',}
    )
  }else if(value.status != undefined&& value.name == undefined && value.subId === undefined && value.categoryId != undefined && value.featured === undefined){
    var newRequest =  new Request(`${SharedData.BASE_URL}components/products?categoryId=`+value.categoryId + '&state='+ value.status +'&sortByInventory='+sort,
    { method: 'GET',}
    )
  }else if(value.status != undefined&& value.name != undefined && value.subId === undefined && value.categoryId != undefined && value.featured === undefined){
    var newRequest =  new Request(`${SharedData.BASE_URL}components/products?categoryId=`+value.categoryId + '&state='+ value.status + '&name='+ value.name +'&sortByInventory='+sort,
    { method: 'GET',}
    )
  }else if(value.status != undefined&& value.name === undefined && value.subId != undefined && value.categoryId != undefined && value.featured === undefined){
    var newRequest =  new Request(`${SharedData.BASE_URL}components/products?categoryId=`+value.categoryId + '&state='+ value.status + '&subCategoryId='+ value.subId +'&sortByInventory='+sort,
    { method: 'GET',}
    )
  }else if(value.status === undefined&& value.name != undefined && value.subId != undefined && value.categoryId != undefined && value.featured === undefined){
    var newRequest =  new Request(`${SharedData.BASE_URL}components/products?categoryId=`+value.categoryId + '&name='+ value.name + '&subCategoryId='+ value.subId +'&sortByInventory='+sort,
    { method: 'GET',}
    )
  }else if(value.status === undefined&& value.name === undefined && value.subId === undefined && value.categoryId === undefined && value.featured != undefined){
    var newRequest =  new Request(`${SharedData.BASE_URL}components/products?featured=`+value.featured +'&sortByInventory='+sort,
    { method: 'GET',}
    )
  }else if(value.status === undefined&& value.name === undefined && value.subId === undefined && value.categoryId != undefined && value.featured != undefined){
    var newRequest =  new Request(`${SharedData.BASE_URL}components/products?featured=`+value.featured +'&categoryId='+ value.categoryId +'&sortByInventory='+sort,
    { method: 'GET',}
    )
  }else if(value.status === undefined&& value.name === undefined && value.subId != undefined && value.categoryId === undefined && value.featured != undefined){
    var newRequest =  new Request(`${SharedData.BASE_URL}components/products?featured=`+value.featured +'&subCategoryId='+ value.subId +'&sortByInventory='+sort,
    { method: 'GET',}
    )
  }else if(value.status === undefined&& value.name != undefined && value.subId === undefined && value.categoryId === undefined && value.featured != undefined){
    var newRequest =  new Request(`${SharedData.BASE_URL}components/products?featured=`+value.featured +'&name='+ value.name +'&sortByInventory='+sort,
    { method: 'GET',}
    )
  }else if(value.status != undefined&& value.name === undefined && value.subId === undefined && value.categoryId === undefined && value.featured != undefined){
    var newRequest =  new Request(`${SharedData.BASE_URL}components/products?featured=`+value.featured +'&state='+ value.status +'&sortByInventory='+sort,
    { method: 'GET',}
    )
  }else if(value.status != undefined&& value.name != undefined && value.subId === undefined && value.categoryId === undefined && value.featured != undefined){
    var newRequest =  new Request(`${SharedData.BASE_URL}components/products?featured=`+value.featured +'&state='+ value.status +'&name='+ value.name +'&sortByInventory='+sort,
    { method: 'GET',}
    )
  }else if(value.status != undefined&& value.name === undefined && value.subId != undefined && value.categoryId === undefined && value.featured != undefined){
    var newRequest =  new Request(`${SharedData.BASE_URL}components/products?featured=`+value.featured +'&state='+ value.status +'&subCategoryId='+ value.subId
    +'&sortByInventory='+sort,
    { method: 'GET',}
    )
  }else if(value.status != undefined&& value.name === undefined && value.subId === undefined && value.categoryId != undefined && value.featured != undefined){
    var newRequest =  new Request(`${SharedData.BASE_URL}components/products?featured=`+value.featured +'&state='+ value.status +'&categoryId='+ value.categoryId
    +'&sortByInventory='+sort,
    { method: 'GET',}
    )
  }else if(value.status === undefined&& value.name != undefined && value.subId != undefined && value.categoryId === undefined && value.featured != undefined){
    var newRequest =  new Request(`${SharedData.BASE_URL}components/products?featured=`+value.featured +'&name='+ value.name +'&subCategoryId='+ value.subId
    +'&sortByInventory='+sort,
    { method: 'GET',}
    )
  }else if(value.status === undefined&& value.name != undefined && value.subId == undefined && value.categoryId != undefined && value.featured != undefined){
    var newRequest =  new Request(`${SharedData.BASE_URL}components/products?featured=`+value.featured +'&name='+ value.name +'&categoryId='+ value.categoryId
    +'&sortByInventory='+sort,
    { method: 'GET',}
    )
  }else if(value.status === undefined&& value.name === undefined && value.subId != undefined && value.categoryId != undefined && value.featured != undefined){
    var newRequest =  new Request(`${SharedData.BASE_URL}components/products?featured=`+value.featured +'&subCategoryId='+ value.subId +'&categoryId='+ value.categoryId 
    +'&sortByInventory='+sort,
    { method: 'GET',}
    )
  }else if(value.status != undefined&& value.name != undefined && value.subId != undefined && value.categoryId != undefined
     && value.featured != undefined){
      var newRequest =  new Request(`${SharedData.BASE_URL}components/products?name=` +value.name +'&subCategoryId='+value.subId +'&state='+value.status +'&categoryId='+value.categoryId
      +'&featured='+value.featured +'&sortByInventory='+sort,
      { method: 'GET',}
      )
  } else {
    var newRequest =  new Request(`${SharedData.BASE_URL}components/products?sortByInventory=`+sort,
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
    description:{ en: value.enDescription , ar: value.arDescription},
    inventory: value.inventory, tags: value.tags,
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
 image:value.imageSrc,tags: value.tags,
 name:{ en: value.enname , ar: value.arname},  
 description:{ en: value.enDescription , ar: value.arDescription},
 inventory: value.inventory,
 featured: value.featured,subCategoryId:value.subCategoryId,
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
