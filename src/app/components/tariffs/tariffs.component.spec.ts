import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TariffsComponent } from './tariffs.component';
import { FormsModule } from '@angular/forms';
import { ProductsService } from 'src/app/services/products.service';
import { ToastrService } from 'ngx-toastr';
import { DebugElement } from '@angular/core';
import { ComponentsModule } from '../components.module';
import { CarouselModule } from 'primeng/carousel';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';

let productsService: ProductsService;
let toastrService: ToastrService;
let de: DebugElement;
let comp: TariffsComponent;
let fixture: ComponentFixture<TariffsComponent>;

async function getComponent() {
  await TestBed.configureTestingModule({
    declarations: [
      TariffsComponent
    ],
    imports: [
      FormsModule,
      BrowserAnimationsModule,
      CarouselModule,
      ButtonModule,
      MultiSelectModule,
      DropdownModule
    ],
    providers: [
      { provide: ProductsService, useValue: productsService },
      { provide: ToastrService, useValue: toastrService }
    ]
  }).compileComponents();
  fixture = TestBed.createComponent(TariffsComponent);
  comp = fixture.componentInstance;
  de = fixture.debugElement;
}

describe('TariffsComponent', () => {
  it('constructor: ok', async () => {
    // Arrange
    productsService = {} as any;
    toastrService = {} as any;

    // Act
    await getComponent();

    // Assert
    expect(comp).toBeDefined();
  });

  it('ngOnInit: ok', async () => {
    // Arrange
    productsService = {} as any;
    toastrService = {} as any;
    comp = new TariffsComponent(productsService, toastrService);
    spyOn(comp, 'getProducts');
    spyOn(comp, 'getTariffs');

    // Act
    comp.ngOnInit();

    // Assert
    expect(comp.getProducts).toHaveBeenCalledTimes(1);
    expect(comp.sortOptions).toEqual([{label: 'Highest Cost', value: 'highCost'}, {label: 'Lowest Cost', value: 'lowCost'}]);
  });

  it('getProducts: ok', async () => {
    // Arrange
    const response = [{name: 'Product', annualCost: 300, consumption: 4000}];
    productsService = jasmine.createSpyObj<ProductsService>('productService', {
      getProducts: Promise.resolve(response)
    });
    comp = new TariffsComponent(productsService, {} as any);
    comp.selectedOptions = [];
    comp.listProducts = [];
    spyOn(comp, 'sortProducts');
    // Act
    await comp.getProducts();
    // Assert
    expect(comp.listProducts).toEqual([{name: 'Product', annualCost: 300, consumption: 4000}]);
  });

  it('getProducts: ok with selectedOptions', async () => {
    // Arrange
    const response = [{name: 'Product', annualCost: 300, consumption: 4000}];
    productsService = jasmine.createSpyObj<ProductsService>('productService', {
      getProducts: Promise.resolve(response)
    });
    comp = new TariffsComponent(productsService, {} as any);
    comp.selectedOptions = [];
    comp.selectedSort = {value: 'lowCost'};
    spyOn(comp, 'sortProducts');
    // Act
    await comp.getProducts();
    // Assert
    expect(comp.listProducts).toEqual([{name: 'Product', annualCost: 300, consumption: 4000}]);
    expect(comp.sortProducts).toHaveBeenCalledTimes(1);
    expect(comp.sortProducts).toHaveBeenCalledWith({value: 'lowCost'});

  });

  it('addToCart: ok', async () => {
    // Arrange
    toastrService = jasmine.createSpyObj<ToastrService>('toastrService', {
      success: undefined
    });
    comp = new TariffsComponent({} as any, toastrService);
    // Act
    const result = comp.addToCart();
    // Assert
    expect(result).toBeUndefined();
    expect(toastrService.success).toHaveBeenCalledTimes(1);
    expect(toastrService.success).toHaveBeenCalledWith('Added to cart!');
  });

  it('sortProducts: ok with highCost', async () => {
    // Arrange
    comp = new TariffsComponent({} as any, {} as any);
    comp.listProducts = [
      {name: 'Product', annualCost: 100, consumption: 7000},
      {name: 'Product 2', annualCost: 700, consumption: 7000}
    ];
    // Act
    comp.sortProducts({value: 'highCost'});

    // Assert
    expect(comp.listProducts).toEqual([
      {name: 'Product 2', annualCost: 700, consumption: 7000},
      {name: 'Product', annualCost: 100, consumption: 7000}
    ]);
  });

  it('sortProducts: ok with lowCost', async () => {
    // Arrange
    comp = new TariffsComponent({} as any, {} as any);
    comp.listProducts = [
      {name: 'Product', annualCost: 800, consumption: 7000},
      {name: 'Product 2', annualCost: 200, consumption: 7000}
    ];
    // Act
    comp.sortProducts({value: 'lowCost'});

    // Assert
    expect(comp.listProducts).toEqual([
      {name: 'Product 2', annualCost: 200, consumption: 7000},
      {name: 'Product', annualCost: 800, consumption: 7000}
    ]);
  });

  it('getTariffs: ok', async () => {
    const response = [{annualCost: 100, consumption: 1500}, {annualCost: 300, consumption: 4000}];
    productsService = jasmine.createSpyObj<ProductsService>('productService', {
      getTariffs: Promise.resolve(response)
    });
    comp = new TariffsComponent(productsService, {} as any);
    comp.tariffs = [];
    // Act
    await comp.getTariffs();
    // Assert
    expect(comp.tariffs).toEqual([{annualCost: 100, consumption: 1500}, {annualCost: 300, consumption: 4000}]);
  });
});
