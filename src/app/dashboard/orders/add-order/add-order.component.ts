import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoryService } from 'app/dashboard/category/Category.service';
import { ProductsService } from 'app/dashboard/products/products.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { OrderService } from '../order.service';
import { jsPDF } from "jspdf";
@Component({
  selector: 'ms-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.scss']
})
export class AddOrderComponent implements OnInit {
  maxOrder;
  obj;
  AdminRole = JSON.parse(localStorage.getItem("adminRole"));
  selection = new SelectionModel<unknown>(true, []);
  lang = JSON.parse(localStorage.getItem('language'))
  list: any = [];
  minOrder;
  for;
  newQuantity;
  quantity;
  type;
  amount;
  deliveryFees;
  price;
  discount;
  orderId;
  date;
  updateFlag: boolean = false;
  todayDate:Date = new Date();
  id;
  result;
  url;
  addUpdate;
  title;
  apartment;
  floor;
  building;
  street;
  areaName;
  cityName;
  landmark;
  name;
  email;
  fromWallet;
  phone;
  carts;
  subTotal;
  paymentMethod;
  products;
  state;
  productId;
  paymentOrderId;
  note;
  constructor(private route: ActivatedRoute,
    private modalService: NgbModal,
    public productService: ProductsService,
              private spinner: NgxSpinnerService,
              private orderService: OrderService ) { }
  ngOnInit(): void {
    this.Category()
    this.route.params.subscribe(params => {
      this.id = params.id
      console.log(this.id)
      if(this.id != undefined){
        this.updateFlag = true
        this.spinner.show()
      }
      this.orderService.GetId(this.id).
      then( response => { this.result = response;
        console.log("aaaaaa"+this.result.carts)
        this.carts = this.result.carts
        this.orderId = this.result.orderId;
        this.price = this.result.price;
        this.discount = this.result.discount;
        this.subTotal = this.result.subTotal;
        this.paymentMethod = this.result.paymentMethod;
        this.date = this.result.date;
        this.state = this.result.state;
        this.fromWallet = this.result.fromWallet;
        this.deliveryFees = this.result.deliveryFees;
        this.name = this.result.client.user.name;
        this.phone = this.result.client.user.phone;
        this.email = this.result.client.user.email;
        this.note = this.result.note;
        this.paymentOrderId = (this.result)?( this.result.paymentOrderId) : null; 
        this.title = (this.result)?(this.result.address ? this.result.address.title : null) : null; 
        this.apartment = (this.result)?(this.result.address ? this.result.address.apartment : null) : null; 
        this.floor = (this.result)?(this.result.address ? this.result.address.floor : null) : null; 
        this.building = (this.result)?(this.result.address ? this.result.address.building : null) : null; 
        this.street = (this.result)?(this.result.address ? this.result.address.street : null) : null; 
        this.areaName = (this.result)?(this.result.address ? this.result.address.areaName : null) : null; 
        this.cityName = (this.result)?(this.result.address ? this.result.address.cityName : null) : null; 
        this.landmark = (this.result)?(this.result.address ? this.result.address.landmark : null) : null; 

        setTimeout(() => {
          this.spinner.hide();
        }, this.result);

      });
    })
  }


  
  PrintDiv()
  {
      var divToPrint = document.getElementById('content');
      var popupWin = window.open();
      popupWin.document.open();
      popupWin.document.write('<html><body onload="window.print()">' + divToPrint.innerHTML + '</html>');
      popupWin.document.close();
  }




  openSm(changeQuantity, obj){
    this.obj = obj
    console.log(obj)
    this.modalService.open(changeQuantity, { size: 'sm' });
  }

  editQuantity(){
  this.carts.forEach(element => {
    if(element._id == this.obj._id){
      element.quantity = this.newQuantity
    }
  });
  this.modalService.dismissAll();
  console.log(this.obj);
  this.newQuantity = ''
}
delete(index){
  if(confirm("Are you sure you want to delete this item?")){
    this.carts.splice(index, 1)
  }
}
Category(){
  this.spinner.show()
   this.productService.GetOnly(this.lang).
            then( responsedata => { this.products = responsedata.data;
               setTimeout(() => {
                this.spinner.hide();
              }, this.products);
           }
           )
}
  selectHandler(val) {
    this.selection.toggle(val);
    if (this.list.includes(val._id)) {
      let index = this.list.indexOf(val._id);
      this.list.splice(index, 1);
    } else {
      this.list.push(val._id);
    }
    console.log(this.list);
  }
  newRow(){
    this.products.forEach(element => {
      if(element._id == this.productId){
        console.log(element)
        this.carts.push({product:{image: element.image, name:element.name,price:element.price,priceAfterDiscount:element.priceAfterDiscount,_id:element._id},productId:element._id,quantity:this.quantity})
      }
    });
  }
  }
