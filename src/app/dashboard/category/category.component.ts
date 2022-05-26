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
  displayedColumns: string[] = ['count', 'image' ,'name' , 'featured' ,'createdAt', 'updatedAt', 'action'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  tries: any;
  featured;
  categoryDropdwn: any;
  typeDetect: string = "products"
  categoryId: string;
  status: string;
  type: string;
  tempStatus;
  tempType;
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
    this.categoryService.categoryActivation(element).
    then( responseAds => { this.tries = responseAds;
      this.type = undefined;
      this.status = undefined
      this.Category()
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
   this.Category()
  //  if(this.subCategoryId != undefined){
  //   subCategory(element)    
  //  }
 }
}
