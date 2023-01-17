import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CityService } from './city.service';

@Component({
  selector: 'ms-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss']
})
export class CityComponent implements OnInit {

  cities:any= [];
  dataSource: MatTableDataSource<unknown>;
  displayedColumns: string[] = ['select','count', 'name' , 'shippingFees' ,'createdAt', 'updatedAt', 'action'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  selection = new SelectionModel<unknown>(true, []);
  tries: any;
  list: any = [];
  name;
  categoryDropdwn: any;
  typeDetect: string = "products"
  cityId: string;
  status: string;
  type: string;
  tempStatus;
  tempType;
  AdminRole = JSON.parse(localStorage.getItem("adminRole"));
 lang = JSON.parse(localStorage.getItem('language'))
  constructor(
    public cityService: CityService,
    private spinner: NgxSpinnerService,
    private toastr : ToastrService,
    private router: Router) {
    }

  ngOnInit(): void {
    console.log('html = '+ JSON.parse(localStorage.getItem('language')))
  this.City()
  }
  City(){
    this.spinner.show()
     this.cityService.Get(this.lang).
              then( responsedistrictdata => { this.cities = responsedistrictdata.data;
                // this.categoryDropdwn = responsedistrictdata.data
                 this.dataSource = new MatTableDataSource(responsedistrictdata.data);
                 this.dataSource.paginator = this.paginator;
                 console.log(this.dataSource.paginator)
                 setTimeout(() => {
                  this.spinner.hide();
                }, this.cities);
             }
             )
  }
  editRow(element) {
    let id = element._id
    this.router.navigate([`dashboard/addcity/` + id])
    }
    
  Active(element){
    this.cityService.Activation(element._id).
    then( responseAds => { this.tries = responseAds;
      this.type = undefined;
      this.status = undefined
      this.City();
      this.selection.clear();
      this.list.length = 0;
  });
}
  Filter(value){
    if(this.status != undefined || this.name != undefined){
    this.spinner.show()
      this.cityService.GetFilter(value).
      then( responsedistrictfilter => { this.cities = responsedistrictfilter.data;
         this.dataSource = new MatTableDataSource(responsedistrictfilter.data);
         this.dataSource.paginator = this.paginator;
         setTimeout(() => {
          this.spinner.hide();
        }, this.cities);
      });
    }else{
      this.toastr.error("nothing to search for")
    }

 }
 action(){
   this.status = undefined;
   this.name = undefined
   this.City()
  //  if(this.subcityId != undefined){
  //   subCategory(element)    
  //  }
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
  this.cities.forEach(element => {
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
}
