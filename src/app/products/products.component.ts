import { Component, OnInit } from '@angular/core';
import { ProductService } from "../product.service";
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  private _searchForm: FormGroup;
  private _products: Array<Object>;
  private _filter: string;

  private _pageInit: number = 0;
  private _pageEnd: number = 10;
  private _productsCant: number = 0;

  private _column: string = "id";
  private _isDesc: boolean = true;

  /**
   * ProductsComponent constructor
   * @param _formBuilder 
   * @param _productService 
   */
  constructor(private _formBuilder: FormBuilder,
    private _productService: ProductService) { }

  /**
   * OnInit implementation
   */
  ngOnInit() {
    this._searchForm = this._formBuilder.group({
      search: ''
    });
    this.filter();
    this.getProducts(this._pageInit, this._pageEnd);
  }

  /**
   * Get data from JSON file
   * @param _pPageInit 
   * @param _pPageEnd 
   */
  getProducts(_pPageInit: number, _pPageEnd: number): any {
    this._productService.getJSON().subscribe(data => {
      this._products = data.products.slice(_pPageInit, _pPageEnd);
      this._productsCant = data.products.length;
    });
  }

  /**
   * Change page
   * @param event 
   */
  changePage(event: any): void {
    this._pageInit = event.init;
    this._pageEnd = event.end;
    this.getProducts(this._pageInit, this._pageEnd);
  }

  /**
   * Filter items of the list
   */
  filter(): void {
    this._searchForm.valueChanges.subscribe(value => {
      this._filter = value.search;
    });
  }

  /**
   * Set culumn name
   * @param _pColumn 
   */
  sort(_pColumn: string): void {
    this._isDesc = !this._isDesc;
    this._column = _pColumn;
  };
}
