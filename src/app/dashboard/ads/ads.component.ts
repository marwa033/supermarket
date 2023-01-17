import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AdsService } from './ads.service';

@Component({
  selector: 'ms-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.scss']
})
export class AdsComponent implements OnInit {

  ads:any= [];
  dataSource: MatTableDataSource<unknown>;
  displayedColumns: string[] = ['select','count', 'image' ,'url'  ,'createdAt', 'updatedAt', 'action'];
  selection = new SelectionModel<unknown>(true, []);
  list: any = [];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  tries;
  status: string;
 lang = JSON.parse(localStorage.getItem('language'));
 AdminRole = JSON.parse(localStorage.getItem("adminRole"));
  constructor(
    public adsService: AdsService,
    private spinner: NgxSpinnerService,
    private toastr : ToastrService,
    private router: Router) {
    }

  ngOnInit(): void {
  this.Ads();
  console.log(this.AdminRole)
  }
  Ads(){
    this.spinner.show()
     this.adsService.Get(this.lang).
              then( responseDate => { this.ads = responseDate.data;
                // this.categoryDropdwn = responseDate.data
                 this.dataSource = new MatTableDataSource(responseDate.data);
                 this.dataSource.paginator = this.paginator;
                 setTimeout(() => {
                  this.spinner.hide();
                }, this.ads);
             }
             )
  }
  editRow(element) {
    let id = element._id
    this.router.navigate([`dashboard/addads/` + id])
    }
    
  Active(element){
    if(this.list.length == 0){
      this.list.push(element._id)
    }
    this.adsService.Activation(this.list).
    then( responseAds => { this.tries = responseAds;
      this.status = undefined
      this.Ads()
      this.selection.clear();
      this.list.length = 0;
  });
}
  filter(value){
    if(this.status != undefined){
    this.spinner.show()
      this.adsService.GetFilter(value).
      then( responsedistrictfilter => { this.ads = responsedistrictfilter.data;
         this.dataSource = new MatTableDataSource(responsedistrictfilter.data);
         this.dataSource.paginator = this.paginator;
         setTimeout(() => {
          this.spinner.hide();
        }, this.ads);
      });
    }else{
      this.toastr.error("nothing to search for")
    }

 }
 
 delete(element){
  if(this.list.length == 0){
    this.list.push(element._id)
  }
  var yes = confirm("Are you sure you want to delete?");
  if(yes === true){
    this.adsService.Delete(this.list).
    then( responseAds => { this.ads = responseAds;
      this.Ads()
    });
  }else{

  }
  this.selection.clear();
  this.list.length = 0;
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
  this.ads.forEach(element => {
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
 action(){
   this.status = undefined;
   this.Ads()
 }
}
