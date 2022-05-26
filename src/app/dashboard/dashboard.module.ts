import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import {MatIconModule} from '@angular/material/icon';
import {
			MatButtonModule,
			MatTabsModule,
			MatCardModule,
			MatMenuModule,
			MatCheckboxModule,
			MatDividerModule,
			MatProgressBarModule,
         MatInputModule,      
			MatFormFieldModule,
			MatTableModule,
			MatListModule, 
			MatPaginatorModule,
			MatChipsModule,
			MatSortModule,
			MatSelectModule,
			MatDialogModule,
			MAT_DIALOG_DEFAULT_OPTIONS} from '@angular/material';
			import { GridModule, PageService, SortService, FilterService, GroupService } from '@syncfusion/ej2-angular-grids';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
// import { MAT_COLOR_FORMATS, NgxMatColorPickerModule, NGX_MAT_COLOR_FORMATS } from '@angular-material-components/color-picker';
import {MatExpansionModule} from '@angular/material/expansion';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { ChartsModule } from 'ng2-charts';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AgmCoreModule } from '@agm/core';
import { EasyPieChartModule } from 'ng2modules-easypiechart';
import { TranslateModule } from '@ngx-translate/core';
import { DocumentEditorContainerAllModule } from '@syncfusion/ej2-angular-documenteditor';
import { RichTextEditorAllModule } from '@syncfusion/ej2-angular-richtexteditor';
import {MatDatepickerModule} from '@angular/material/datepicker';

import { ChartModule } from '@syncfusion/ej2-angular-charts';
import { DashboardRoutes } from './dashboard.routing';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { WidgetComponentModule } from '../widget-component/widget-component.module';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

// import { ModalModule } from '@bit/valor-software.ngx-bootstrap.modal';
// import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { NgxSpinnerModule } from "ngx-spinner";
import { CategoryComponent } from './category/category.component';
import { AddcategoryComponent } from './category/addcategory/addcategory.component';
import {MatNativeDateModule} from '@angular/material/core';
import { AdsComponent } from './ads/ads.component';
import { AddAdsComponent } from './ads/add-ads/add-ads.component';
import { AdminsComponent } from './admins/admins.component';
import { AddAdminComponent } from './admins/add-admin/add-admin.component';
import { SubCategoriesComponent } from './sub-categories/sub-categories.component';
import { AddSubComponent } from './sub-categories/add-sub/add-sub.component';
import { ProductsComponent } from './products/products.component';
import { AddProductComponent } from './products/add-product/add-product.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
	declarations: [
		CategoryComponent,
		AddcategoryComponent,
		AdsComponent,
		AddAdsComponent,
		AdminsComponent,
		AddAdminComponent,
		SubCategoriesComponent,
		AddSubComponent,
		ProductsComponent,
		AddProductComponent,
		ProfileComponent,
	],
	imports: [ GridModule,
		ListViewModule ,
		MatTableModule ,
		ButtonModule,
		MatDatepickerModule,
		ChartModule ,
		RichTextEditorAllModule,
		MatExpansionModule,
		DocumentEditorContainerAllModule,
		MatDialogModule,
		CommonModule,
		MatTableModule,
		MatSelectModule,
		FlexLayoutModule,
		WidgetComponentModule,
		EasyPieChartModule,
		MatPaginatorModule,
		MatChipsModule,
      TranslateModule,
      PerfectScrollbarModule,
		RouterModule.forChild(DashboardRoutes),
		MatIconModule,
		MatButtonModule,
		MatTabsModule,
		MatCardModule,
		MatMenuModule,
		MatListModule,
		MatCheckboxModule,
		MatDividerModule,
		ChartsModule,
		NgxDatatableModule,
		MatProgressBarModule,
		MatInputModule,
		MatFormFieldModule,
		FormsModule,
		ReactiveFormsModule,
		MatSortModule,
		NgxSpinnerModule,
		MatNativeDateModule,
	],
	providers: [
		PageService, SortService, FilterService, GroupService,
		{provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}},
		NgbModalConfig, NgbModal
	  ],
	  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DashboardModule { }
