import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../category/Category.service';
import { SubCategoriesService } from '../sub-categories/sub-categories.service';
import { ProductsService } from './products.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'ms-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  product:any= [];
  categoryId;
  subId;
  featured;
  name;
  categories;
  subcategories;
  dataSource: MatTableDataSource<unknown>;
  displayedColumns: string[] = ['select','count', 'image', 'name' ,'price','discount','subCategory','featured','inventory' ,'createdAt', 'updatedAt', 'action'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  selection = new SelectionModel<unknown>(true, []);
  list: any = [];
  tries;
  status: string;
 lang = JSON.parse(localStorage.getItem('language'))
 AdminRole = JSON.parse(localStorage.getItem("adminRole"));
 sort : boolean = false ;
 valueSort = undefined;
  constructor(
    public productService: ProductsService,
    private spinner: NgxSpinnerService,
    private categoryService: CategoryService,
    private subService: SubCategoriesService,
    private toastr : ToastrService,
    private router: Router) {
    }

  ngOnInit(): void {
  this.Get()
  this.Category()
  this.GetSub()
  
  }
  sortinventory(){
    if(this.sort == false){
      this.sort = true
      this.valueSort = 0;
      console.log(this.valueSort)
      const input = document.getElementById('myCheck') as HTMLInputElement | null;
     input.checked = true;
    }else{
      this.sort = false;
      console.log(this.valueSort)
      const input = document.getElementById('myCheck') as HTMLInputElement | null;
     input.checked = false;
    }
    console.log(this.sort)
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
  GetSub(){
    this.spinner.show()
     this.subService.Get(this.lang).
              then( responseData => { this.subcategories = responseData.data;
                 setTimeout(() => {
                  this.spinner.hide();
                }, this.subcategories);
             }
             )
  }
  Get(){
    this.spinner.show()
     this.productService.Get(this.lang,this.sort).
              then( responseDate => { this.product = responseDate.data;
                // this.categoryDropdwn = responseDate.data
                 this.dataSource = new MatTableDataSource(responseDate.data);
                 this.dataSource.paginator = this.paginator;
                 setTimeout(() => {
                  this.spinner.hide();
                }, this.product);
             }
             )
  }
  editRow(element) {
    let id = element._id
    this.router.navigate([`dashboard/addproduct/` + id])
    }
    
  Active(element){
    if(this.list.length == 0){
      this.list.push(element._id)
    }
    this.productService.Activation(this.list).
    then( responsedata => { this.tries = responsedata;
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
ExportTOExcel()
{
  let element = document.getElementById('table')
  const workSheet: XLSX.WorkSheet=XLSX.utils.table_to_sheet(element);
  const workBook: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workBook, workSheet, 'Sheet1'); 
  /* save to file */
  XLSX.writeFile(workBook, 'Products.xlsx');
  
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
  this.product.forEach(element => {
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
  Filter(value){
    if(this.status != undefined || this.name != undefined|| this.subId != undefined || 
      this.categoryId != undefined || this.featured != undefined || this.valueSort != undefined)  
    {this.spinner.show()
      this.productService.GetFilter(value,this.sort).
      then( responsefilter => { this.product = responsefilter.data;
         this.dataSource = new MatTableDataSource(responsefilter.data);
         this.dataSource.paginator = this.paginator;
         setTimeout(() => {
          this.spinner.hide();
        }, this.product);
      });
    }else{
      this.toastr.error("nothing to search for")
    }

 }
 action(){
   this.status = undefined;
   this.subId = undefined;
   this.name = undefined;
   this.categoryId = undefined;
   this.featured = undefined;
   this.sort = false;
   this.valueSort = undefined;
   const input = document.getElementById('myCheck') as HTMLInputElement | null;
  input.checked = false;
   this.Get()
 }
}
