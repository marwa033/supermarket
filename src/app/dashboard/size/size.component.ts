import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { SizeService } from './size.service';

@Component({
  selector: 'ms-size',
  templateUrl: './size.component.html',
  styleUrls: ['./size.component.scss']
})
export class SizeComponent implements OnInit {

  sizes:any= [];
  dataSource: MatTableDataSource<unknown>;
  displayedColumns: string[] = ['count' ,'name' ,  'createdAt', 'updatedAt', 'action'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  tries: any;
  ColorsDropdwn: any;
  status: string;
  tempStatus;
 
  constructor(
    public sizeService: SizeService,
    private spinner: NgxSpinnerService,
    private toastr : ToastrService,
    private router: Router) {
    }

  ngOnInit(): void {
  this.Sizes()
  }
  Sizes(){
    this.spinner.show()
     this.sizeService.GetSize().
              then( responsedistrictdata => { this.sizes = responsedistrictdata.data;
                // this.ColorsDropdwn = responsedistrictdata.data
                 this.dataSource = new MatTableDataSource(responsedistrictdata.data);
                 this.dataSource.paginator = this.paginator;
                 setTimeout(() => {
                  this.spinner.hide();
                }, this.sizes);
             }
             )
            
  } 
  editRow(element) {
    let id = element._id
    this.router.navigate([`dashboard/addsize/` + id])
    }
    
  Active(element){
    this.sizeService.sizeActivation(element).
    then( responseAds => { this.tries = responseAds;
      this.status = undefined
      this.Sizes()
  });
}
FilterSize(value){
    if(this.status != undefined ){
    this.spinner.show()
      this.sizeService.GetFilterSize(value).
      then( responsedistrictfilter => { this.sizes = responsedistrictfilter.data;
         this.dataSource = new MatTableDataSource(responsedistrictfilter.data);
         this.dataSource.paginator = this.paginator;
         setTimeout(() => {
          this.spinner.hide();
        }, this.sizes);
      });
    }else{
      this.toastr.error("nothing to search for")
    }

 }
 action(){
   this.status = undefined;
   this.Sizes()
 }
}
