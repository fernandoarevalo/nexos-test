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

  private currentPage: number = 1;
  private _pageInit: number = 0;
  private _pageEnd: number = 10;
  private _productsCant: number = 0;
  private _pagMax: number = 10;
  private _pages: number[] = [1]

  private _column: string = "id";
  private _isDesc: boolean = false;

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
      search: '',
      rows: this._pagMax
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
      this.calculatePages();
    });
  }

  /**
   * Calculate number of pages
   */
  calculatePages(): void {
    let pages: number = 0;
    let resd: number = 0;
    pages = this._productsCant / this._pagMax;
    resd = this._productsCant % this._pagMax > 0 ? pages++ : 0;

    this._pages = [];
    for (let index = 1; index <= pages; index++) {
      this._pages.push(index);
    }
    if (this._productsCant <= 0) {
      this._pages.push(1);
    }
  }

  /**
   * Next page
   */
  nextPage() {
    this.navigateToPage(this.currentPage + 1);
  }

  /**
   * Previous page
   */
  previousPage() {
    this.navigateToPage(this.currentPage - 1);
  }

  /**
   * Show the rows corresponding to page number
   * @param _pIndex 
   */
  navigateToPage(_pIndex: number) {
    this.currentPage = _pIndex;
    this._pageEnd = _pIndex * this._pagMax;
    this._pageInit = this._pageEnd - this._pagMax;
    this.getProducts(this._pageInit, this._pageEnd);
  }

  /**
   * Filter items of the list
   */
  filter(): void {
    this._searchForm.valueChanges.subscribe(value => {
      this._filter = value.search;
      if (value.rows) {
        this._pagMax = value.rows;
        this.navigateToPage(this.currentPage);
      }
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
