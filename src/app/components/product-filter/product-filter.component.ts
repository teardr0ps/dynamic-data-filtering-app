import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, UntypedFormGroup} from "@angular/forms";
import {DropdownModule} from "primeng/dropdown";
import {NgForOf} from "@angular/common";
import {FilterFormField, PriceRangesOptions} from "../../models/filter-options.model";
import {InputTextModule} from "primeng/inputtext";
import {SliderModule} from "primeng/slider";
import {ProductQuery} from "../../models/product.model";
import {ButtonModule} from "primeng/button";

@Component({
  selector: 'app-product-filter',
  standalone: true,
  imports: [
    DropdownModule,
    ReactiveFormsModule,
    NgForOf,
    InputTextModule,
    SliderModule,
    ButtonModule
  ],
  templateUrl: './product-filter.component.html',
  styleUrl: './product-filter.component.scss'
})
export class ProductFilterComponent implements OnInit {
  filterForm!: UntypedFormGroup;
  @Input() priceRanges!: PriceRangesOptions;
  @Input() formFields: FilterFormField[] = [];
  @Input() currentQuery!: ProductQuery;
  @Output() filterProducts: EventEmitter<ProductQuery> = new EventEmitter<ProductQuery>();

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      brand: [''],
      color: [''],
      size: [''],
      material: [''],
      priceValues: [[this.priceRanges.lowest_price_range, this.priceRanges.max_price_range]],
      lowerPrice: [this.priceRanges.lowest_price_range],
      upperPrice: [this.priceRanges.max_price_range]
    });
  }

  appendSearchFilters() {
    let query = {
      ...this.currentQuery,
      ...this.filterForm.value
    }
    this.filterProducts.emit(query);
  }

  resetSearchFilters() {
    const query = {
      page: 1,
      per_page: 40
    }
    this.filterForm.patchValue({
      brand: [''],
      color: [''],
      size: [''],
      material: ['']
    });
    this.filterProducts.emit(query);
  }

  get lowerPriceValue() {
    return this.filterForm.get('priceValues')!.value[0];
  }

  get upperPriceValue() {
    return this.filterForm.get('priceValues')!.value[1];
  }

  updatePriceRange(): void {
    this.filterForm.get('lowerPrice')!.setValue(this.lowerPriceValue);
    this.filterForm.get('upperPrice')!.setValue(this.upperPriceValue);
  }
}
