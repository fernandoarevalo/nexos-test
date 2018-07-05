import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  @Input() productsCant: number;
  @Output() changePage = new EventEmitter();

  private _rowsForm: FormGroup;

  private currentPage: number = 1;
  private pageInit: number = 0;
  private pageEnd: number = 10;
  private pagMax: number = 10;
  private _pages: number[] = [1];

  /**
   * PaginationComponent constructor
   * @param formBuilder 
   */
  constructor(private formBuilder: FormBuilder) { }

  /**
   * OnInit implementation
   */
  ngOnInit() {
    this._rowsForm = this.formBuilder.group({
      rows: 10
    });
    this.valueChanges();
    this.calculatePages();
  }

  /**
   * Subscribe to rows form changes
   */
  valueChanges() {
    this._rowsForm.valueChanges.subscribe(value => {
      if (value.rows) {
        this.pagMax = value.rows;
        this.navigateToPage(this.currentPage);
      }
    });
  }

  /**
   * Calculate number of pages
   */
  calculatePages(): void {
    let pages: number = 0;
    let resd: number = 0;
    pages = this.productsCant / this.pagMax;
    resd = this.productsCant % this.pagMax > 0 ? pages++ : 0;

    this._pages = [];
    for (let index = 1; index <= pages; index++) {
      this._pages.push(index);
    }
    if (this.productsCant <= 0) {
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
    this.pageEnd = _pIndex * this.pagMax;
    this.pageInit = this.pageEnd - this.pagMax;
    this.calculatePages();
    this.changePage.emit({ init: this.pageInit, end: this.pageEnd });
  }
}
