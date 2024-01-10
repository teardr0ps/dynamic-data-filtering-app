import {ComponentFixture, fakeAsync, flush, TestBed, tick} from '@angular/core/testing';
import {ProductViewComponent} from './product-view.component';
import {ProductsService} from '../../services/products.service';
import {of, throwError} from 'rxjs';
import { Spy, provideAutoSpy} from 'jasmine-auto-spies';
import {ProductQuery, ProductsResponse} from '../../models/product.model';
import {FilterOptionsResponse} from '../../models/filter-options.model';

const fakeFilterOptionsResponse: FilterOptionsResponse = {
  brand: [
    {
      "name": "Realmix",
      "value": "Realmix"
    }
  ],
  size: [
    {
      "name": "XL",
      "value": "XL"
    }
  ],
  color: [
    {
      "name": "Aquamarine",
      "value": "Aquamarine"
    }
  ],
  material: [
    {
      "name": "Leather",
      "value": "leather"
    }
  ],
  lowest_price_range: 10,
  max_price_range: 100
};
const fakeProductsResponse: ProductsResponse = {
  data: [
    {
      'id': 1,
      'brand': 'BlogXS',
      'price': 542.78,
      'color': 'Maroon',
      'size': 'S',
      'material': 'leather',
      'product_description': 'desc',
      'name': 'LeatherCraft'
    },
    {
      'id': 2,
      'brand': 'BlogXL',
      'price': 542.78,
      'color': 'Maroon',
      'size': 'S',
      'material': 'leather',
      'product_description': 'desc',
      'name': 'LeatherCraft'
    },
    {
      'id': 3,
      'brand': 'BlogXL',
      'price': 542.78,
      'color': 'Maroon',
      'size': 'S',
      'material': 'leather',
      'product_description': 'desc',
      'name': 'LeatherCraft'
    },
    {
      'id': 4,
      'brand': 'BlogXL',
      'price': 542.78,
      'color': 'Maroon',
      'size': 'S',
      'material': 'leather',
      'product_description': 'desc',
      'name': 'LeatherCraft'
    }
  ],
  first: 1,
  next: 2,
  items: 2,
  pages: 2,
  last: 2,
  prev: 1
};

describe('ProductViewComponent', () => {
  let componentUnderTest: ProductViewComponent;
  let fixture: ComponentFixture<ProductViewComponent>;
  let productsServiceSpy: Spy<ProductsService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideAutoSpy(ProductsService)
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductViewComponent);
    componentUnderTest = fixture.componentInstance;
    productsServiceSpy = TestBed.inject<any>(ProductsService);
  });

  it('should create', () => {
    expect(componentUnderTest).toBeTruthy();
  });

  it('should load filter options on init', fakeAsync(() => {
    productsServiceSpy.getAvailableFilterOptions.and.returnValue(of(fakeFilterOptionsResponse));

    fixture.detectChanges();
    tick(2000);

    expect(componentUnderTest.filterFormFields.length).toBeGreaterThan(0);
    expect(componentUnderTest.priceRanges.lowest_price_range).toEqual(10);
    expect(componentUnderTest.priceRanges.max_price_range).toEqual(100);

    flush();
  }));

  it('should handle error when loading filter options fails', () => {
    productsServiceSpy.getAvailableFilterOptions.and.returnValue(throwError(() => new Error('Error')));

    fixture.detectChanges();

    expect(componentUnderTest.filtersDataLoading).toBeFalse();
  });

  it('should load products', fakeAsync(() => {
    productsServiceSpy.getProducts.and.returnValue(of(fakeProductsResponse));

    componentUnderTest.loadProducts();
    tick(2000);

    expect(componentUnderTest.products.length).toBeGreaterThan(0);
    expect(componentUnderTest.totalProductsCount).toEqual(2);
    expect(componentUnderTest.productsLoading).toBeFalse();

    flush();
  }));

  it('should handle error when loading products fails', () => {
    productsServiceSpy.getProducts.and.returnValue(throwError(() => new Error('Error')));

    componentUnderTest.loadProducts();

    expect(componentUnderTest.productsLoading).toBeFalse();
  });

  it('should update current query and load products', fakeAsync(() => {
    const newQuery: ProductQuery = { page: 2, per_page: 40 };
    productsServiceSpy.getProducts.and.returnValue(of(fakeProductsResponse));

    componentUnderTest.updateCurrentQuery(newQuery);
    tick(2000);

    expect(componentUnderTest.currentQuery).toEqual(newQuery);
    expect(componentUnderTest.products.length).toBeGreaterThan(0);

    flush();
  }));
});
