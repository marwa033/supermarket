import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { SubCategoriesService } from './sub-categories.service';

@Component({
  selector: 'ms-sub-categories',
  templateUrl: './sub-categories.component.html',
  styleUrls: ['./sub-categories.component.scss']
})
export class SubCategoriesComponent implements OnInit {

  sub:any= [];
  dataSource: MatTableDataSource<unknown>;
  displayedColumns: string[] = ['count' ,'name' , 'category' ,'createdAt', 'updatedAt', 'action'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  tries: any;
  featured;
  categoryId: string;
  status: string;
  type: string;
 lang = JSON.parse(localStorage.getItem('language'))
  constructor(
    public subService: SubCategoriesService,
    private spinner: NgxSpinnerService,
    private toastr : ToastrService,
    private router: Router) {
    }

  ngOnInit(): void {
    console.log('html = '+ JSON.parse(localStorage.getItem('language')))
  this.Get()
  }
  Get(){
    this.spinner.show()
     this.subService.Get(this.lang).
              then( responseData => { this.sub = responseData.data;
                // this.categoryDropdwn = responseData.data
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
    this.subService.Activation(element).
    then( responseAds => { this.tries = responseAds;
      this.type = undefined;
      this.status = undefined
      this.Get()
  });
}
  filter(value){
    if(this.status != undefined || this.featured != undefined){
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
 action(){
   this.status = undefined;
   this.Get()
  //  if(this.subCategoryId != undefined){
  //   subCategory(element)    
  //  }
 }
}
