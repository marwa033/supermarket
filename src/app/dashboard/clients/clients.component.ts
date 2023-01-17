import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ClientService } from './client.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'ms-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  dataSource: MatTableDataSource<unknown>;
  displayedColumns: string[] = ['count', 'name', 'number', 'email', 'phone' ,'wallet',  'createdAt', 'updatedAt','action'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  tries: any;
  AdminRole = JSON.parse(localStorage.getItem("adminRole"));
  districtsDropdwn: any;
  status: any;
  districtId: string;
  name: string;
  clients: any;
  wallet;
  id;
  clientPhone;
  clientName;
  from;
  to;
 
  constructor(
    public clientService: ClientService,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal,
    private toastr : ToastrService,
    private router: Router) {
    }

  ngOnInit(): void {
  this.Clients()
  }
  Clients(){
    if(this.AdminRole != 'editor'){
    this.spinner.show()
     this.clientService.Get().
              then( responsedistrictdata => { this.clients = responsedistrictdata.data;
                 this.dataSource = new MatTableDataSource(responsedistrictdata.data);
                 console.log(this.dataSource)
                 this.dataSource.paginator = this.paginator;
                 console.log(this.dataSource.paginator)
                 setTimeout(() => {
                  this.spinner.hide();
                }, this.clients);
             }
             )
            }
          }
  // editRow(element) {
  //   let id = element._id
  //   this.router.navigate([`dashboard/adddistrict/` + id])
  //   }
    
  ExportTOExcel()
  {
    let element = document.getElementById('table')
    const workSheet: XLSX.WorkSheet=XLSX.utils.table_to_sheet(element);
    const workBook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, 'Sheet1'); 
    /* save to file */
    XLSX.writeFile(workBook, 'Clients.xlsx');
    
  }
  Wallet(){
    this.clientService.changeWallet(this.wallet,this.id).
    then( responseAds => { this.tries = responseAds;
      this.Clients();
      this.modalService.dismissAll();
      this.wallet ='';
  });
}
  Filter(value){
    value.from = new DatePipe('en-Us').transform(value.from, 'MM/dd/yyyy');
    value.to = new DatePipe('en-Us').transform(value.to, 'MM/dd/yyyy');
    if(value.from != undefined || value.to != undefined || value.clientName != undefined || value.clientPhone != undefined){
    this.spinner.show()
      this.clientService.GetFilter(value).
      then( responsedistrictfilter => { this.clients = responsedistrictfilter.data;
         this.dataSource = new MatTableDataSource(responsedistrictfilter.data);
         this.dataSource.paginator = this.paginator;
         setTimeout(() => {
          this.spinner.hide();
        }, this.clients);
      });
    }else{
      this.toastr.error("nothing to search for")
    }
 }
 action(){
   this.clientName = undefined;
   this.clientPhone = undefined;
   this.to = undefined;
   this.from = undefined;
   this.Clients()
 }
 openSm(changeWallet,element){
  this.id = element._id
  this.modalService.open(changeWallet, { size: 'sm' });
}
}
