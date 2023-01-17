import { SelectionModel } from '@angular/cdk/collections';
import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ClientService } from '../clients/client.service';
import { OrderService } from './order.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'ms-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  @ViewChild('TABLE', {static: false}) table: ElementRef;

  orders:any= [];
  AdminRole = JSON.parse(localStorage.getItem("adminRole"));
  from;
  newOrders;
  to;
  orderId;
  clientName;
  dataSource: MatTableDataSource<unknown>;
  displayedColumns: string[] = ['select','count', 'orderId' ,'state', 'price',  'paymentMethod','date', 'action'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  selection = new SelectionModel<unknown>(true, []);
  list: any = [];
  tries;
  status: string;
 lang = JSON.parse(localStorage.getItem('language'))
  clients: any;
  paymentMethod;
  client;
  clientId: any;
  clientPhone;
  convertedDate
  constructor(
    public orderService: OrderService,
    public clientService: ClientService,
    private spinner: NgxSpinnerService,
    private toastr : ToastrService,
    private router: Router) {
    }

  ngOnInit(): void {
  this.Get()
  this.Clients()
  }
  Get(){
    this.spinner.show()
     this.orderService.Get(this.lang).
              then( responseDate => { this.orders = responseDate.data;
                this.newOrders = responseDate.data
                 this.dataSource = new MatTableDataSource(responseDate.data);
                 this.dataSource.paginator = this.paginator;
                 setTimeout(() => {
                  this.spinner.hide();
                }, this.orders);
this.orders.forEach(element => {
  console.log(element.date)
  element.date = new Date(element.date.toLocaleDateString('en-US'))
  this.convertedDate = element.date.toLocaleDateString('en-US')
console.log(element.date.toLocaleDateString('en-US'))
});
             }
             
             )
  }


  ExportTOExcel()
  {
    let element = document.getElementById('table')
    const workSheet: XLSX.WorkSheet=XLSX.utils.table_to_sheet(element);
    const workBook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, 'Sheet1'); 
    /* save to file */
    XLSX.writeFile(workBook, 'Orders.xlsx');
    
  }




  editRow(element) {
    let id = element._id
    this.router.navigate([`dashboard/addorder/` + id])
    }
    
  Clients(){
     this.clientService.Get().
              then( clientResponse => { this.clients = clientResponse.data;
                 setTimeout(() => {
                  this.spinner.hide();
                }, this.clients);
             }
             )
            }
  Active(element,state){
    if(this.list.length == 0){
      this.list.push(element._id)
    }
    this.orderService.Activation(this.list,state).
    then( responseorders => { this.tries = responseorders;
      this.status = undefined
      this.Get()
      this.selection.clear();
      this.list.length = 0
  });
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

isAllSelected() {
  const numSelected = this.selection.selected.length;
  const numRows = this.dataSource.data.length;
  return numSelected === numRows;
}
clearSelection(){
  this.selection.clear();
  this.list.length = 0
  console.log(this.list)
}
selectAll(){
  this.list.length = 0;
  this.dataSource.data.forEach(row => this.selection.select(row));
  this.orders.forEach(element => {
    this.list.push(element._id)
  });
  console.log(this.list)
}
/** Selects all rows if they are not all selected; otherwise clear selection. */
masterToggle() {
  this.isAllSelected() ? 
  this.clearSelection() :
  this.selectAll()
}
cancelRow(element){
  if(confirm('Are you sure you want to delete this row ?')){
    if(this.list.length == 0){
      this.list.push(element._id)
    }
  this.orderService.Cancel(this.list).
  then( responseorders => { this.tries = responseorders;
    this.Get()
    this.selection.clear();
    this.list.length = 0
});
}else{

}
}
  filter(value){
    value.from = new DatePipe('en-Us').transform(value.from, 'MM/dd/yyyy');
    value.to = new DatePipe('en-Us').transform(value.to, 'MM/dd/yyyy');
    if(this.status != undefined || this.to != undefined || this.from != undefined
      || this.paymentMethod != undefined || this.clientId != undefined || this.orderId != undefined
      || this.clientName != undefined || this.clientPhone != undefined){
    this.spinner.show()
      this.orderService.GetFilter(value).
      then( responsefilter => { this.orders = responsefilter.data;
         this.dataSource = new MatTableDataSource(responsefilter.data);
         this.dataSource.paginator = this.paginator;
         setTimeout(() => {
          this.spinner.hide();
        }, this.orders);

        this.orders.forEach(element => {
          console.log(element.date)
          element.date = new Date(element.date.toLocaleDateString('en-US'))
          this.convertedDate = element.date.toLocaleDateString('en-US')
        console.log(element.date.toLocaleDateString('en-US'))
        });
      });
   
    }else{
      this.toastr.error("nothing to search for")
    }

 }
 action(){
   this.status = undefined;
   this.from = undefined
   this.to = undefined;
   this.paymentMethod = undefined;
   this.clientId = undefined
   this.orderId = undefined
   this.clientName = undefined
   this.clientPhone = undefined
   this.Get()
  //  if(this.subCategoryId != undefined){
  //   subCategory(element)    
  //  }
 }
}
