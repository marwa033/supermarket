import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AdminsService } from './admins.service';

@Component({
  selector: 'ms-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.scss']
})
export class AdminsComponent implements OnInit {
  
  dataSource: MatTableDataSource<unknown>;
  displayedColumns: string[] = ['select','count', 'name' , 'role'  ,  'createdAt', 'updatedAt', 'action'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  selection = new SelectionModel<unknown>(true, []);
  list: any = [];
  tries: any;
  status: any;
  admins:any;
  name: string;
  role = JSON.parse(localStorage.getItem("adminRole"));
  lang = JSON.parse(localStorage.getItem('language'))
 
  constructor(
    public adminService: AdminsService,
    private spinner: NgxSpinnerService,
    private toastr : ToastrService,
    private router: Router) {
    }

  ngOnInit(): void {
  this.Admins()
  }
  Admins(){
    this.spinner.show()
     this.adminService.Get(this.lang).
              then( responsedistrictdata => { this.admins = responsedistrictdata.data;
                 this.dataSource = new MatTableDataSource(responsedistrictdata.data);
                 this.dataSource.paginator = this.paginator;
                 setTimeout(() => {
                  this.spinner.hide();
                }, this.admins);
             }
             )
            }
  editRow(element) {
    let id = element._id
    this.router.navigate([`dashboard/addadmin/` + id])
    }
    Active(element){
      if(this.list.length == 0){
        this.list.push(element.userId)
      }
      this.spinner.show()
      this.adminService.Activation(this.list).
      then( responseAds => { this.tries = responseAds;
        this.Admins();
        this.selection.clear();
        this.list.length = 0
       });
    }
    delete(element){
      if(this.list.length == 0){
        this.list.push(element._id)
      }
      var yes = confirm("Are you sure you want to delete?");
      if(yes === true){
        this.adminService.Delete(this.list).
        then( responseAds => { this.tries = responseAds;
          this.Admins()
          this.selection.clear();
          this.list.length = 0
        });
      }else{

      }
}
selectHandler(val) {
  this.selection.toggle(val);
  if (this.list.includes(val.userId)) {
    let index = this.list.indexOf(val.userId);
    this.list.splice(index, 1);
  } else {
    this.list.push(val.userId);
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
  this.admins.forEach(element => {
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
  if(this.status != undefined){
    this.spinner.show()
      this.adminService.GetFilter(value).
      then( responsedata => { this.admins = responsedata.data;
         this.dataSource = new MatTableDataSource(responsedata.data);
         this.dataSource.paginator = this.paginator;
         setTimeout(() => {
          this.spinner.hide();
        }, this.admins);
      });
    }else{
      this.toastr.error("nothing to search for")
    }

}

action(){
  this.status = undefined;
  this.Admins()
}
}
