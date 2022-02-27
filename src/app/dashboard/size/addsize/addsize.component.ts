import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SizeService } from '../size.service';

@Component({
  selector: 'ms-addsize',
  templateUrl: './addsize.component.html',
  styleUrls: ['./addsize.component.scss']
})
export class AddsizeComponent implements OnInit {

  updateFlag: boolean = false;
  size;
  id;
  sizename;
  sizeresults;
  
  constructor(private route: ActivatedRoute,
              private spinner: NgxSpinnerService,
              private SizeService: SizeService) { }

              ngOnInit(): void {
                this.route.params.subscribe(params => {
                  this.id = params.id
                  if(this.id != undefined){
                    this.updateFlag = true
                    this.spinner.show()
                  }
                  this.SizeService.GetSizeId(this.id).
                  then( response => { this.size = response;
                    setTimeout(() => {
                      this.spinner.hide();
                    }, this.size);
                    this.sizename = this.size.name
                  });
                })
              }
              
            Add(value){
              this.spinner.show()
              console.log(this.updateFlag)
              if(this.updateFlag === false){
              this.SizeService.Add(value).
                  then( response => { this.sizeresults = response;
                   });
                  }else{
                    this.SizeService.Update(value,this.id).
                       then( response => { this.sizeresults = response;
                         });
                 }
                 setTimeout(() => {
                  this.spinner.hide();
                }, this.sizeresults);
            
            } 

}
