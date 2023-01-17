import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { PromocodeService } from './promocode.service';

@Component({
  selector: 'ms-promocodes',
  templateUrl: './promocodes.component.html',
  styleUrls: ['./promocodes.component.scss']
})
export class PromocodesComponent implements OnInit {

  promo:any= [];
  dataSource: MatTableDataSource<unknown>;
  displayedColumns: string[] = ['select','count','code' ,'daysPeriod','amount','for'  ,'createdAt', 'updatedAt', 'action'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  selection = new SelectionModel<unknown>(true, []);
  tries: any;
  list: any = [];
  status: string;
 lang = JSON.parse(localStorage.getItem('language'))
 AdminRole = JSON.parse(localStorage.getItem("adminRole"));
  constructor(
    public promoService: PromocodeService,
    private spinner: NgxSpinnerService,
    private toastr : ToastrService,
    private router: Router) {
    }

  ngOnInit(): void {
  this.Get()
  }
  Get(){
    this.spinner.show()
     this.promoService.Get(this.lang).
              then( responseDate => { this.promo = responseDate.data;
                // this.categoryDropdwn = responseDate.data
                 this.dataSource = new MatTableDataSource(responseDate.data);
                 this.dataSource.paginator = this.paginator;
                 setTimeout(() => {
                  this.spinner.hide();
                }, this.promo);
             }
             )
  }
  editRow(element) {
    let id = element._id
    this.router.navigate([`dashboard/addpromo/` + id])
    }
    
  Active(element){
    if(this.list.length == 0){
      this.list.push(element._id)
    }
    this.promoService.Activation(this.list).
    then( responsedata => { this.tries = responsedata;
      this.Get();
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
  this.promo.forEach(element => {
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
  filter(value){
    if(this.status != undefined){
    this.spinner.show()
      this.promoService.GetFilter(value).
      then( responsefilter => { this.promo = responsefilter.data;
         this.dataSource = new MatTableDataSource(responsefilter.data);
         this.dataSource.paginator = this.paginator;
         setTimeout(() => {
          this.spinner.hide();
        }, this.promo);
      });
    }else{
      this.toastr.error("nothing to search for")
    }

 }
 action(){
   this.status = undefined;
   this.Get()
  //  if(this.subCategoryId != undefined){
  //   subCategory(element)    
  //  }
 }
}
