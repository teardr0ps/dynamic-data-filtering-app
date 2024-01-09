import {Component, OnInit} from '@angular/core';
import {ProductFilterComponent} from "../product-filter/product-filter.component";
import {TableLazyLoadEvent, TableModule} from "primeng/table";
import {ProductsService} from "../../services/products.service";
import {Product, ProductQuery} from "../../models/product.model";
import {FilterFormField, FilterOption, FilterOptionsResponse} from "../../models/filter-options.model";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-product-view',
  standalone: true,
  imports: [
    ProductFilterComponent,
    TableModule,
    NgIf
  ],
  templateUrl: './product-view.component.html',
  styleUrl: './product-view.component.scss'
})
export class ProductViewComponent implements OnInit {
  products: Product[] = [];
  totalProductsCount = 0;
  isCurrentPage = false;
  filterFormFields: FilterFormField[] = [
    { name: 'brand', value: 'brand', label: 'Brand', options: [] },
    { name: 'color', value: 'color', label: 'Color', options: [] },
    { name: 'size', value: 'size', label: 'Size', options: [] },
    { name: 'material', value: 'material', label: 'Material', options: [] },
  ];
  priceRanges = {
    lowest_price_range: 0,
    max_price_range: 0
  }
  currentQuery: ProductQuery = {
    page: 1,
    per_page: 40
  };
  filtersDataLoading = false;

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.filtersDataLoading = true;
    this.productsService.getAvailableFilterOptions()
      .pipe()
      .subscribe(res => {
        this.mapOptionsToFormFields(res);
        this.priceRanges.lowest_price_range = res.lowest_price_range;
        this.priceRanges.max_price_range = res.max_price_range;
        this.filtersDataLoading = false;
    })
  }

  loadProducts() {
    if (this.isCurrentPage) {
      return;
    }
    this.productsService.getProducts(this.currentQuery)
      .subscribe(res => {
        this.products = res.data;
        this.totalProductsCount = res.items;
    })
  }

  updateCurrentQuery(queryWithFilters: ProductQuery) {
    this.currentQuery = queryWithFilters;
    this.loadProducts();
  }

  pageChange(event: TableLazyLoadEvent) {
    if (event.first && event.rows) {
      this.isCurrentPage = event.first / event.rows + 1 === this.currentQuery.page;
      this.currentQuery.page = event.first / event.rows + 1;
    } else {
      this.currentQuery.page = 1;
    }
  }

  mapOptionsToFormFields(response: FilterOptionsResponse): void {
    this.filterFormFields = this.filterFormFields.map(field => {
      const options = Array.isArray(response[field.name]) ? response[field.name] : [];
      return {
        ...field,
        options: options as FilterOption[]
      };
    });
  }
}
