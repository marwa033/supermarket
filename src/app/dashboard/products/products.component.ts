import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ProductsService } from './products.service';

@Component({
  selector: 'ms-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  product:any= [];
  dataSource: MatTableDataSource<unknown>;
  displayedColumns: string[] = ['count', 'image' ,'price','discount','subCategory','featured'  ,'createdAt', 'updatedAt', 'action'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  tries;
  status: string;
 lang = JSON.parse(localStorage.getItem('language'))
  constructor(
    public productService: ProductsService,
    private spinner: NgxSpinnerService,
    private toastr : ToastrService,
    private router: Router) {
    }

  ngOnInit(): void {
  this.Get()
  }
  Get(){
    this.spinner.show()
     this.productService.Get(this.lang).
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
    this.productService.Activation(element).
    then( responsedata => { this.tries = responsedata;
      this.status = undefined
      this.Get()
  });
}
  Filter(value){
    if(this.status != undefined){
    this.spinner.show()
      this.productService.GetFilter(value).
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
   this.Get()
 }
}
