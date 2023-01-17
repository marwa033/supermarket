import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from './Category.service';

@Component({
  selector: 'ms-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  categories:any= [];
  dataSource: MatTableDataSource<unknown>;
  displayedColumns: string[] = ['select','count', 'image' ,'name' , 'featured' ,'createdAt', 'updatedAt', 'action'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  selection = new SelectionModel<unknown>(true, []);
  tries: any;
  list: any = [];
  featured;
  categoryDropdwn: any;
  typeDetect: string = "products"
  categoryId: string;
  status: string;
  type: string;
  tempStatus;
  tempType;
  AdminRole = JSON.parse(localStorage.getItem("adminRole"));
 lang = JSON.parse(localStorage.getItem('language'))
  constructor(
    public categoryService: CategoryService,
    private spinner: NgxSpinnerService,
    private toastr : ToastrService,
    private router: Router) {
    }

  ngOnInit(): void {
    console.log('html = '+ JSON.parse(localStorage.getItem('language')))
  this.Category()
  }
  Category(){
    this.spinner.show()
     this.categoryService.GetCategories(this.lang).
              then( responsedistrictdata => { this.categories = responsedistrictdata.data;
                // this.categoryDropdwn = responsedistrictdata.data
                 this.dataSource = new MatTableDataSource(responsedistrictdata.data);
                 this.dataSource.paginator = this.paginator;
                 console.log(this.dataSource.paginator)
                 setTimeout(() => {
                  this.spinner.hide();
                }, this.categories);
             }
             )
  }
  editRow(element) {
    let id = element._id
    this.router.navigate([`dashboard/addcategory/` + id])
    }
    
  Active(element){
    if(this.list.length == 0){
      this.list.push(element._id)
    }
    this.categoryService.categoryActivation(this.list).
    then( responseAds => { this.tries = responseAds;
      this.type = undefined;
      this.status = undefined
      this.Category();
      this.selection.clear();
      this.list.length = 0;
  });
}
  FilterCategory(value){
    if(this.status != undefined || this.featured != undefined){
    this.spinner.show()
      this.categoryService.GetFilterCategory(value).
      then( responsedistrictfilter => { this.categories = responsedistrictfilter.data;
         this.dataSource = new MatTableDataSource(responsedistrictfilter.data);
         this.dataSource.paginator = this.paginator;
         setTimeout(() => {
          this.spinner.hide();
        }, this.categories);
      });
    }else{
      this.toastr.error("nothing to search for")
    }

 }
 action(){
   this.status = undefined;
   this.featured = undefined
   this.Category()
  //  if(this.subCategoryId != undefined){
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
  this.categories.forEach(element => {
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
