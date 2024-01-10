import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ReactiveFormsModule, FormBuilder} from '@angular/forms';
import {ProductFilterComponent} from './product-filter.component';
import {ProductQuery} from '../../models/product.model';
import {DropdownModule} from "primeng/dropdown";
import {InputTextModule} from "primeng/inputtext";
import {SliderModule} from "primeng/slider";
import {ButtonModule} from "primeng/button";
import {PriceRangesOptions} from "../../models/filter-options.model";

describe('ProductFilterComponent', () => {
  let componentUnderTest: ProductFilterComponent;
  let fixture: ComponentFixture<ProductFilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        DropdownModule,
        InputTextModule,
        SliderModule,
        ButtonModule
      ],
      providers: [FormBuilder]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductFilterComponent);
    componentUnderTest = fixture.componentInstance;
    componentUnderTest.priceRanges = { lowest_price_range: 10, max_price_range: 1000 } as PriceRangesOptions;
    componentUnderTest.formFields = [];
    componentUnderTest.currentQuery = {} as ProductQuery;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(componentUnderTest).toBeTruthy();
  });

  it('should have a form initialized with correct fields', () => {
    expect(componentUnderTest.filterForm).toBeDefined();
    expect(componentUnderTest.filterForm.contains('brand')).toBeTruthy();
    expect(componentUnderTest.filterForm.contains('color')).toBeTruthy();
    expect(componentUnderTest.filterForm.contains('size')).toBeTruthy();
    expect(componentUnderTest.filterForm.contains('material')).toBeTruthy();
    expect(componentUnderTest.filterForm.contains('priceValues')).toBeTruthy();
    expect(componentUnderTest.filterForm.contains('lowerPrice')).toBeTruthy();
    expect(componentUnderTest.filterForm.contains('upperPrice')).toBeTruthy();
  });

  it('should emit filterProducts event with updated query on appendSearchFilters', () => {
    spyOn(componentUnderTest.filterProducts, 'emit');
    componentUnderTest.appendSearchFilters();
    expect(componentUnderTest.filterProducts.emit).toHaveBeenCalled();
  });

  it('should reset search filters and emit the default query', () => {
    spyOn(componentUnderTest.filterProducts, 'emit');
    componentUnderTest.resetSearchFilters();
    expect(componentUnderTest.filterProducts.emit).toHaveBeenCalledWith({
      page: 1,
      per_page: 40
    });
  });

  it('should update price range correctly', () => {
    componentUnderTest.filterForm.patchValue({ priceValues: [50, 500] });
    componentUnderTest.updatePriceRange();
    expect(componentUnderTest.filterForm.value.lowerPrice).toBe(50);
    expect(componentUnderTest.filterForm.value.upperPrice).toBe(500);
  });
});
