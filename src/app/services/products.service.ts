import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product, ProductQuery, ProductsResponse} from "../models/product.model";
import {FilterOptionsResponse} from "../models/filter-options.model";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private productsUrl = 'http://localhost:3000/products';
  private filterOptionsUrl = 'http://localhost:3000/filter_options';

  constructor(private http: HttpClient) { }

  getProducts(query: ProductQuery): Observable<ProductsResponse> {
    let params = new HttpParams()
      .set('_page', query.page.toString())
      .set('_per_page', query.per_page.toString())
      .set('brand', query.brand?.value ?? '')
      .set('color', query.color?.value ?? '')
      .set('size', query.size?.value ?? '')
      .set('material', query.material?.value ?? '')
      .set('_sort', query.sort?.value ?? '')
      .set('price_gte', query.lowerPrice?.toString() ?? '')
      .set('price_lte', query.upperPrice?.toString() ?? '');

    return this.http.get<ProductsResponse>(this.productsUrl, { params });
  }

  getAvailableFilterOptions(): Observable<FilterOptionsResponse> {
    return this.http.get<FilterOptionsResponse>(this.filterOptionsUrl);
  }
}
