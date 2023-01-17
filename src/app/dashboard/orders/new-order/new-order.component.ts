import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from 'app/dashboard/clients/client.service';
import { ProductsService } from 'app/dashboard/products/products.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { OrderService } from '../order.service';

@Component({
  selector: 'ms-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.scss']
})
export class NewOrderComponent implements OnInit {

  AdminRole = JSON.parse(localStorage.getItem("adminRole"));
  updateFlag: boolean = false;
  id;
  quantity;
  enname;
  addUpdate;
  lang = JSON.parse(localStorage.getItem('language'))
  products;
  state;
  productId;
  clients;
  clientId;
  constructor(
    private route: ActivatedRoute,
    public clientService: ClientService,
    public productService: ProductsService,
              private spinner: NgxSpinnerService,
              private orderService: OrderService ) { }

  ngOnInit(): void {
    this.Products();
    this.Clients();
  }
  
Add(value){
//   this.spinner.show()
//   console.log(this.updateFlag)
//   this.orderService.Add(value).
//       then( response => { this.addUpdate = response;
//        });
//      setTimeout(() => {
//       this.spinner.hide();
//     }, this.addUpdate);
 
  }
  Clients(){
    this.spinner.show()
     this.clientService.Get().
              then( responsedistrictdata => { this.clients = responsedistrictdata.data;
                 setTimeout(() => {
                  this.spinner.hide();
                }, this.clients);
             }
             )
          }

  Products(){
    this.spinner.show()
     this.productService.GetOnly(this.lang).
              then( responsedata => { this.products = responsedata.data;
                 setTimeout(() => {
                  this.spinner.hide();
                }, this.products);
             }
             )
  }
}