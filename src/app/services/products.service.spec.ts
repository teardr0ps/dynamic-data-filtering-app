import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {ProductsService} from './products.service';
import {ProductQuery, ProductsResponse} from '../models/product.model';
import {FilterOptionsResponse} from '../models/filter-options.model';
import {provideAutoSpy} from "jasmine-auto-spies";
import {HttpClient} from "@angular/common/http";
const mockResponse: ProductsResponse = {
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
const query: ProductQuery = {
  page: 1,
  per_page: 2,
};

describe('ProductsService', () => {
  let serviceUnderTest: ProductsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductsService]
    });
    serviceUnderTest = TestBed.inject(ProductsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(serviceUnderTest).toBeTruthy();
  });

  it('should get products based on query', () => {
    serviceUnderTest.getProducts(query).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(request =>
      request.url === 'http://localhost:3000/products' &&
      request.method === 'GET'
    );
    expect(req.request.params.has('_page')).toBeTrue();
    expect(req.request.params.has('_per_page')).toBeTrue();

    req.flush(mockResponse);
  });

  it('should get available filter options', () => {
    const filterOptionsResponse: FilterOptionsResponse = {
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
      lowest_price_range: 10.3,
      max_price_range: 999.73
    };

    serviceUnderTest.getAvailableFilterOptions().subscribe(response => {
      expect(response).toEqual(filterOptionsResponse);
    });

    const req = httpTestingController.expectOne('http://localhost:3000/filter_options');
    expect(req.request.method).toBe('GET');
    req.flush(filterOptionsResponse);
  });
});
