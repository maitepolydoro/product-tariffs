import { map } from 'rxjs/operators';
import { ProductsService } from './products.service';
import { BaseService } from './base/base.service';

describe('ProductsService', () => {
  it('getProducts: ok no filter', async () => {
    // Arrange
    const response = [{name: 'Product', tariffs: [{ annualCost: 300, consumption: 3000}]}];
    const spySuper = spyOn<any>(BaseService.prototype, 'get')
      .and.returnValue(Promise.resolve(response));
    const productService = new ProductsService({} as any, {} as any);
    // Act
    const result = await productService.getProducts([]);
    // Assert
    expect(result).toEqual([{name: 'Product', annualCost: 300, consumption: 3000}]);
  });

  it('getProducts: ok with filter with find', async () => {
    // Arrange
    const response = [
      {name: 'Product', tariffs: [{ annualCost: 300, consumption: 3000}]},
      {name: 'Product 2', tariffs: [{ annualCost: 400, consumption: 5000}]}
    ];
    const spySuper = spyOn<any>(BaseService.prototype, 'get')
      .and.returnValue(Promise.resolve(response));
    const productService = new ProductsService({} as any, {} as any);
    // Act
    const result = await productService.getProducts([{ annualCost: 300, consumption: 3000}]);
    // Assert
    expect(result).toEqual([{name: 'Product', annualCost: 300, consumption: 3000}]);
  });

  it('getProducts: ok with filter no find', async () => {
    // Arrange
    const response = [
      {name: 'Product', tariffs: [{ annualCost: 300, consumption: 3000}]},
      {name: 'Product 2', tariffs: [{ annualCost: 400, consumption: 5000}]}
    ];
    const spySuper = spyOn<any>(BaseService.prototype, 'get')
      .and.returnValue(Promise.resolve(response));
    const productService = new ProductsService({} as any, {} as any);
    // Act
    const result = await productService.getProducts([{ annualCost: 300, consumption: 4500}]);
    // Assert
    expect(result).toEqual([]);
  });

  it('getTariffs: ok with find', async () => {
    // Arrange
    const response = [
      {name: 'Product', tariffs: [{ annualCost: 300, consumption: 3000}]},
      {name: 'Product 2', tariffs: [{ annualCost: 400, consumption: 5000}]}
    ];
    const spySuper = spyOn<any>(BaseService.prototype, 'get')
    .and.returnValue(Promise.resolve(response));
    const productService = new ProductsService({} as any, {} as any);
    // Act
    const result = await productService.getTariffs();
    // Assert
    expect(result).toEqual([{ annualCost: 300, consumption: 3000}, { annualCost: 400, consumption: 5000} ]);
  });

  it('getTariffs: ok with find', async () => {
    // Arrange
    const response = [
      {name: 'Product', tariffs: [{ annualCost: 300, consumption: 3000}]},
      {name: 'Product 2', tariffs: [{ annualCost: 400, consumption: 3000}]}
    ];
    const spySuper = spyOn<any>(BaseService.prototype, 'get')
    .and.returnValue(Promise.resolve(response));
    const productService = new ProductsService({} as any, {} as any);
    // Act
    const result = await productService.getTariffs();
    // Assert
    expect(result).toEqual([{ annualCost: 300, consumption: 3000}]);
  });
});
