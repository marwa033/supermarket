import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../category/Category.service';
import { SubCategoriesService } from './sub-categories.service';

@Component({
  selector: 'ms-sub-categories',
  templateUrl: './sub-categories.component.html',
  styleUrls: ['./sub-categories.component.scss']
})
export class SubCategoriesComponent implements OnInit {

  sub:any= [];
  dataSource: MatTableDataSource<unknown>;
  displayedColumns: string[] = ['select','count' ,'name' , 'category' ,'createdAt', 'updatedAt', 'action'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  selection = new SelectionModel<unknown>(true, []);
  tries: any;
  list: any = [];
  name;
  categoryId: string;
  status: string;
  categories;
  type: string;
 lang = JSON.parse(localStorage.getItem('language'))
 AdminRole = JSON.parse(localStorage.getItem("adminRole"));
  constructor(
    public subService: SubCategoriesService,
    private spinner: NgxSpinnerService,
    private categoryService: CategoryService,
    private toastr : ToastrService,
    private router: Router) {
    }

  ngOnInit(): void {
    console.log('html = '+ JSON.parse(localStorage.getItem('language')))
  this.Get()
  this.Category()
  }
  Get(){
    this.spinner.show()
     this.subService.Get(this.lang).
              then( responseData => { this.sub = responseData.data;
                 this.dataSource = new MatTableDataSource(responseData.data);
                 this.dataSource.paginator = this.paginator;
                 setTimeout(() => {
                  this.spinner.hide();
                }, this.sub);
             }
             )
  }
  
  editRow(element) {
    let id = element._id
    this.router.navigate([`dashboard/addsub/` + id])
    }
    
  Active(element){
    if(this.list.length == 0){
      this.list.push(element._id)
    }
    this.subService.Activation(this.list).
    then( responseAds => { this.tries = responseAds;
      this.type = undefined;
      this.status = undefined
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
  this.sub.forEach(element => {
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
    if(this.status != undefined || this.name != undefined || this.categoryId != undefined){
    this.spinner.show()
      this.subService.GetFilter(value).
      then( responseData => { this.sub = responseData.data;
         this.dataSource = new MatTableDataSource(responseData.data);
         this.dataSource.paginator = this.paginator;
         setTimeout(() => {
          this.spinner.hide();
        }, this.sub);
      });
    }else{
      this.toastr.error("nothing to search for")
    }

 }
 
 Category(){
  this.spinner.show()
   this.categoryService.GetCategories(this.lang).
            then( responsedata => { this.categories = responsedata.data;
               setTimeout(() => {
                this.spinner.hide();
              }, this.categories);
           }
           )
}
 action(){
   this.status = undefined;
   this.name = '';
   this.categoryId=undefined
   this.Get()
  //  if(this.subCategoryId != undefined){
  //   subCategory(element)    
  //  }
 }
}
