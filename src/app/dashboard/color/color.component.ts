import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ColorService } from './color.service';

@Component({
  selector: 'ms-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.scss']
})
export class ColorComponent implements OnInit {

  categories:any= [];
  dataSource: MatTableDataSource<unknown>;
  displayedColumns: string[] = ['count', 'image' ,'name' , 'color' ,  'createdAt', 'updatedAt', 'action'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  tries: any;
  ColorsDropdwn: any;
  typeDetect: string = "products"
  ColorsId: string;
  status: string;
  type: string;
  tempStatus;
  tempType;
  subColorsId;
 
  constructor(
    public colorService: ColorService,
    private spinner: NgxSpinnerService,
    private toastr : ToastrService,
    private router: Router) {
    }

  ngOnInit(): void {
  this.Colors()
  this.getColors()
  }
  onChangeState(event){
    if(event){
    this.tempStatus = event
    }else{
      this.tempStatus = undefined
    } 
  }
  closeState($event){
    $event.stopPropagation()
    this.status = undefined
  }
  Colors(){
    let type = "service"
    this.spinner.show()
     this.colorService.GetColor().
              then( responsedistrictdata => { this.categories = responsedistrictdata.data;
                // this.ColorsDropdwn = responsedistrictdata.data
                 this.dataSource = new MatTableDataSource(responsedistrictdata.data);
                 this.dataSource.paginator = this.paginator;
                 setTimeout(() => {
                  this.spinner.hide();
                }, this.categories);
             }
             )
            }
   getColors(){
     this.colorService.GetColor().
     then( responsedata => { 
     this.ColorsDropdwn = responsedata.data;
          });
  } 
  editRow(element) {
    let id = element._id
    this.router.navigate([`dashboard/addcolor/` + id])
    }
    
  Active(element){
    this.colorService.colorActivation(element).
    then( responseAds => { this.tries = responseAds;
      this.type = undefined;
      this.status = undefined
      this.Colors()
  });
}
  FilterColor(value){
    if(this.status != undefined ){
    this.spinner.show()
      this.colorService.GetFilterColor(value).
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
   this.Colors()
 }
}
