import { Injectable } from '@angular/core';

export interface ChildrenItems {
  state: string;
  name: string;
  type?: string;
}

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
  children?: ChildrenItems[];
}

const MENUITEMS = [
  {
	 state: 'crm',
	 name: 'Home',
	 type: 'button',
	 icon: 'home',
  },
  {
	 state: 'dashboard',
	 name: 'Admins',
	 type: 'sub',
	 icon: 'category',
	 children: [
		{state: 'admins', name: 'Show'},
		{state: 'addadmin', name: 'Add'}
	 ]
  },
  {
	 state: 'dashboard',
	 name: 'Ads',
	 type: 'sub',
	 icon: 'category',
	 children: [
		{state: 'ads', name: 'Show'},
		{state: 'addads', name: 'Add'}
	 ]
  },
  {
	 state: 'dashboard',
	 name: 'Categories',
	 type: 'sub',
	 icon: 'category',
	 children: [
		{state: 'category', name: 'Show'},
		{state: 'addcategory', name: 'Add'}
	 ]
  },
  {
	 state: 'dashboard',
	 name: 'Sub Categories',
	 type: 'sub',
	 icon: 'category',
	 children: [
		{state: 'sub', name: 'Show'},
		{state: 'addsub', name: 'Add'}
	 ]
  },
  {
	 state: 'dashboard',
	 name: 'Products',
	 type: 'sub',
	 icon: 'category',
	 children: [
		{state: 'products', name: 'Show'},
		{state: 'addproduct', name: 'Add'}
	 ]
  }
];

@Injectable()
export class MenuItems {
  getAll(): Menu[] {
	 return MENUITEMS;
  }
  add(menu:any) {
	 MENUITEMS.push(menu);
  }
}
