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
  displayedColumns: string[] = ['count', 'image' ,'url'  ,'createdAt', 'updatedAt', 'action'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  tries;
  status: string;
 lang = JSON.parse(localStorage.getItem('language'))
  constructor(
    public adsService: AdsService,
    private spinner: NgxSpinnerService,
    private toastr : ToastrService,
    private router: Router) {
    }

  ngOnInit(): void {
  this.Ads()
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
    this.adsService.Activation(element).
    then( responseAds => { this.tries = responseAds;
      this.status = undefined
      this.Ads()
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
 action(){
   this.status = undefined;
   this.Ads()
  //  if(this.subCategoryId != undefined){
  //   subCategory(element)    
  //  }
 }
}
