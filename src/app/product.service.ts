import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class ProductService {

  /**
   * ProductService constructor
   * @param _http 
   */
  constructor(private _http: Http) { }

  /**
   * Get products in the JSON file
   */
  getJSON(): Observable<any> {
    return this._http.get("assets/products.json")
      .map((res: any) => res.json());
  }
}
